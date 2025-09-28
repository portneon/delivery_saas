// prisma/seed.js
const prisma = require("../../lib/prisma");
require('dotenv').config();
async function main() {
  const tenantData = Array.from({ length: 5 }, (_, i) => ({
    name: `Tenant ${i + 1}`,
    address: `Address for Tenant ${i + 1}`,
  }));

  // Create tenants sequentially to get their IDs
  for (const tenantInfo of tenantData) {
    const tenant = await prisma.tenant.create({
      data: tenantInfo,
    });

    // ---------- USERS ----------
    const usersData = Array.from({ length: 5 }, (_, i) => ({
      name: `User ${i + 1} ${tenant.name}`,
      email: `user${i + 1}_${tenant.name.replace(/\s/g, "")}@dairy.com`,
      password: "password123",
      role: i === 0 ? "ADMIN" : "EMPLOYEE",
      tenantId: tenant.id,
    }));
    await prisma.user.createMany({ data: usersData, skipDuplicates: true });

    // ---------- PRODUCTS ----------
    const productsData = Array.from({ length: 5 }, (_, i) => ({
      name: `Product ${i + 1} ${tenant.name}`,
      type: "Dairy",
      unit: i % 2 === 0 ? "liter" : "kg",
      price: 50 + i * 20,
      tenantId: tenant.id,
    }));
    const products = await prisma.product.createMany({ data: productsData, skipDuplicates: true });

    // Fetch products again to get IDs (needed for order items)
    const productsList = await prisma.product.findMany({ where: { tenantId: tenant.id } });

    // ---------- CUSTOMERS ----------
    const customers = [];
    for (let c = 1; c <= 5; c++) {
      const customer = await prisma.customer.create({
        data: {
          name: `Customer ${c} ${tenant.name}`,
          email: `customer${c}_${tenant.name.replace(/\s/g, "")}@example.com`,
          phone: `12345678${c}${tenant.id.slice(0, 2)}`,
          tenantId: tenant.id,
          addresses: {
            create: [
              {
                addressLine: `Address Line ${c}`,
                city: `City ${c}`,
                state: `State ${c}`,
                pincode: `1000${c}`,
              },
            ],
          },
        },
      });
      customers.push(customer);
    }

    // ---------- SUBSCRIPTIONS + RUNS + ORDERS + PAYMENTS ----------
    for (const customer of customers) {
      for (let s = 1; s <= 5; s++) {
        const subscription = await prisma.subscription.create({
          data: {
            customerId: customer.id,
            tenantId: tenant.id,
            startDate: new Date(),
            frequency: "DAILY",
            status: "ACTIVE",
          },
        });

        for (let r = 1; r <= 5; r++) {
          const subRun = await prisma.subscriptionRun.create({
            data: {
              subscriptionId: subscription.id,
              runDate: new Date(),
              status: "PENDING",
            },
          });

          // Create 5 orders per subscription run
          for (let o = 1; o <= 5; o++) {
            const order = await prisma.order.create({
              data: {
                subscriptionRunId: subRun.id,
                customerId: customer.id,
                tenantId: tenant.id,
                totalAmount: 0,
                status: "PENDING",
                orderItems: {
                  create: productsList.map(product => ({
                    productId: product.id,
                    quantity: 1 + o,
                    price: product.price,
                  })),
                },
              },
              include: { orderItems: true },
            });

            // Update totalAmount
            const total = order.orderItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            await prisma.order.update({
              where: { id: order.id },
              data: { totalAmount: total },
            });

            // Create payment
            await prisma.payment.create({
              data: {
                orderId: order.id,
                amount: total,
                method: "CASH",
                status: "COMPLETED",
              },
            });
          }
        }
      }
    }
    console.log(`Seeded data for ${tenant.name}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

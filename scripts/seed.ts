//used to seed initial catagories to database
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Scientists" },
        { name: "Musicians" },
        { name: "Artists" },
        { name: "Philosophers" },
        { name: "Artisans" },
        { name: "Politician" },
      ],
    });
  } catch (error) {
    console.log("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();

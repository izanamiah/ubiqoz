//used to seed initial catagories to database
//run "node scripts/seed.ts"
//run "npx prisma migrate reset" to reset db
//run "npx prisma generate" to generate types
//run "npx prisma db push" to push prisma schema to db
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

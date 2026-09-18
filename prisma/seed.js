import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      username: "pradum",
    },
  });

  if (!user) {
    throw new Error(
      "User not found. Create the user first or update the username in seed.js.",
    );
  }

  const categories = [
    {
      name: "Backend",
      icon: "Server",
    },
    {
      name: "Frontend",
      icon: "Monitor",
    },
    {
      name: "Mobile",
      icon: "Smartphone",
    },
    {
      name: "Database",
      icon: "Database",
    },
    {
      name: "DevOps",
      icon: "Cloud",
    },
    {
      name: "Security",
      icon: "Shield",
    },
    {
      name: "API",
      icon: "Link",
    },
    {
      name: "Other",
      icon: "Folder",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        userId_name: {
          userId: user.id,
          name: category.name,
        },
      },
      update: {
        icon: category.icon,
      },
      create: {
        name: category.name,
        icon: category.icon,
        userId: user.id,
      },
    });
  }

  console.log("Categories seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
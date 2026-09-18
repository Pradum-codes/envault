import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "User not authenticated" },
        { status: 401 },
      );
    }

    const categories = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("GET /api/categories failed:", error);

    return Response.json(
      { message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { message: "User not authenticated" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const name = body.name;
    const icon = body.icon;

    if (typeof name !== "string" || !name.trim()) {
      return Response.json(
        { message: "Category name is required" },
        { status: 400 },
      );
    }

    if (typeof icon !== "string" || !icon.trim()) {
      return Response.json(
        { message: "Category icon is required" },
        { status: 400 },
      );
    }

    const categoryName = name.trim();
    const categoryIcon = icon.trim();

    const existingCategory = await prisma.category.findFirst({
      where: {
        userId: user.id,
        name: categoryName,
      },
    });

    if (existingCategory) {
      return Response.json(
        { message: "A category with this name already exists" },
        { status: 409 },
      );
    }

    const category = await prisma.category.create({
      data: {
        name: categoryName,
        icon: categoryIcon,
        userId: user.id,
      },
    });

    return Response.json(
      {
        message: "Category created successfully",
        category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/categories failed:", error);

    return Response.json(
      { message: "Failed to create category" },
      { status: 500 },
    );
  }
}
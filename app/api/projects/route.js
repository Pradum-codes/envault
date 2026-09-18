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

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects failed:", error);

    return Response.json(
      { message: "Failed to fetch projects" },
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

    const projectName = body.project;
    const version = body.version;
    const description = body.description;
    const categoryId = body.categoryId;

    if (typeof projectName !== "string" || !projectName.trim()) {
      return Response.json(
        { message: "Project name is required" },
        { status: 400 },
      );
    }

    if (typeof version !== "string" || !version.trim()) {
      return Response.json(
        { message: "Project version is required" },
        { status: 400 },
      );
    }

    if (typeof categoryId !== "string" || !categoryId.trim()) {
      return Response.json(
        { message: "Project category is required" },
        { status: 400 },
      );
    }

    // Ensure the category belongs to the authenticated user.
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: user.id,
      },
    });

    if (!category) {
      return Response.json(
        { message: "Invalid project category" },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: {
        name: projectName.trim(),
        version: version.trim(),
        description:
          typeof description === "string" && description.trim()
            ? description.trim()
            : null,
        categoryId,
        userId: user.id,
      },
      include: {
        category: true,
      },
    });

    return Response.json(
      {
        message: "Project created successfully",
        project,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/projects failed:", error);

    return Response.json(
      { message: "Failed to create project" },
      { status: 500 },
    );
  }
}
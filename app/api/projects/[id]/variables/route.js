import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }

    const projectFound = await prisma.project.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!projectFound) {
      return Response.json(
        {
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    const variables = await prisma.environmentVariable.findMany({
      where: {
        projectId: projectFound.id,
      },
    });

    return Response.json(
      {
        message: "Environment variables found",
        count: variables.length,
        variables,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/projects/[id] failed:", error);

    return Response.json(
      { message: "Failed to fetch environment variables" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { key, value } = body;

    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }

    if (!key || !value) {
      return Response.json(
        {
          message: "Key and value are required",
        },
        { status: 400 }
      );
    }

    const projectFound = await prisma.project.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!projectFound) {
      return Response.json(
        {
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    try {
      const variable = await prisma.environmentVariable.create({
        data: {
          projectId: id,
          key,
          value,
        },
      });

      return Response.json(
        {
          message: "Variable created successfully",
          variable,
        },
        { status: 201 }
      );
    } catch (error) {
      if (error.code === "P2002") {
        return Response.json(
          {
            message: "A variable with this key already exists in this project",
          },
          { status: 409 }
        );
      }

      return Response.json(
        {
          message: "Failed to create variable",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("POST /api/projects/[id] failed:", error);

    return Response.json(
      { message: "Failed to create environment variable" },
      { status: 500 }
    );
  }
}
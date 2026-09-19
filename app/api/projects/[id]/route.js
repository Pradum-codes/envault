import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Get a single project by ID
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
      include: {
        category: true,
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

    return Response.json(
      {
        message: "Project found",
        project: projectFound,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/projects/[id] failed:", error);

    return Response.json(
      { message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
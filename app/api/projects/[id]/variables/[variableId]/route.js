import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request, { params }) {
  const { id, variableId } = await params;

  const body = await request.json();
  const { key, value } = body;

  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  if (!key || !value) {
    return Response.json(
      { message: "Key and value are required" },
      { status: 400 }
    );
  }

  // Make sure the project belongs to the user
  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!project) {
    return Response.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  // Make sure the variable belongs to this project
  const variable = await prisma.environmentVariable.findFirst({
    where: {
      id: variableId,
      projectId: id,
    },
  });

  if (!variable) {
    return Response.json(
      { message: "Environment variable not found" },
      { status: 404 }
    );
  }

  const updatedVariable = await prisma.environmentVariable.update({
    where: {
      id: variableId,
    },
    data: {
      key,
      value,
    },
  });

  return Response.json(
    {
      message: "Variable updated successfully",
      variable: updatedVariable,
    },
    { status: 200 }
  );
}

export async function DELETE(request, { params }) {
  const { id, variableId } = await params;

  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!project) {
    return Response.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  const variable = await prisma.environmentVariable.findFirst({
    where: {
      id: variableId,
      projectId: id,
    },
  });

  if (!variable) {
    return Response.json(
      { message: "Environment variable not found" },
      { status: 404 }
    );
  }

  await prisma.environmentVariable.delete({
    where: {
      id: variableId,
    },
  });

  return Response.json(
    {
      message: "Variable deleted successfully",
    },
    { status: 200 }
  );
}   
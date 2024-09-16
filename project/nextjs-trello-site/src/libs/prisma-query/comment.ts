"use server";
import prisma from "@/config/prisma-config";
import { auth } from "@clerk/nextjs/server";

export async function createComment(data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }
    console.log({ data });

    const resp = await prisma.comment.create({
      data: {
        ...data,
        userId,
      },
    });

    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function deleteCommentById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }
    console.log(1);

    const resp = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function updateCommentById(id: string, data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.comment.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function getCommentByTaskId(taskId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.comment.findMany({
      where: {
        taskId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

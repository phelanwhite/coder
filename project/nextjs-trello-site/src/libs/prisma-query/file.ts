"use server";
import { deleteImage } from "@/config/cloudinary-config";
import prisma from "@/config/prisma-config";
import { auth } from "@clerk/nextjs/server";

export async function createFile(data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.file.create({
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
export async function deleteFileById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.file.delete({
      where: {
        id: id,
      },
    });
    await deleteImage(resp.file);

    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function getFilesByTaskId(taskId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.file.findMany({
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

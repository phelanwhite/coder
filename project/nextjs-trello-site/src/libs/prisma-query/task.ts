"use server";
import { deleteImage } from "@/config/cloudinary-config";
import prisma from "@/config/prisma-config";
import { auth } from "@clerk/nextjs/server";
export async function createTask(data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const position = await prisma.task.count({
      where: {
        userId,
      },
    });

    const resp = await prisma.task.create({
      data: {
        ...data,
        userId,
        position: position + 1,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function updateTaskById(id: string, data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.task.update({
      data: {
        ...data,
      },
      where: {
        id: id,
        userId,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function updatePositionTasks(data: any[]) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    let resp = <any>[];

    for (let index = 0; index < data.length; index++) {
      const { id, comments, files, ...element } = data[index];
      const elementResp = await prisma.task.update({
        data: {
          ...element,
          position: index + 1,
        },
        where: {
          id: id,
          userId,
        },
      });
      resp.push(elementResp);
    }

    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function deleteTaskById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    await prisma.comment.deleteMany({
      where: {
        taskId: id,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        taskId: id,
      },
    });

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      await deleteImage(element.file);
    }

    await prisma.file.deleteMany({
      where: {
        taskId: id,
      },
    });

    const resp = await prisma.task.delete({
      where: {
        id: id,
        userId,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function getTasksByBoardId(boardId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.task.findMany({
      where: {
        userId,
        column: {
          boardId: boardId,
        },
      },
      orderBy: {
        position: "asc",
      },
      include: {
        comments: true,
        files: true,
      },
    });

    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function getTaskById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.task.findFirst({
      where: {
        userId,
        id: id,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

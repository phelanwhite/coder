"use server";
import { deleteImage } from "@/config/cloudinary-config";
import prisma from "@/config/prisma-config";
import { auth } from "@clerk/nextjs/server";
export async function createColumn(data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const position = await prisma.column.count({
      where: {
        userId,
      },
    });

    const resp = await prisma.column.create({
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
export async function updateColumnById(id: string, data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.column.update({
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
export async function updatePositionColumns(data: any[]) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    let resp = <any>[];

    for (let index = 0; index < data.length; index++) {
      const { id, ...element } = data[index];
      const elementResp = await prisma.column.update({
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
export async function deleteColumnById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    await prisma.comment.deleteMany({
      where: {
        task: {
          columnId: id,
        },
      },
    });

    const files = await prisma.file.findMany({
      where: {
        task: {
          columnId: id,
        },
      },
    });

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      await deleteImage(element.file);
    }

    await prisma.file.deleteMany({
      where: {
        task: {
          columnId: id,
        },
      },
    });

    await prisma.task.deleteMany({
      where: {
        columnId: id,
        userId,
      },
    });

    const resp = await prisma.column.delete({
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
export async function getColumnsByBoardId(boardId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.column.findMany({
      where: {
        userId,
        boardId: boardId,
      },
      orderBy: {
        position: "asc",
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

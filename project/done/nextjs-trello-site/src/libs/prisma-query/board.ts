"use server";
import { deleteImage } from "@/config/cloudinary-config";
import prisma from "@/config/prisma-config";
import { auth } from "@clerk/nextjs/server";

// board
export async function createBoard(data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const position = await prisma.board.count({
      where: {
        userId,
      },
    });

    const resp = await prisma.board.create({
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
export async function updateBoardById(id: string, data: any) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.board.update({
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
export async function deleteBoardById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    await prisma.comment.deleteMany({
      where: {
        task: {
          column: {
            boardId: id,
          },
        },
      },
    });

    const files = await prisma.file.findMany({
      where: {
        task: {
          column: {
            boardId: id,
          },
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
          column: {
            boardId: id,
          },
        },
      },
    });

    await prisma.task.deleteMany({
      where: {
        column: {
          boardId: id,
          userId,
        },
      },
    });

    await prisma.column.deleteMany({
      where: {
        boardId: id,
        userId,
      },
    });

    const resp = await prisma.board.delete({
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
export async function getBoards() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.board.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: {
            columns: true,
          },
        },
      },
    });

    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}
export async function getBoardById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const resp = await prisma.board.findFirst({
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

"use server";
import prisma from "@/config/prisma-config";
import { auth } from "@clerk/nextjs/server";

export async function getAllByAuth() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const boards = await prisma.board.count({
      where: {
        userId,
      },
      orderBy: {
        position: "asc",
      },
    });
    const columns = await prisma.column.count({
      where: {
        userId,
      },
      orderBy: {
        position: "asc",
      },
    });
    const tasks = await prisma.task.count({
      where: {
        userId,
      },
      orderBy: {
        position: "asc",
      },
    });
    const comments = await prisma.column.count({
      where: {
        userId,
      },
      orderBy: {
        position: "asc",
      },
    });
    const files = await prisma.file.count({
      where: {
        userId,
      },
    });

    return [
      {
        type: "boards",
        count: boards,
      },
      {
        type: "columns",
        count: columns,
      },
      {
        type: "tasks",
        count: tasks,
      },
      {
        type: "comments",
        count: comments,
      },
      {
        type: "files",
        count: files,
      },
    ];
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

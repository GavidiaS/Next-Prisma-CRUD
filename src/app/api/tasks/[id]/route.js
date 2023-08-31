import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: +params.id
    }
  })
  return NextResponse.json(task)
}

export async function PUT(request, { params }) {
  const data = await request.json();
  await prisma.task.update({
    where: {
      id: +params.id
    },
    data: data
  })
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks)
}

export async function DELETE(request, { params }) {
  try {
    await prisma.task.delete({
      where: {
        id: +params.id
      }
    })
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}
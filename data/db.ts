import { prisma } from "./prisma.ts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaError } from "../utils/utils.ts";
export const createUsers = async (data: {
  name: string;
  email: string;
  password: string;
  orders?: Array<{
    item: string;
    Quantiy: number;
  }>;
}) => {
  const orders = data.orders ?? [];

  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        orders: {
          create: orders.map((order) => ({
            item: order.item,
            Quantiy: order.Quantiy,
          })),
        },
      },
      include: {
        orders: true,
      },
    });
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError)
      throw new PrismaError(`${error.meta?.target} already exists`, 409);

    throw new PrismaError("Failed to create user", 500);
  }
};

export const getUsers = async () => {
  try {
    return await prisma.user.findMany({
      include: {
        orders: true,
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaError) throw error;

    throw new PrismaError("Failed to retrieve users", 500);
  }
};

export const getUser = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });

    if (!user) {
      throw new PrismaError("User not found", 404);
    }

    return user;
  } catch (error: unknown) {
    if (error instanceof PrismaError) throw error;
    throw new PrismaError("Failed to retrieve user", 500);
  }
};

export const deleteUser = async (id: number) => {
  try {
    await getUser(id);
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof PrismaError) throw error;
    throw new PrismaError("Failed to delete user", 500);
  }
};

export const updateUser = async (
  id: number,
  data: { name?: string; email?: string; password?: string }
) => {
  try {
    await getUser(id);
    return await prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
  } catch (error) {
    if (error instanceof PrismaError) throw error;

    console.log(error);
    throw new PrismaError("Failed to update user", 500);
  }
};

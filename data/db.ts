import { prisma } from "./prisma.ts";

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
};

export const getUsers = async () => {
  return await prisma.user.findMany({
    include: {
      orders: true,
    },
  });
};

export const getUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      orders: true,
    },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const updateUser = async (
  id: number,
  data: { name?: string; email?: string; password?: string }
) => {
  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

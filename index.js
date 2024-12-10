import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Jose Caçador",
      email: "jose.cacado@gmail.com",
    },
  });

  console.log("Usuário criado:", newUser);
  const showUsers = await prisma.user.findMany();
  console.log("Todos os usuários:", showUsers);
}

async function updateUser() {
  const updatedUser = await prisma.user.update({
    where: {
      email: "jose.cacado@gmail.com",
    },
    data: {
      name: "Jose Caçador Atualizado",
    },
  });

  console.log("Usuário atualizado:", updatedUser);
}

async function deleteUser() {
  const deletedUser = await prisma.user.delete({
    where: {
      email: "jose.cacado@gmail.com",
    },
  });
  console.log("Usuário deletado:", deletedUser);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

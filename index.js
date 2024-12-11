import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

app.get("/", (request, response) => {
  response.send(console.log(`Servidor rodando em http://localhost:${PORT}`));
});

async function main() {
  const showUsers = await prisma.user.findMany();

  console.log("Todos os usuários:", showUsers);
}

async function createUser(name, email) {
  const newUser = await prisma.user.create({
    data: {
      name: `${name}`,
      email: `${email}`,
    },
  });
  console.log("Usuário criado:", newUser);
}

async function updateUser(email, newName) {
  const updatedUser = await prisma.user.update({
    where: {
      email: `${email}`,
    },
    data: {
      name: `${newName}`,
    },
  });

  console.log("Usuário atualizado:", updatedUser);
}

async function deleteUser(email) {
  const deletedUser = await prisma.user.delete({
    where: {
      email: `${email}`,
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

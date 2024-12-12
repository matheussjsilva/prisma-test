import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import { StatusCodes } from "http-status-codes";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

import { generateToken, verifyToken } from "./auth.js";
import { authMiddleware } from "./auth.js";

//dotenv.config();

const app = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/frontend")));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
  response.send(StatusCodes.ACCEPTED);
});

app.get("/users", authMiddleware, async (request, response) => {
  try {
    const users = await prisma.user.findMany();
    response.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    response.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.post("/login", async (request, response) => {
  const { email } = request.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }
    const token = generateToken(user);
    return response.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao autenticar usuário: ", error);
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
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

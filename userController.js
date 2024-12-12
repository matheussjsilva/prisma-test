export default class UserController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getUsers(request, response) {
    try {
      const users = await this.prisma.user.findMany();
      response.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
      response.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

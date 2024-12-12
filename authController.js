import { generateToken } from "./auth.js";

export default class UserAuthController {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async login(request, response) {
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
  }
}

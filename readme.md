# Projeto com Express, Prisma e JWT

Este projeto utiliza o Express.js e o Prisma ORM para criar uma API básica de gerenciamento de usuários. A API permite criar, listar, atualizar e excluir usuários no banco de dados.

## Funcionalidades

- **Listar todos os usuários**: Obtém uma lista de todos os usuários no banco de dados.
- **Criar um novo usuário**: Permite a criação de um novo usuário fornecendo nome e e-mail.
- **Atualizar um usuário**: Permite a atualização do nome de um usuário com base no e-mail.
- **Excluir um usuário**: Exclui um usuário do banco de dados baseado no e-mail.

## Tecnologias Utilizadas

- **Express.js**: Framework para construção da API.
- **Prisma**: ORM para interação com o banco de dados.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git

   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd nome-do-repositorio
   ```
3. **Instale dependências**
   ```bash
   npm install
   ```
4. **Configure o banco de dados com o Prisma(se necessário)**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie o servidor**
   ```bash
   npm start
   ```
6. O servidor estará disponível na porta configurada (3000).

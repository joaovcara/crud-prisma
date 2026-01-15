<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# CRUD API com NestJS e Prisma

Uma API REST robusta e escalável para gerenciamento de usuários, construída com **NestJS**, **Prisma ORM** e **PostgreSQL**.

## Descrição

Este projeto implementa uma API CRUD (Create, Read, Update, Delete) completa para gerenciar usuários. A aplicação segue as melhores práticas de arquitetura, utiliza validação de dados com class-validator, criptografia de senhas com bcryptjs, e documenta os endpoints com Swagger.

## Tecnologias

- **NestJS** - Framework progressivo para Node.js
- **TypeScript** - Tipagem estática e segura
- **Prisma** - ORM moderno e type-safe
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação automática de API
- **class-validator** - Validação de DTOs
- **class-transformer** - Transformação de dados
- **bcryptjs** - Criptografia de senhas

## Pré-requisitos

- **Node.js** (v18+)
- **npm** ou **yarn**
- **PostgreSQL** (v12+)
- **.env** configurado com as variáveis de ambiente

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <seu-repositorio>
cd crud-prisma
npm install
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/crud_db"
NODE_ENV="development"
```

2. Configure o banco de dados com Prisma:

```bash
# Executar migrações
npx prisma migrate dev

# Abrir Prisma Studio (interface visual)
npx prisma studio
```

## Executando a Aplicação

```bash
# Modo desenvolvimento (com auto-reload)
npm run start:dev

# Modo produção
npm run build
npm run start:prod

# Modo debug
npm run start:debug
```

A API estará disponível em `http://localhost:3000`

A documentação Swagger estará em `http://localhost:3000/api`

## Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/users` | Listar todos os usuários |
| GET | `/users/:id` | Obter usuário por ID |
| POST | `/users` | Criar novo usuário |
| PUT | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Deletar usuário |

### Exemplo de Requisição

**Criar um usuário (POST)**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "name": "João Silva",
    "password": "senha123"
  }'
```

**Resposta de Sucesso (201)**

```json
{
  "id": 1,
  "email": "usuario@exemplo.com",
  "name": "João Silva"
}
```

## Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes e2e
npm run test:e2e
```

## Testes com Bruno

O projeto inclui coleções de testes em [test-api/](test-api/) usando Bruno. Importe o arquivo `bruno.json` no cliente Bruno para testar os endpoints.

## Estrutura do Projeto

```
crud-prisma/
├── src/
│   ├── app.module.ts              # Módulo principal
│   ├── main.ts                    # Entrada da aplicação
│   ├── lib/
│   │   └── prisma.ts              # Serviço de conexão com Prisma
│   └── user/
│       ├── user.controller.ts     # Controlador de usuários
│       ├── user.service.ts        # Lógica de negócio
│       ├── user.module.ts         # Módulo de usuários
│       ├── dto/                   # Data Transfer Objects
│       │   ├── create-user.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── user.response.dto.ts
│       └── entities/
│           └── user.entity.ts
├── prisma/
│   ├── schema.prisma              # Schema do banco de dados
│   └── migrations/                # Histórico de migrações
├── test-api/                      # Testes com Bruno
└── generated/                     # Código gerado pelo Prisma
```

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia com auto-reload |
| `npm run start:prod` | Inicia em produção |
| `npm run build` | Build para produção |
| `npm run lint` | Executa ESLint e corrige erros |
| `npm run format` | Formata código com Prettier |
| `npm run test` | Executa testes |
| `npm run test:cov` | Testes com cobertura |

## Migração do Banco de Dados

```bash
# Criar nova migração
npx prisma migrate dev --name <nome_da_migracao>

# Aplicar migrações pendentes
npx prisma migrate deploy

# Resetar banco (development apenas)
npx prisma migrate reset

# Visualizar status das migrações
npx prisma migrate status
```

## Troubleshooting

**Erro: "Can't reach database server"**
- Verifique se PostgreSQL está rodando
- Confira a URL de conexão no `.env`
- Teste a conexão: `psql $DATABASE_URL`

**Erro: "Migration lock"**
- Execute: `npx prisma migrate resolve --rolled-back <migration_name>`

**Prisma Client desatualizado**
- Execute: `npx prisma generate`

## Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
2. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
3. Push para a branch: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

## Recursos Úteis

- [Documentação NestJS](https://docs.nestjs.com)
- [Documentação Prisma](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Licença

Este projeto está licenciado sob a licença UNLICENSED.

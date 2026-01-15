<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# CRUD API com NestJS e Prisma

Uma API REST robusta e escalável para gerenciamento de usuários, construída com **NestJS**, **Prisma ORM** e **PostgreSQL**.

## Descrição

Este projeto implementa uma API CRUD (Create, Read, Update, Delete) completa para gerenciar usuários. A aplicação segue as melhores práticas de arquitetura, utiliza validação de dados com class-validator, criptografia de senhas com bcryptjs, e documenta os endpoints com Swagger.

## 🚀 Aplicação em Produção

A aplicação está disponível e funcional no seguinte endereço:

🔗 **https://crud-prisma-eta.vercel.app/**

> API hospedada no Render + Frontend hospedados na Vercel, utilizando PostgreSQL (Neon) e Prisma ORM.

## Tecnologias

- **NestJS** - Framework progressivo para Node.js
- **TypeScript** - Tipagem estática e segura
- **Prisma** - ORM moderno e type-safe
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação automática de API
- **JWT (JSON Web Token)** - Autenticação stateless
- **Passport.js** - Middleware de autenticação
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
JWT_SECRET="sua-chave-secreta-super-segura-aqui"
JWT_EXPIRATION="24h"
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

## Frontend

Este projeto inclui um frontend moderno construído com **HTML5**, **CSS3** e **JavaScript Vanilla**, sem dependências externas.

### Características do Frontend

- 🎨 Interface moderna e responsiva
- 🔐 Autenticação com JWT
- 📱 Design mobile-first
- ⚡ SPA (Single Page Application)
- 🎯 Modais para CRUD de usuários
- 🔔 Alertas de feedback ao usuário
- 💾 Persistência de sessão com localStorage

### Como Acessar o Frontend

1. Certifique-se de que a API está rodando em `http://localhost:3000`
2. Abra o navegador e acesse: `http://localhost:3000/public/index.html`

### Funcionalidades do Frontend

#### 📝 Autenticação
- **Login**: Faça login com suas credenciais
- **Registro**: Crie uma nova conta
- **Logout**: Saia de sua conta (apaga o token)

#### 👥 Gerenciamento de Usuários
- **Listar Usuários**: Visualize todos os usuários em uma tabela
- **Criar Usuário**: Abra um modal para adicionar novo usuário
- **Editar Usuário**: Edite dados do usuário em um modal
- **Deletar Usuário**: Confirme a exclusão em um modal seguro

### Estrutura do Frontend

```
public/
├── index.html              # Arquivo HTML principal
├── css/
│   └── style.css           # Estilos CSS (responsivos)
└── js/
    ├── config.js           # Configurações e objeto AUTH
    ├── api.js              # Funções de requisição para API
    ├── ui.js               # Funções de UI e navegação
    ├── auth.js             # Lógica de autenticação
    ├── users.js            # CRUD de usuários
    └── main.js             # Inicialização da aplicação
```

### Tecnologias Frontend

- **HTML5**: Estrutura semântica
- **CSS3**: Gradientes, flexbox, grid e animações
- **JavaScript ES6+**: Fetch API, async/await, template literals
- **localStorage**: Persistência de tokens e dados do usuário

### Desenvolvimento Frontend

Os arquivos estão organizados de forma modular para fácil manutenção:

- **config.js**: Configurações globais e gerenciamento de autenticação
- **api.js**: Abstração das chamadas HTTP para a API
- **ui.js**: Funções de navegação e controle de modais
- **auth.js**: Event listeners e lógica de login/registro
- **users.js**: Event listeners e lógica de CRUD de usuários
- **main.js**: Inicialização da aplicação ao carregar a página

## Endpoints da API

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Autenticar usuário e obter JWT token |

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/users` | Listar todos os usuários |
| GET | `/users/:id` | Obter usuário por ID |
| POST | `/users` | Criar novo usuário |
| PUT | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Deletar usuário |

## Autenticação

O projeto utiliza **JWT (JSON Web Token)** para autenticação segura. Os tokens são gerados no endpoint `/auth/login` e devem ser incluídos no header `Authorization` das requisições protegidas.

### Flow de Autenticação

1. **Login**: Envie email e senha para `/auth/login`
2. **Token**: Receba um JWT token (válido por tempo determinado)
3. **Requisições**: Inclua o token no header: `Authorization: Bearer <seu-token>`

### Exemplo: Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

**Resposta de Sucesso (200)**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@exemplo.com",
    "name": "João Silva"
  }
}
```

### Exemplo: Requisição Autenticada

```bash
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Proteção de Rotas

Rotas protegidas utilizam o `@UseGuards(JwtAuthGuard)` para validar o token:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Get(':id')
@UseGuards(JwtAuthGuard)
findOne(@Param('id') id: string) {
  return this.userService.findOne(+id);
}
```

### Segurança

- ✅ Senhas criptografadas com **bcryptjs**
- ✅ Tokens JWT com expiração
- ✅ Validação de credenciais
- ✅ Guards para rotas protegidas

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
│   ├── auth/
│   │   ├── auth.controller.ts     # Controlador de autenticação
│   │   ├── auth.service.ts        # Lógica de autenticação
│   │   ├── auth.module.ts         # Módulo de autenticação
│   │   ├── decorators/
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   ├── guards/
│   │   │   └── jwt.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
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
├── public/                        # Frontend estático
│   ├── index.html                 # Página principal
│   ├── css/
│   │   └── style.css              # Estilos da aplicação
│   └── js/
│       ├── config.js              # Configurações globais
│       ├── api.js                 # Chamadas para API
│       ├── ui.js                  # Funções de UI
│       ├── auth.js                # Lógica de autenticação
│       ├── users.js               # CRUD de usuários
│       └── main.js                # Inicialização
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

## Quick Start

### 1️⃣ Configurar Backend

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente (.env)
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/crud_db"
# JWT_SECRET="sua-chave-secreta"

# Executar migrações
npx prisma migrate dev

# Iniciar a API
npm run start:dev
```

### 2️⃣ Acessar o Frontend

```
Abra no navegador: http://localhost:3000/public/index.html
```

### 3️⃣ Testar a Aplicação

1. **Crie uma conta**: Clique em "Criar nova conta"
2. **Faça login**: Use suas credenciais
3. **Teste o CRUD**: Crie, edite e delete usuários
4. **Confirme a exclusão**: Use o modal de confirmação

## Licença

Este projeto está licenciado sob a licença UNLICENSED.

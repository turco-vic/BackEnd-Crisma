# Sistema de Gestão de Crisma - Backend

API REST para gerenciamento de turmas de crisma, desenvolvida com Node.js, Express e PostgreSQL. O sistema permite o controle de turmas, crismandos, coordenadores, encontros e presenças.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação da API
- **Multer** - Upload de arquivos
- **CORS** - Controle de acesso
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12 ou superior)
- [Git](https://git-scm.com/)

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/turco-vic/BackEnd-Crisma.git
cd BackEnd-Crisma2
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configuração do Banco de Dados PostgreSQL

#### 3.1. Instalação do PostgreSQL

**Windows:**
1. Baixe o PostgreSQL em: https://www.postgresql.org/download/windows/
2. Execute o instalador e siga as instruções
3. Anote a senha do usuário `postgres`

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

#### 3.2. Criação do Banco de Dados e Tabelas

**Opção 1: Usando arquivo SQL (Recomendado)**
```bash
# Windows/Linux/macOS
psql -U postgres -f src/database/schema.sql
```

**Opção 2: Copiando e colando manualmente**

1. Acesse o PostgreSQL:
```bash
psql -U postgres
```

2. Abra o arquivo `src/database/schema.sql` em um editor de texto
3. Copie todo o conteúdo do arquivo
4. Cole no terminal do psql e pressione Enter
5. Aguarde a execução de todos os comandos (criação do banco, tabelas e dados iniciais)
6. Saia do psql:
```sql
\q
```

**Verificação:**
Para confirmar que tudo foi criado corretamente:
```bash
psql -U postgres -d crisma -c "\dt"
```
Deve mostrar a lista de tabelas criadas.

### 4. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crisma
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

# Ambiente
NODE_ENV=development
```

**⚠️ Importante:** Substitua `sua_senha_aqui` pela senha que você definiu durante a instalação do PostgreSQL.

### 5. Estrutura de Pastas

```
BackEnd-Crisma2/
├── src/
│   ├── config/
│   │   ├── database.js      # Configuração do PostgreSQL
│   │   └── swagger.js       # Configuração do Swagger
│   ├── controllers/         # Controladores da API
│   ├── models/             # Modelos de dados
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares
│   └── database/
│       └── schema.sql      # Script de criação das tabelas
├── uploads/                # Arquivos enviados
├── public/                 # Arquivos estáticos
├── server.js              # Arquivo principal
├── package.json           # Dependências do projeto
└── README.md              # Este arquivo
```

## 🚀 Executando a Aplicação

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

A API estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação interativa do Swagger em:

```
http://localhost:3000/api-docs
```

## 🔗 Endpoints Principais

### Crismandos
- `GET /api/crismandos` - Listar todos os crismandos
- `POST /api/crismandos` - Criar novo crismando
- `GET /api/crismandos/:id` - Buscar crismando por ID
- `PUT /api/crismandos/:id` - Atualizar crismando
- `DELETE /api/crismandos/:id` - Deletar crismando

### Turmas
- `GET /api/turmas` - Listar todas as turmas
- `POST /api/turmas` - Criar nova turma
- `GET /api/turmas/:id` - Buscar turma por ID
- `PUT /api/turmas/:id` - Atualizar turma
- `DELETE /api/turmas/:id` - Deletar turma

### Encontros
- `GET /api/encontros` - Listar todos os encontros
- `POST /api/encontros` - Criar novo encontro
- `GET /api/encontros/:id` - Buscar encontro por ID
- `PUT /api/encontros/:id` - Atualizar encontro
- `DELETE /api/encontros/:id` - Deletar encontro

### Presenças
- `GET /api/presencas` - Listar todas as presenças
- `POST /api/presencas` - Registrar presença
- `PUT /api/presencas/:id` - Atualizar presença

### Coordenadores
- `GET /api/coordenadores` - Listar coordenadores
- `POST /api/coordenadores` - Criar coordenador
- `GET /api/coordenadores/:id` - Buscar coordenador por ID
- `PUT /api/coordenadores/:id` - Atualizar coordenador
- `DELETE /api/coordenadores/:id` - Deletar coordenador

## 🗄️ Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas principais:

- **turmas** - Informações das turmas de crisma
- **crismandos** - Dados dos participantes
- **coordenadores** - Informações dos coordenadores
- **encontros** - Dados dos encontros/aulas
- **presencas** - Registro de presenças nos encontros
- **banner_carrocel** - Eventos e avisos

## 📁 Upload de Arquivos

O sistema suporta upload de arquivos (fotos de perfil, certificados) na pasta `uploads/`. Os arquivos são acessíveis via:

```
http://localhost:3000/uploads/nome_do_arquivo.ext
```

## 🛠️ Scripts Disponíveis

```bash
# Iniciar em modo de desenvolvimento (com nodemon)
npm run dev

# Iniciar em modo de produção  
npm start

# Verificar dependências
npm list
```

## ⚠️ Solução de Problemas

### Erro de Conexão com o Banco
1. Verifique se o PostgreSQL está rodando
2. Confirme as credenciais no arquivo `.env`
3. Certifique-se de que o banco `crisma` foi criado

### Erro de Porta em Uso
```bash
# Verificar qual processo está usando a porta
netstat -tulpn | grep :3000

# Alterar a porta no arquivo .env
PORT=3001
```

### Erro de Permissões em Uploads
```bash
# Linux/macOS
chmod 755 uploads/

# Windows - verificar permissões da pasta no Explorer
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Enzo Turcovic**
- GitHub: [@turco-vic](https://github.com/turco-vic)
- Email: enzoturcovic@gmail.com

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a seção de "Solução de Problemas" acima
2. Consulte a documentação do Swagger em `/api-docs`
3. Abra uma issue no GitHub
4. Entre em contato com o desenvolvedor

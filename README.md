# BackEnd-Crisma

## Descrição do Projeto

Este projeto é uma API Back-End desenvolvida para gerenciar o sistema de Crisma de uma paróquia. O sistema permite o controle completo de turmas, crismandos, encontros e presenças, facilitando a administração dos grupos de confirmação católica.

## Funcionalidades

- **Gerenciamento de Turmas**: CRUD completo para turmas de crisma, incluindo dados do coordenador e informações gerais
- **Controle de Crismandos**: Cadastro e gestão dos crismandos com dados pessoais, fotos e vinculação às turmas
- **Agenda de Encontros**: Criação e organização dos encontros por turma com controle de horários e locais
- **Lista de Presenças**: Sistema de controle de presença por encontro com relatórios de frequência
- **Relatórios**: Geração de relatórios de presença e estatísticas por turma
- **Upload de Imagens**: Sistema de upload para fotos de perfil dos crismandos

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript para o servidor
- **Express.js**: Framework web para Node.js
- **PostgreSQL**: Banco de dados relacional com relacionamentos complexos
- **Multer**: Middleware para upload de arquivos
- **Swagger/OpenAPI**: Documentação interativa da API
- **dotenv**: Gerenciamento de variáveis de ambiente
- **CORS**: Controle de acesso entre origens

## Estrutura do Projeto

```
├── src/
│   ├── config/
│   │   ├── database.js     # Configuração do PostgreSQL
│   │   ├── swagger.js      # Configuração do Swagger
│   │   └── upload.js       # Configuração do Multer
│   ├── controllers/        # Lógica de negócios
│   │   ├── turmaController.js
│   │   ├── crismandoController.js
│   │   ├── encontroController.js
│   │   └── presencaController.js
│   ├── models/            # Interação com banco de dados
│   │   ├── turmaModel.js
│   │   ├── crismandoModel.js
│   │   ├── encontroModel.js
│   │   └── presencaModel.js
│   ├── routes/            # Definição das rotas da API
│   │   ├── turmaRoutes.js
│   │   ├── crismandoRoutes.js
│   │   ├── encontroRoutes.js
│   │   └── presencaRoutes.js
│   ├── middleware/        # Middlewares customizados
│   │   └── upload.js      # Configuração de upload
│   └── database/
│       └── schema.sql     # Schema do banco de dados
├── uploads/               # Diretório para arquivos enviados
├── public/               # Arquivos estáticos (CSS do Swagger)
├── server.js             # Ponto de entrada da aplicação
└── package.json          # Dependências e scripts
```

## API Endpoints

### Turmas
- `GET /api/turmas` - Listar todas as turmas
- `GET /api/turmas/:id` - Buscar turma por ID
- `POST /api/turmas` - Criar nova turma
- `PUT /api/turmas/:id` - Atualizar turma
- `DELETE /api/turmas/:id` - Excluir turma

### Crismandos
- `GET /api/crismandos` - Listar todos os crismandos
- `GET /api/crismandos/:id` - Buscar crismando por ID
- `GET /api/crismandos/turma/:turma_id` - Listar crismandos por turma
- `POST /api/crismandos` - Criar novo crismando
- `PUT /api/crismandos/:id` - Atualizar crismando
- `DELETE /api/crismandos/:id` - Excluir crismando

### Encontros
- `GET /api/encontros` - Listar todos os encontros
- `GET /api/encontros/:id` - Buscar encontro por ID
- `GET /api/encontros/turma/:turma_id` - Listar encontros por turma
- `POST /api/encontros` - Criar novo encontro
- `PUT /api/encontros/:id` - Atualizar encontro
- `DELETE /api/encontros/:id` - Excluir encontro

### Presenças
- `GET /api/presencas` - Listar todas as presenças
- `GET /api/presencas/encontro/:encontro_id` - Listar presenças por encontro
- `GET /api/presencas/crismando/:crismando_id` - Listar presenças por crismando
- `GET /api/presencas/relatorio/:turma_id` - Relatório de presenças por turma
- `POST /api/presencas` - Registrar presença
- `PUT /api/presencas/:id` - Atualizar presença
- `DELETE /api/presencas/:id` - Excluir registro de presença

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/turco-vic/BackEnd-Crisma.git
cd BackEnd-Crisma
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados PostgreSQL:
```bash
createdb crisma
```

4. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=crisma
DB_PORT=5432
```

5. Execute o schema do banco de dados:
```bash
psql -d crisma -f src/database/schema.sql
```

6. Inicie o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000` e a documentação Swagger estará disponível em `http://localhost:3000/doc`.

## Documentação da API

A documentação completa da API está disponível através do Swagger UI em:
```
http://localhost:3000/doc
```

A documentação inclui:
- Descrição detalhada de todos os endpoints
- Exemplos de requisições e respostas
- Schemas dos modelos de dados
- Interface interativa para testar a API

## Scripts Disponíveis

- `npm start` - Inicia o servidor em modo de produção
- `npm run dev` - Inicia o servidor em modo de desenvolvimento (com nodemon)
- `node check-data.js` - Verifica os dados no banco de dados

## Estrutura do Banco de Dados

O banco possui as seguintes tabelas principais:

- **turmas**: Armazena informações das turmas de crisma
- **crismandos**: Cadastro dos participantes vinculados às turmas
- **encontros**: Agenda de encontros por turma
- **presencas**: Controle de presença dos crismandos nos encontros

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Faça commit das suas alterações: `git commit -m "Adiciona nova feature"`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões:
- Email: enzoturcovic@gmail.com
- GitHub: [@turco-vic](https://github.com/turco-vic)

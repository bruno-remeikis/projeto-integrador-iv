# Projeto Integrador IV: IA corretora de provas

Esta é uma aplicação acadêmica desenvolvida para a matéria Projeto Integrador IV, ministrada pelo docente [Roward Roatti](https://github.com/howardroatti) em 2024/2, turmas 6HC1 e 6SC1.

Desenvolvido por:
- Bruno Coutinho Remeikis
- Gustavo Streig
- Amanda de Moraes

## Projeto
Trata-se de uma aplicação web que te permite enviar avaliações educacionais (como provas, simulados, etc.) e as corrige utilizando inteligência artificial.

## Tecnologias utilizadas

### API
- Python 3.9
- FastAPI + Uvicorn (exposição da API)
- Unstructured (extração de texto dos arquivos)
- Google Generative AI / Gemini (integração com IA)
### Front-end
  - React 18
  - Next.js 14 (Framework)
  - Tailwind CSS (estilização)
  - Shadcn UI (reutilização de componentes)

## Get Started

### Iniciar API

#### ⚙️ Configurações iniciais

Crie o arquivo chamado `.env` na raiz deste projeto.\
Neste arquivo, cole as variáveis abaixo e preencha-as ou altere-as de
acordo com sua necessidade.
```properties
GOOGLEAI_API_KEY=
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
```

Para rodar a aplicação, é necessário ter o [Docker](https://www.docker.com/get-started/) instalado e rodando em sua máquina.

#### 📦 Construir imagem
Antes de, de fato, rodarmos a aplicação, precisamos construir sua imagem Docker. Para isso, execute: 
```sh
docker compose build
```

**Obs.:** Este passo é necessário sempre que or arquivos Docker ou `requirements.txt` forem alterados

#### 🚀 Rodar aplicação
Já tendo a imagem construída, para rodarmos a aplicação, execute: 
```sh
docker compose up
```



### Iniciar Front-end

#### ⚒️ Instalar dependências
Uma única vez, instale as dependências do projeto, executando:
```sh
npm install
```

#### 🚀 Rodar aplicação
Para iniciarmos o front-end, execute o comando abaixo dentro do diretório `web`: 
```sh
npm run dev
```

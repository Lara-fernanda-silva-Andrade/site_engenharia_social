![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)  
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)  
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)  



# 📰 Projeto
O **Portal de Notícias**

---

## 🚀 Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express  
- **Banco de Dados:** MySQL  
- **Hospedagem:**  
  - Frontend: GitHub Pages  
  - Backend & Banco: Render


  ## 📊 Arquitetura
O sistema segue a arquitetura **cliente-servidor**.
```mermaid
flowchart TD
    subgraph Client["Usuário / Navegador"]
        Browser["🌐 Navegador (HTML, CSS, JS)"]
    end

    subgraph Frontend["Frontend (GitHub Pages)"]
        Pages["GitHub Pages (HTML + CSS + JS)"]
    end

    subgraph Backend["Backend (Render - Node.js + Express)"]
        API["API REST (server.js)"]
    end

    subgraph Database["Banco de Dados (MySQL - Railway)"]
        DB[("MySQL Database")]
    end

    %% Conexões
    Browser -->|"HTTP/HTTPS Request"| Pages
    Pages -->|"Fetch API / HTTP"| API
    API -->|"SQL Queries"| DB
    DB -->|"Resultados SQL"| API
    API -->|"JSON Response"| Pages
```

---

## 📂 Estrutura do Projeto
```
/frontend      → Código do site (HTML, CSS, JS)
  ├── index.html
  ├── style.css
  └── script.js
/backend       → API em Node.js + Express
  ├── server.js       →
  ├── db.js     
  ├── package.json
  ├── package-lock.json
  └── .env   
/sql            
```
---
## 🔄 Fluxo de Requisição
```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend (GitHub Pages)
    participant B as Backend (Railway - Node.js)
    participant D as Banco de Dados (MySQL)

    U->>F: Acessa site pelo navegador
    F->>B: Requisição HTTP (POST /visitas)
    B->>D: Incrementa contador no MySQL
    D-->>B: Retorna contador atualizado
    B-->>F: Resposta JSON com contador
    F-->>U: Renderiza contador na tela
```
---

## 💻 Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/contador-acessos.git
cd contador-acessos

```

### 2. Configurar Backend
```bash
cd backend
npm install

```

### 3. Criar arquivo `.env`
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha_mysql
DB_NAME=contador_site
PORT=3000

```

### 4. Criar banco e tabela no MySQL
```bash

CREATE DATABASE IF NOT EXISTS contador_site CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE contador_site;

CREATE TABLE IF NOT EXISTS visitas (
    id INT PRIMARY KEY,
    contador BIGINT NOT NULL DEFAULT 0,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO visitas (id, contador) VALUES (1, 0)
ON DUPLICATE KEY UPDATE contador = contador;

```

### 5. Rodar o servidor
```bash
npm start
# ou
npm run dev

```
A API estará disponível em:  
👉 http://localhost:3000  


## 🌍 Deploy em Produção

No **Railway**, configurar as variáveis de ambiente do .env:  
- DB_HOST  
- DB_PORT  
- DB_USER  
- DB_PASSWORD  
- DB_NAME  
- PORT  

Depois, usar a URL pública do backend no script.js do frontend hospedado no GitHub Pages.



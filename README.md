# Sistema Bancário Simples - Node.js

Um sistema bancário simples em linha de comando desenvolvido em Node.js que permite ao usuário criar conta, consultar saldo, fazer depósitos e saques de forma interativa.

---

## Índice

- [Descrição](#descrição)  
- [Funcionalidades](#funcionalidades)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Como Usar](#como-usar)  
- [Detalhes Técnicos](#detalhes-técnicos)  
- [Considerações e Melhorias Futuras](#considerações-e-melhorias-futuras)  

---

## Descrição

Este projeto é uma aplicação simples de sistema bancário que roda no terminal, permitindo criar contas com senha, consultar saldo, realizar depósitos e saques. As informações das contas são armazenadas localmente em arquivos JSON, em uma pasta chamada `accounts`.

Ideal para aprendizado prático de manipulação de arquivos, entrada de dados via terminal e uso de bibliotecas populares em Node.js, como `inquirer` e `chalk`.

---

## Funcionalidades

- Criar nova conta com nome e senha
- Consultar saldo da conta mediante senha
- Depositar valores em conta existente
- Sacar valores, respeitando saldo disponível
- Validação da existência da conta
- Validação de senha para operações sensíveis
- Interface interativa via terminal com menus amigáveis e mensagens coloridas

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)  
- [Inquirer](https://www.npmjs.com/package/inquirer) (para entrada interativa de dados)  
- [Chalk](https://www.npmjs.com/package/chalk) (para cores e estilo no terminal)  
- Módulo interno `fs` do Node.js para manipulação de arquivos  

---

## Como Usar

### Pré-requisitos

- Node.js instalado (versão 12+ recomendada)
- NPM instalado

### Passos

1. Clone este repositório ou copie os arquivos para seu ambiente local.
2. Execute `npm install` para instalar as dependências:
    ```bash
    npm install inquirer chalk
3. Execute o sistema com:
    ```bash
    npm start
4. Siga as instruções exibidas no terminal para realizar as operações bancárias.

---

## Detalhes Técnicos
- Armazenamento das contas: Cada conta é salva em um arquivo JSON dentro da pasta accounts, nomeado pelo nome da conta.

- Formato do arquivo JSON da conta:
    ```bash
    {
      "balance": 0,
      "password": "suaSenhaAqui"
    }

- Validações:

  - Verifica se a conta já existe antes de criar nova conta.
  - Confirma existência da conta para depósito, consulta e saque.
  - Confirma senha para consulta de saldo e saque.
  - Verifica saldo suficiente para realizar saques.

- Interface: Utiliza menus interativos via inquirer para guiar o usuário na operação desejada. Mensagens de sucesso e erro são coloridas com chalk para melhor experiência visual.

---

## Considerações e Melhorias Futuras

- Segurança:
As senhas estão armazenadas em texto simples, o que não é seguro para aplicações reais. Uma melhoria importante seria aplicar hashing (ex: bcrypt).

- Validação de entradas:
Melhorar validação de valores numéricos para depósitos e saques (ex: impedir valores negativos, entrada de texto inválido).

- Interface:
Adicionar mais feedback para operações, como histórico de transações.

- Multiplos usuários simultâneos:
Implementar banco de dados real para escalabilidade.

- Autenticação:
Criar fluxo de login para manter usuário autenticado durante sessão.

- Testes:
Adicionar testes unitários e integração para garantir estabilidade.

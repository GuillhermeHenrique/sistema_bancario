// Módulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// Módulos internos
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Qual operação deseja realizar?",
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Criar conta") {
        createAccount();
      } else if (action === "Consultar saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por utilizar o Accounts!"));
        process.exit();
      }
    })
    .catch((error) => console.log(error));
}

// Criando conta
function createAccount() {
  console.log(chalk.bgGreen.black("Agradecemos por escolher nosso banco"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Essa conta já existe!"));

        buildAccount();
        return;
      }

      inquirer
        .prompt([
          {
            name: "password",
            message: "Digite a senha da sua conta: ",
          },
        ])
        .then((answer) => {
          const password = answer["password"];

          fs.writeFileSync(
            `accounts/${accountName}.json`,
            `{"balance": 0, "password": ${password}}`,
            function (error) {
              console.log(error);
            }
          );

          console.log(chalk.green("Parabéns! A sua conta foi criada"));

          operation();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

// Depositando na conta do usuário
function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da conta que deseja depositar?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // Verifica se a conta existe
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto deseja depositar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          // Adiciona certa quantidade
          addAmount(accountName, amount);

          operation();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

// Verificando se a conta existe
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Essa conta não existe!"));
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu algum erro!"));

    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (error) {
      console.log(error);
    }
  );

  console.log(chalk.green(`Foi depositado R$${amount} na sua conta!`));
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

// show account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // Verifica se a conta existe
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      inquirer
        .prompt([
          {
            name: "password",
            message: "Qual a senha da sua conta?",
          },
        ])
        .then((answer) => {
          const password = answer["password"];

          if (!verifyPassword(accountName, password)) {
            console.log(chalk.bgRed.black("Senha incorreta!"));
            return getAccountBalance();
          }

          const accountData = getAccount(accountName);

          console.log(
            chalk.bgBlue.black(
              `Olá! O saldo da sua conta é: ${accountData.balance}`
            )
          );

          operation();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "password",
            message: "Qual a senha da sua conta?",
          },
        ])
        .then((answer) => {
          const password = answer["password"];

          if (!verifyPassword(accountName, password)) {
            console.log(chalk.bgRed.black("Senha incorreta!"));
            return withdraw();
          }

          inquirer
            .prompt([
              {
                name: "amount",
                message: "Quanto você deseja sacar?",
              },
            ])
            .then((answer) => {
              const amount = answer["amount"];

              removeAmount(accountName, amount);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu algum erro, tente novamente mais tarde")
    );

    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(bgRed.black("Valor indisponível!"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (error) {
      console.log(error);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`)
  );

  operation();
}

function verifyPassword(accountName, password) {
  const accountData = getAccount(accountName);

  return accountData.password == password;
}

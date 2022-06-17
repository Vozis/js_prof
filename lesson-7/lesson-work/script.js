// const c = require("./func");

// console.log(c.func.a(10));
// console.log(c.func.b(2));

// const os = require("os");
// console.log(os.cpus());

// Работа с файлами
// модуль file system fs

/*
const fs = require("fs");

// Запись данных в файл, можно записывать только текствоые данные
let users = [{ name: "bob", id: 10 }];

fs.writeFile("test.json", JSON.stringify(users), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Данные успешно сохранены");
  }
});

// Чтение данных из файла
fs.readFile("test.JSON", "UTF-8", (err, data) => {
  // data - исодник файла, который считали
  if (err) {
    console.log(err);
  } else {
    let user = '{"name": "Mem", "id": 15 }';
    let users = JSON.parse(data);
    users.push(JSON.parse(user));
    fs.writeFile("test.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Данные успешно сохранены");
      }
    });
  }
});

*/

// модуль moment - серверные дата и время
const moment = require("moment");
console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));

// модуль http

const http = require("http");

// модуль слудит для обработки запросов на стороне сервера

// client - скрипт, который дедлает запрос на сервер, например при помощи fetch
// сервер - ПО, которое отвечает на запрос

// Запросы на сервер поступают по протоколу http
// Rest API

/*
методы протокола HTTP:
1) GET - для получения данных от сервера
2) POST - для вставки данных, лучше пердать тело запроса body
3) PUT - для обновления данных 
4) DELETE - для удаления данных, удалять по id 
*/

const server = http.createServer((req, res) => {
  // req - request, объект, который используется для получения данных от клиента
  // res - response, объект, который содержит данные для клиента от сервера
  if (req.url == "/") {
    res.write("Welcome to server!");
    res.end();
  }
});

server.on("connection", (socket) => {
  // socket - это объект, предоставляющий возможность серверу ответчать на запросы в режиме онлайн
  console.log("Соединение установлено");
});

server.listen("3000");

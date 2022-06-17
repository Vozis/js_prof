const express = require("express");

const app = express(); // app - объект, которые может обрабатывать запросы любыми методами

app.listen(3000, () => {
  console.log("Связь с сервером успешно утсановлена");
});

app.get("/", (req, res) => {
  res.send("Ответ от сервера!!!!");
});

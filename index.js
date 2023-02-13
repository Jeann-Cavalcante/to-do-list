const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const connectToDb = require("./database/db");

connectToDb(); //Conectando o mongoDb
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs"); //Especificando view engine
app.use(express.static(path.join(__dirname, "public"))); //Especificando arquivos estaticos
app.use(express.urlencoded()); // receber formulario pelo body
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na http://localhost:${port}`);
});

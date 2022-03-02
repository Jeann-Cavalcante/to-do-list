const { application } = require("express");
const express = require("express");
const path = require("path");
const routes = require("./routes/routes");

const app = express();

const port = 3000;
app.set("view engine", "ejs"); //Especificando view engine
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta:${port}`);
});

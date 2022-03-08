const Task = require("../models/Task");

let message = '';
let type = '';

const getAllTasks = async (req, res) => {
  try {
    setTimeout(() => {
      message = '';
    },2000) // apos dois segundos o message voltara ser vazio
    const tasksList = await Task.find();
    return res.render("index", { 
      tasksList, 
      task: null, 
      taskDelete: null,
      message,
      type });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body; // buscando do body

  if (!task.task) {
    message = 'insera um texto,  antes de adicionar a tarefa!'
    type = 'danger'
    return res.redirect("/"); //Redirecionando a pag. (recarregando)
  }

  //Try Tente cadastrar no banco
  try {
    await Task.create(task); //Criando modelo Task de models
    message = "Tarefa criada com sucesso!";
    type = "success";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    //findOne pegar apenas um/ reutilizando cogido
    const tasksList = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, tasksList, taskDelete: null, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, tasksList, taskDelete, message, type });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa atualizada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async(req, res) => {
  try {
    await Task.deleteOne({_id: req.params.id})
    message = "Tarefa apagada com sucesso!";
    type = "success";
    res.redirect("/")
  }catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// exportando como objeto
module.exports = {
  getAllTasks,
  createTask,
  getById,
  updateOneTask,
  deleteOneTask,
};

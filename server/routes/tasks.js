const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const Tasks = require("../models/tasks");
const { authenticateToken } = require("../utils");

// get all tasks
router.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Tasks.find({
      created_by: req.user.username,
    });
    if (tasks.length === 0 || !tasks)
      return res.status(404).json({ msg: "No tasks found" });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

// get task by id
router.get("/task/:id", authenticateToken, async (req, res) => {
  try {
    const task = await Tasks.findOne({
      _id: req.params.id,
      created_by: req.user.username,
    });
    if (task == null) {
      return res.status(404).json({ msg: "Cannot find task" });
    }
    res.json(task);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

// create new task
router.post("/tasks", authenticateToken, async (req, res) => {
  try {
    if (
      req.body.title === undefined ||
      req.body.description === undefined ||
      req.body.deadline === undefined
    )
      return res
        .status(422)
        .json({ msg: "Please enter a valid task in request body" });
    const task = new Tasks({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      created_by: req.user.username,
    });
    await task.save();
    res.status(201).json({ msg: "Task created", task });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

// update task
router.put("/tasks/:id", authenticateToken, async (req, res) => {
  const task = req.body.task;
  if (task === undefined)
    return res
      .status(422)
      .json({ msg: "Please enter a valid task in request body" });
  try {
    const currentTask = await Tasks.findOne({
      _id: req.params.id,
      created_by: req.user.username,
    });
    if (currentTask == null) {
      return res.status(404).json({ msg: "Cannot find task" });
    }
    if (task.title !== null) currentTask.title = task.title;
    if (task.description !== null) currentTask.description = task.description;
    if (task.status !== null) currentTask.status = task.status;
    if (task.deadline !== null) currentTask.deadline = task.deadline;
    await currentTask.save();
    res.json(currentTask);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// delete task
router.delete("/tasks/:id", authenticateToken, async (req, res) => {
  try {
    const targetTask = await Tasks.findOne({
      _id: req.params.id,
      created_by: req.user.username,
    });
    if (targetTask) {
      targetTask.deleteOne();
      res.status(200).json({ msg: "Task deleted" });
    } else res.status(404).json({ msg: "Task not found" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;

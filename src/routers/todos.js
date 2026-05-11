import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { content, time, status, done } = req.body;
    const todo = await Todo.create({ content, time, status, done });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { content, time, status, done } = req.body;
    const update = {};
    if (content !== undefined) update.content = content;
    if (time !== undefined) update.time = time;
    if (status !== undefined) update.status = status;
    if (done !== undefined) update.done = done;

    const todo = await Todo.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "deleted", id: todo._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

const { ObjectId } = require('mongodb');
const db = require('../db/conn');

const collection = () => db.getDb().collection('tasks');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await collection().find().toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const task = await collection().findOne({ _id: id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const result = await collection().insertOne({ title, description, completed: !!completed });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const id = new ObjectId(req.params.id);
    const result = await collection().updateOne(
      { _id: id },
      { $set: { title, description, completed: !!completed } }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID or update failed' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await collection().deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID or delete failed' });
  }
};

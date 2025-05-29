const { ObjectId } = require('mongodb');
const db = require('../db/conn');

const collection = () => db.getDb().collection('categories');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await collection().find().toArray();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const category = await collection().findOne({ _id: id });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await collection().insertOne({ name });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const id = new ObjectId(req.params.id);
    const result = await collection().updateOne({ _id: id }, { $set: { name } });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID or update failed' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await collection().deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID or delete failed' });
  }
};

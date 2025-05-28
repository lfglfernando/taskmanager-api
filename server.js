const express = require('express');
const cors = require('cors');
const { connectToServer } = require('./db/conn');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 3000;

connectToServer(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});

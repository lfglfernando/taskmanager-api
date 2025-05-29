const express = require('express');
const cors = require('cors');


const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };

  
const { connectToServer } = require('./db/conn');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');



const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

const swaggerDocs = require('./swagger');
swaggerDocs(app);

const port = process.env.PORT || 3000;

connectToServer(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});


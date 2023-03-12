const express = require('express');
const cookieParser = require('cookie-parser')
const { connectDB } = require('./config/database.config')
const indexRoute = require('./routes/index.route')

const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser())

// Routes
app.use('/api/v1', indexRoute)


// Database & Server Connection
const port = process.env.PORT || 3200;
app.listen(port, () => {
    connectDB()
    console.log(`Server listening on port ${port}`);
})
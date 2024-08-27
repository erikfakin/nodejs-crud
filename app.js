const express = require('express');
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');

const app = express();

app.use(bodyParser.json())
app.use('/users', userRoutes);
app.use(express.static('public'))

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}. \nVisit the frontend: [http://localhost:${config.port}]`);
});
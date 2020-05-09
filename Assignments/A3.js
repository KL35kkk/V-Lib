const express = require('express');
const path = require('path');

const app = express();

const itemRouter = require('./A3-folder/routers/items');
const mallRouter = require('./A3-folder/routers/mall');

app.use(express.static(path.join(__dirname, 'A3-folder', 'public')));

app.use('/users', itemRouter);
app.use(mallRouter);

app.listen(3000);
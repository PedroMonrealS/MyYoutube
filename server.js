const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = 3000;
app.use(express.json());


app.use(express.static("views"));

app.use(bodyParser.urlencoded({ extended: false })); //Para analizar los datos json

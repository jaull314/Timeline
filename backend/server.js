import dotenv from 'dotenv';
dotenv.config();
import sampleEvents from './data/sampleEvents.js';
import connectDB from './config/db.js';
import express from 'express';
import { dataSeeder } from './controllers/timelineController.js';

connectDB() //connect to Mongo Database

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
    dataSeeder();
    res.json(sampleEvents)
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
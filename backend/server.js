import express from 'express';
import sampleEvents from './data/sampleEvents.js';
const port = 5000;

const app = express();

app.get("/", (req, res) => {
    res.json(sampleEvents)
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
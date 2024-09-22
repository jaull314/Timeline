import dotenv from 'dotenv';
dotenv.config();
import sampleEvents from './data/sampleEvents.js';
import connectDB from './config/db.js';
import cors from 'cors';
import express from 'express';
import {getTimeline, 
    getAllTimelines, 
    addTimelineEvent, 
    addTimeline, 
    deleteEvent,
    deleteTimeline
} from './controllers/timelineController.js';

connectDB() //connect to Mongo Database

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log(timelineDocId)
    res.json(sampleEvents)
})

app.get("/getTimeline/:id", getTimeline);

app.get("/getAllTimelines", getAllTimelines);

app.post("/addTimeline", addTimeline);

app.post("/addTimelineEvent/:id", addTimelineEvent);

app.delete("/deleteTimeline/:id", deleteTimeline);

app.delete("/deleteEvent/:id/:eventId", deleteEvent)

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
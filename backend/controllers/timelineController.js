import Timeline from "../models/timelineModel.js"


export async function getTimeline(req, res){
    const id = req.params.id;
    const timeline = await Timeline.findOne({_id: id})
    console.log(timeline)
    res.json(timeline)
}

export async function getAllTimelines(req, res){
    const timelines = await Timeline.find({})
    console.log(timelines)
    res.json(timelines)
}

export async function addTimeline(req, res){
    let timelineDoc = await Timeline.create({
            timelineColor: "Azure",
            timelineName: "Bobbity BOOO!"
    })
    console.log(timelineDoc)
    res.json(timelineDoc)
}

export async function addTimelineEvent(req, res){
    const id = req.params.id;
    const {title, timeOfEvent} = req.body;
    console.log("title", title)
    console.log("timeOfEvent", timeOfEvent)
    /*let updatedDoc = await Timeline.updateOne(
        {_id: id},
        {$push: {timelineEvents: {title: "Treaty of Paris", timeOfEvent: 1783}}}
        
    )
    console.log(updatedDoc)
    res.json(updatedDoc)*/
    res.send("hyellow")
}

export async function deleteEvent(req, res){
    const id = req.params.id;
    const eventId = req.params.eventId;
    let deletedEvent = await Timeline.findByIdAndUpdate(id, {$pull: {timelineEvents: {_id: eventId}}})
    res.json(deleteEvent)
}

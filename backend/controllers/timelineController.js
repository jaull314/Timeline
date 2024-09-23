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
    const {color, name} = req.body;
    let timelineDoc = await Timeline.create({
            timelineColor: color,
            timelineName: name
    })
    res.json(timelineDoc)
}

export async function addTimelineEvent(req, res){
    const id = req.params.id;
    const {title, timeOfEvent, description} = req.body;
    let updatedDoc = await Timeline.updateOne(
        {_id: id},
        {$push: {timelineEvents: {title: title, timeOfEvent: timeOfEvent, description: description}}}
        
    )
    console.log(updatedDoc)
    res.json(updatedDoc)
}

export async function deleteTimeline(req, res){
    const id = req.params.id;
    let deletedTimeline = await Timeline.findByIdAndDelete(id)
    res.json(deleteTimeline)
}

export async function deleteEvent(req, res){
    const id = req.params.id;
    const eventId = req.params.eventId;
    let deletedEvent = await Timeline.findByIdAndUpdate(id, {$pull: {timelineEvents: {_id: eventId}}})
    res.json(deleteEvent)
}

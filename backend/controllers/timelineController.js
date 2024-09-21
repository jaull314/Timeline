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
    let updatedDoc = await Timeline.updateOne(
        {_id: '66ee1fa6b93512b9316b2347'},
        {$push: {timelineEvents: {title: "Treaty of Paris", timeOfEvent: 1783}}}
        
    )
    console.log(updatedDoc)
    res.json(updatedDoc)
}


import Timeline from "../canvas/Timeline.js"

export default function SingleTimeline({timelineEventArr}){
    let timelineRef = new Timeline(timelineEventArr)
    console.log(timelineRef)
    return <h1>Hey Yall!</h1>
}
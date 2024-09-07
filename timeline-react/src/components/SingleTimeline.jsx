import Timeline from "../canvas/Timeline.js"
import TimelineCanvas from "./TimelineCanvas.jsx";
import { useRef, useState } from "react";

export default function SingleTimeline({timelineEventArr}){
    let timelineRef = useRef(new Timeline(timelineEventArr));

    let [visiblePartOfTimeline, setVisiblePartOfTimeline] = useState(timelineRef.current.visiblePartOfTimeline);

    return (
        <TimelineCanvas color={"red"} timelineObj={timelineRef.current}/>
    )
}
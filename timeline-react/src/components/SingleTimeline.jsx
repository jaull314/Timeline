import Timeline from "../canvas/Timeline.js"
import TimelineCanvas from "./TimelineCanvas.jsx";
import { useRef, useState, useEffect} from "react";

export default function SingleTimeline({timelineEventArr}){
    let timelineRef = useRef(new Timeline(timelineEventArr));
    let [visibleTimelineArr, setVisibleTimelineArr] = useState(timelineRef.current.visiblePartOfTimeline);   

    return (
        <>
            <TimelineCanvas color={"red"} timelineObj={timelineRef.current}/>
            <div className="buttonContainer">
                <div>
                    <button id="zoomOut" className="zoomOut" onClick={
                        () => {
                            timelineRef.current.zoomOutForTimeline();
                            setVisibleTimelineArr(timelineRef.current.visiblePartOfTimeline);
                        }
                    }> - </button>
                    <button id="zoomIn" className="zoomIn" onClick={
                        () => {
                            timelineRef.current.zoomInForTimeline();
                            setVisibleTimelineArr(timelineRef.current.visiblePartOfTimeline);
                        }
                    }> + </button>
                </div>
                <div>
                    <button className="scrollLeft"> &lt; </button>
                    <button className="scrollRight"> &gt; </button>
                </div>
            </div>
        </>
    )

}
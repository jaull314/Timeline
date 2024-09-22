import TimelineEvent from "../TimelineClasses/TimelineEvent.js";
import Timeline from "../TimelineClasses/Timeline.js"
import TimelineCanvas from "./TimelineCanvas.jsx";
import ScrollableCards from "./ScrollableCards.jsx";
import { useRef, useState} from "react";

export default function SingleTimeline({timelineObj}){
    let eventsArr = timelineObj.timelineEvents.map((tEvent) => new TimelineEvent(tEvent.title, tEvent.timeOfEvent));
    let timelineRef = useRef(new Timeline(eventsArr));
    let [visibleTimelineArr, setVisibleTimelineArr] = useState(timelineRef.current.visiblePartOfTimeline);   

    return (
        <> 
            <ScrollableCards color={"red"} visibleEvents={visibleTimelineArr} />
            <TimelineCanvas color={"red"} timelineObj={timelineRef.current}/>
            <div className="buttonContainer">
                <div>
                    <button id="zoomOut" className="zoomOut" onClick={() => {
                            timelineRef.current.zoomOutForTimeline();
                            setVisibleTimelineArr(timelineRef.current.visiblePartOfTimeline);}
                    }> - </button>

                    <button id="zoomIn" className="zoomIn" onClick={() => {
                            timelineRef.current.zoomInForTimeline();
                            setVisibleTimelineArr(timelineRef.current.visiblePartOfTimeline);}
                    }> + </button>
                </div>
                <div>
                    <button className="scrollLeft" onClick={() => {
                            timelineRef.current.scrollLeftForTimeline();
                            setVisibleTimelineArr(timelineRef.current.visiblePartOfTimeline);}
                    }> &lt; </button>

                    <button className="scrollRight" onClick={() => {
                            timelineRef.current.scrollRightForTimeline();
                            setVisibleTimelineArr(timelineRef.current.visiblePartOfTimeline);}
                    }> &gt; </button>
                </div>
            </div> 
        </> 
    )

}
import TimelineEvent from "../TimelineClasses/TimelineEvent.js";
import Timeline from "../TimelineClasses/Timeline.js"
import TimelineCanvas from "./TimelineCanvas.jsx";
import Header from "./Header.jsx";
import ScrollableCards from "./ScrollableCards.jsx";
import { useRef, useState} from "react";


export default function TwoTimelines({bothTimelines}){
    const [firstTimelineProp, secondTimelineProp] = bothTimelines;

    let firstEventsArr = firstTimelineProp.timelineEvents.map((tEvent) => new TimelineEvent(tEvent.title, tEvent.timeOfEvent));
    let firstTimeline = new Timeline(firstEventsArr);
    let secondEventsArr = secondTimelineProp.timelineEvents.map((tEvent) => new TimelineEvent(tEvent.title, tEvent.timeOfEvent));
    let secondTimeline = new Timeline(secondEventsArr)

    firstTimeline.setupComparedTimelines(secondTimeline)
    let firstTimelineRef = useRef(firstTimeline);
    let secondTimelineRef = useRef(secondTimeline);

    let bothVisibleArrs = [firstTimelineRef.current.visiblePartOfTimeline, secondTimelineRef.current.visiblePartOfTimeline];
    let [visibleTimelineArr, setVisibleTimelineArr] = useState(bothVisibleArrs);
    return ( 
        <>
         <Header />
         <ScrollableCards color={firstTimelineProp.timelineColor} visibleEvents={visibleTimelineArr[0]} />
         <TimelineCanvas color={firstTimelineProp.timelineColor} timeline={firstTimelineRef.current}/>
         <div id="twoTimelinesBtnContainer" className="buttonContainer">
                <div>
                    <button id="zoomOut" className="zoomOut" onClick={() => {
                            firstTimelineRef.current.zoomOutForTimeline();
                            secondTimelineRef.current.zoomOutForTimeline()
                            let bothVisibleArrs = [firstTimelineRef.current.visiblePartOfTimeline, secondTimelineRef.current.visiblePartOfTimeline];
                            setVisibleTimelineArr(bothVisibleArrs);}
                    }> - </button>

                    <button id="zoomIn" className="zoomIn" onClick={() => {
                            firstTimelineRef.current.zoomInForTimeline();
                            secondTimelineRef.current.zoomInForTimeline();
                            let bothVisibleArrs = [firstTimelineRef.current.visiblePartOfTimeline, secondTimelineRef.current.visiblePartOfTimeline];
                            setVisibleTimelineArr(bothVisibleArrs);}
                    }> + </button>
                </div>
                <div>
                    <button className="scrollLeft" onClick={() => {
                            firstTimelineRef.current.scrollLeftForTimeline();
                            secondTimelineRef.current.scrollLeftForTimeline();
                            let bothVisibleArrs = [firstTimelineRef.current.visiblePartOfTimeline, secondTimelineRef.current.visiblePartOfTimeline];
                            setVisibleTimelineArr(bothVisibleArrs);}
                    }> &lt; </button>

                    <button className="scrollRight" onClick={() => {
                            firstTimelineRef.current.scrollRightForTimeline();
                            secondTimelineRef.current.scrollRightForTimeline();
                            let bothVisibleArrs = [firstTimelineRef.current.visiblePartOfTimeline, secondTimelineRef.current.visiblePartOfTimeline];
                            setVisibleTimelineArr(bothVisibleArrs);}
                    }> &gt; </button>
                </div>
            </div> 
            <TimelineCanvas color={secondTimelineProp.timelineColor} timeline={secondTimelineRef.current}/>
            <ScrollableCards color={secondTimelineProp.timelineColor} visibleEvents={visibleTimelineArr[1]} />
        </>
    )
}
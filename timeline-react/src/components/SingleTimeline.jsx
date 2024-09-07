import Timeline from "../canvas/Timeline.js"
import TimelineCanvas from "./TimelineCanvas.jsx";
import { useRef, useState, useEffect} from "react";

export default function SingleTimeline({timelineEventArr}){
    let timelineRef = useRef(new Timeline(timelineEventArr));
    let [visiblePartOfTimeline, setVisiblePartOfTimeline] = useState(timelineRef.current.visiblePartOfTimeline);

    console.log(visiblePartOfTimeline)
    useEffect(() => {
        const zoomOutBtn = document.getElementById("zoomOut")
        zoomOutBtn.addEventListener("click", function(e){
            //console.log("Before: ", timelineRef.current._unitsPerPixel)
            timelineRef.current.zoomOutForTimeline();
            setVisiblePartOfTimeline(timelineRef.current.visiblePartOfTimeline);
            //console.log("After: ", timelineRef.current._unitsPerPixel)
        })
        const zoomInBtn = document.getElementById("zoomIn")
        zoomInBtn.addEventListener("click", function(e){
            //console.log("Before: ", timelineRef.current._unitsPerPixel)
            timelineRef.current.zoomInForTimeline();
            setVisiblePartOfTimeline(timelineRef.current.visiblePartOfTimeline);
            //console.log("After: ", timelineRef.current._unitsPerPixel)
        })     
        
    })

    return (
        <>
            <TimelineCanvas color={"red"} timelineObj={timelineRef.current}/>
            <div className="buttonContainer">
                <div>
                    <button id="zoomOut" className="zoomOut"> - </button>
                    <button id="zoomIn" className="zoomIn"> + </button>
                </div>
                <div>
                    <button className="scrollLeft"> &lt; </button>
                    <button className="scrollRight"> &gt; </button>
                </div>
            </div>
        </>
    )

}
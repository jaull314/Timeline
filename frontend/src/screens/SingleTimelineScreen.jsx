import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleTimeline from "../components/SingleTimeline.jsx"

export default function SingleTimelineScreen(){
  const {id} = useParams();
  const [timeline, setTimeline] = useState(null);

  const fetchTimeline = async () => {
    try {
          const response = await fetch(`http://localhost:5000/getTimeline/${id}`);
          if (!response.ok) {
                throw new Error('Network response was not ok');
          }
          const timelineResponse = await response.json();
          setTimeline(timelineResponse)
    } catch (error) {
          console.error('Error fetching timelines:', error);
    }
  }

  useEffect(() => {
    fetchTimeline()
  }, [])
    
    
      return (timeline === null  || timeline.timelineEvents.length === 0) ? <></> : <SingleTimeline timelineObj={timeline}/>;
}
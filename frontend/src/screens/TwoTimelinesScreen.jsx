import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import TwoTimelines from "../components/TwoTimelines.jsx"

export default function TwoTimelinesScreen(){
    const {firstId, secondId} = useParams();
    const [timelines, setTimelines] = useState(null);
  
    const fetchBothTimelines = async () => {

      try {
            const firstResponse = await fetch(`http://localhost:5000/getTimeline/${firstId}`);
            if (!firstResponse.ok) {
                  throw new Error('Network response was not ok');
            }
            const firstTimeline = await firstResponse.json();

            const secondResponse = await fetch(`http://localhost:5000/getTimeline/${secondId}`);
            if (!secondResponse.ok) {
                  throw new Error('Network response was not ok');
            }
            const secondTimeline = await secondResponse.json();
            setTimelines([firstTimeline, secondTimeline])
      } catch (error) {
            console.error('Error fetching timelines:', error);
      }
    }

    useEffect(() => {
        fetchBothTimelines();
    }, [])

    
    return ((timelines === null  || 
            timelines[0].timelineEvents.length === 0 || 
            timelines[0].timelineEvents.length === 0) ? <></> : <TwoTimelines bothTimelines={timelines}/>)

}
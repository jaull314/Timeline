import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

export default function EditTimeline(){
    const {id} = useParams();
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
      const fetchTimeline = async () => {
          try {
                const response = await fetch('http://localhost:5000/getTimeline/' + id);
                if (!response.ok) {
                      throw new Error('Network response was not ok');
                }
                const timeline = await response.json();
                setTimeline(timeline);
          } catch (error) {
                console.error('Error fetching timelines:', error);
          }
        
      }
      fetchTimeline();
    }, [])
    
    console.log("here it is:", timeline)


    return (
        <>
            <h1>Edit Timeline</h1>
            <table>
                  <thead>
                        <tr>
                              <th>Title</th>
                              <th>Event Time</th>
                        </tr>
                  </thead>
                  <tbody>
                        {timeline.timelineEvents.map((timelineEvent) => (
                              <tr key={timelineEvent._id}>
                                    <td>{timelineEvent.title}</td>
                                    <td>{timelineEvent.timeOfEvent}</td>
                              </tr>
                        ))}
                  </tbody>
            </table>
    
        </>
    )
}

       
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function EditTimeline(){
    const {id} = useParams();
    const [timeline, setTimeline] = useState({ timelineEvents: [] });

    const fetchAndSetTimeline = async () => {
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

    const deleteEvent = async (id, eventId) => {
      const response = await fetch('http://localhost:5000/deleteEvent/' + id + "/" + eventId, {method: 'DELETE'});
      //fetchAndSetTimeline()
      //console.log("id:", id, "eventId", eventId)
    }

    useEffect(() => {
      fetchAndSetTimeline();
    }, [])
    
    console.log("here it is:", id)

    return (
        <>
            <h1>Edit Timeline</h1>
            <table>
                  <thead>
                        <tr>
                              <th className="tableCol">Color</th>
                              <th className="tableCol">Title</th>
                              <th className="tableCol">Event Time</th>
                              <th className="tableCol">Description</th>
                              <th className="tableCol">First Event</th>
                              <th className="tableCol">Last Event</th>
                              <th className="tableCol">Delete</th>
                        </tr>
                  </thead>
                  <tbody>
                  {timeline.timelineEvents.map((timelineEvent, index) => (
                              <tr key={timelineEvent._id} className={(index % 2 === 0) ? "evenRow" : "oddRow"}>
                                    <td className="tableCol">Color</td>
                                    <td className="tableCol">{timelineEvent.title}</td>
                                    <td className="tableCol">{timelineEvent.timeOfEvent}</td>
                                    <td className="tableCol">Description</td>
                                    <td className="tableCol">First Event</td>
                                    <td className="tableCol">Last Event</td>
                                    <td className="tableCol trashCanCol">
                                          <button className="trashCanBtn" onClick={() => {deleteEvent(timeline._id, timelineEvent._id)}}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                          </button>
                                    </td>
                              </tr>
                  ))}
                  </tbody>
            </table>
    
        </>
    )
}

       
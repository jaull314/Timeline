import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";
import EditTimelineInput from "../components/EditTimelineInput";

export default function EditTimeline(){
    const {id} = useParams();
    const [timelineEvents, setTimelineEvents] = useState([]);

    const fetchAndRenderTimelineEvents = async () => {
      try {
            const response = await fetch(`http://localhost:5000/getTimeline/${id}`);
            if (!response.ok) {
                  throw new Error('Network response was not ok');
            }
            const timeline = await response.json();
            setTimelineEvents(timeline.timelineEvents)
      } catch (error) {
            console.error('Error fetching timelines:', error);
      }
    }

    const deleteEvent = async (id, eventId) => {
      await fetch(`http://localhost:5000/deleteEvent/${id}/${eventId}`, { method: 'DELETE' })
      fetchAndRenderTimelineEvents();
    }

    useEffect(() => {
      fetchAndRenderTimelineEvents();
    }, [])

    return (
        <>
            <Header />
            <h1 className="header">Edit Timeline</h1>
            <EditTimelineInput id={id} parentComponentCallback={fetchAndRenderTimelineEvents}  />
            <table className="editTable">
                  <thead>
                        <tr>
                              <th className="tableCol editTitleCol">Title</th>
                              <th className="tableCol editEventTimeCol">Event Time</th>
                              <th className="tableCol editDescriptCol">Description</th>
                              <th className="tableCol editDeleteCol">Delete</th>
                        </tr>
                  </thead>
                  <tbody>
                        {timelineEvents.map((timelineEvent, index) => (
                                    <tr key={timelineEvent._id} className={(index % 2 === 0) ? "evenRow" : "oddRow"}>
                                          <td className="tableCol editTitleCol">{timelineEvent.title}</td>
                                          <td className="tableCol editEventTimeCol">{timelineEvent.timeOfEvent}</td>
                                          <td className="tableCol editDescriptCol">Description</td>
                                          <td className="tableCol editDeleteCol">
                                                <button className="trashCanBtn" onClick={() => {deleteEvent(id, timelineEvent._id)}}>
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
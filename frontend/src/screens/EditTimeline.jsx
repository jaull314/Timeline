import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function EditTimeline(){
    const {id} = useParams();
    const [timelineEvents, setTimelineEvents] = useState([]);
    const titleInputRef = useRef(null);
    const timeInputRef = useRef(null);
    const descriptInputRef = useRef(null);
    const addBtnRef = useRef(null);

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

    const onChangeInputHandler = () => {
      if(titleInputRef.current.value.length > 0 && timeInputRef.current.value.length > 0 && descriptInputRef.current.value.length > 0){
            addBtnRef.current.disabled = false;
      }else{
            addBtnRef.current.disabled = true;
      }
    }

    const addAndRenderNewEvent = async () => {
      addBtnRef.current.disabled = true;
      let data = {title: titleInputRef.current.value, 
            timeOfEvent: parseInt(timeInputRef.current.value), 
            description: descriptInputRef.current.value}
      await fetch(`http://localhost:5000/addTimelineEvent/${id}`,
            {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json', // This is crucial
                    },
                  body: JSON.stringify(data)
            }
      )
      titleInputRef.current.value = "";
      timeInputRef.current.value = "";
      descriptInputRef.current.value = "";
      fetchAndRenderTimelineEvents();
    }

    useEffect(() => {
      addBtnRef.current.disabled = true;
      fetchAndRenderTimelineEvents();
    }, [])

    return (
        <>
            <h1 className="header">Edit Timeline</h1>
            <div className="inputDiv">
                  <Link to="/TimelineSelectMenu" className="backLink">&lt;- Menu</Link>
                  <label>Title Of Event</label>
                  <input className="input" type="text" ref={titleInputRef} onChange={onChangeInputHandler}></input>
                  <label>Time Of Event</label>
                  <input className="input" type="number" ref={timeInputRef} onChange={onChangeInputHandler}></input>
                  <label>Event Description</label>
                  <input className="input" type="text" ref={descriptInputRef} onChange={onChangeInputHandler}></input>
                  <button className="addBtn" onClick={addAndRenderNewEvent} ref={addBtnRef}>Add</button>
            </div>
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
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function EditTimeline(){
    const {id} = useParams();
    const [timelineEvents, setTimelineEvents] = useState([]);
    const strInputRef = useRef(null);
    const numInputRef = useRef(null);
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

    const onChangeHandler = () => {
      if(strInputRef.current.value.length > 0 && numInputRef.current.value.length > 0){
            addBtnRef.current.disabled = false;
      }else{
            addBtnRef.current.disabled = true;
      }
    }

    const addAndRenderNewEvent = async () => {
      let data = {title: strInputRef.current.value, timeOfEvent: parseInt(numInputRef.current.value)}
      await fetch(`http://localhost:5000/addTimelineEvent/${id}`,
            {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json', // This is crucial
                    },
                  body: JSON.stringify(data)
            }
      )
      strInputRef.current.value = "";
      numInputRef.current.value = "";
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
                  <label>Title Of Event</label>
                  <input className="input" type="text" ref={strInputRef} onChange={onChangeHandler}></input>
                  <label>Time Of Event</label>
                  <input className="input" type="number" ref={numInputRef} onChange={onChangeHandler}></input>
                  <button className="addBtn" onClick={addAndRenderNewEvent} ref={addBtnRef}>Add</button>
            </div>
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
                        {timelineEvents.map((timelineEvent, index) => (
                                    <tr key={timelineEvent._id} className={(index % 2 === 0) ? "evenRow" : "oddRow"}>
                                          <td className="tableCol">Color</td>
                                          <td className="tableCol">{timelineEvent.title}</td>
                                          <td className="tableCol">{timelineEvent.timeOfEvent}</td>
                                          <td className="tableCol">Description</td>
                                          <td className="tableCol">First Event</td>
                                          <td className="tableCol">Last Event</td>
                                          <td className="tableCol trashCanCol">
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

       
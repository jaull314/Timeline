import { useState, useEffect, useRef } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function TimelineSelectMenu(){
      const navigate = useNavigate();
      const [timelines, setTimelines] = useState([]);
      const colorInputRef = useRef(null);
      const nameInputRef = useRef(null);
      const addBtnRef = useRef(null);
      const viewTimelineBtn = useRef(null);
      const viewBothTimelinesBtn = useRef(null);

      const fetchAndRenderAllTimelines = async () => {
            try {
                  const response = await fetch('http://localhost:5000/getAllTimelines');
                  if (!response.ok) {
                        throw new Error('Network response was not ok');
                  }
                  const timelines = await response.json();
                  setTimelines(timelines);
            } catch (error) {
                  console.error('Error fetching timelines:', error);
            }
          
      }

      const deleteTimeline = async (id) => {
            await fetch(`http://localhost:5000/deleteTimeline/${id}`, { method: 'DELETE' })
            fetchAndRenderAllTimelines();
      }

      const onChangeInputHandler = () => {
            if(colorInputRef.current.value.length > 0 && nameInputRef.current.value.length > 0){
                  addBtnRef.current.disabled = false;
            }else{
                  addBtnRef.current.disabled = true;
            }
      }

      const addAndRenderNewTimeline= async () => {
            addBtnRef.current.disabled = true;
            let data = {color: colorInputRef.current.value, name: nameInputRef.current.value}
            await fetch(`http://localhost:5000/addTimeline`,
                  {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json', // This is crucial
                          },
                        body: JSON.stringify(data)
                  }
            )
            colorInputRef.current.value = "";
            nameInputRef.current.value = "";
            fetchAndRenderAllTimelines();
      }

      const onChangeSelectHandler = () => {
            const numChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;
            if(numChecked === 1){
                  viewTimelineBtn.current.disabled = false;
                  viewBothTimelinesBtn.current.disabled = true;
            }else if(numChecked === 2){
                  viewTimelineBtn.current.disabled = true;
                  viewBothTimelinesBtn.current.disabled = false;
            }else{
                  viewTimelineBtn.current.disabled = true;
                  viewBothTimelinesBtn.current.disabled = true;
            }
      }

      const viewTimeline = () => {
            const checkedBoxArr = document.querySelectorAll('input[type="checkbox"]:checked');
            const numOfEvents = parseInt(checkedBoxArr[0].getAttribute('numofevents'))
            if(numOfEvents > 0){
                  const id = checkedBoxArr[0].value;
                  navigate(`/SingleTimelineScreen/${id}`)
            }else{
                  alert("You need to add at least one event to the timeline!")
            }
      }

      const viewBothTimelines = () => {
            const checkedBoxArr = document.querySelectorAll('input[type="checkbox"]:checked');
            const numOfEventsForTimelineA = parseInt(checkedBoxArr[0].getAttribute('numofevents'))
            const numOfEventsForTimelineB = parseInt(checkedBoxArr[1].getAttribute('numofevents'))
            if(numOfEventsForTimelineA > 0 && numOfEventsForTimelineB){
                  const id = checkedBoxArr[0].value;
                  navigate(`/TwoTimelinesScreen/${id}`)
            }else{
                  alert("Each Timeline needs to have at least one event!")
            }
      }

      useEffect(() => {
            addBtnRef.current.disabled = true;
            viewTimelineBtn.current.disabled = true;
            viewBothTimelinesBtn.current.disabled = true;
            fetchAndRenderAllTimelines();
      }, [])

      return(
            <>
            <h1 className="header">Timeline Select Menu</h1>
            <div className="inputDiv">
                  <label>Timeline Color</label>
                  <input className="input" type="text" ref={colorInputRef} onChange={onChangeInputHandler}></input>
                  <label>Timeline Name</label>
                  <input className="input" type="text" ref={nameInputRef} onChange={onChangeInputHandler}></input>
                  <button className="addBtn" onClick={addAndRenderNewTimeline} ref={addBtnRef}>Add</button>
            </div>
            <table className="selectMenuTable">
                  <thead>
                        <tr>
                              <th className="tableCol checkCol">View</th>
                              <th className="tableCol colorCol">Color</th>
                              <th className="tableCol nameCol">Name</th>
                              <th className="tableCol numEventsCol">Num Events</th>
                              <th className="tableCol firstEventCol">First Event</th>
                              <th className="tableCol lastEventCol">Last Event</th>
                              <th className="tableCol editCol">Edit</th>
                              <th className="tableCol deleteCol">Delete</th>
                        </tr>
                  </thead>
                  <tbody>
                        {timelines.map((timeline, index) => (
                              <tr key={timeline._id} className={(index % 2 === 0) ? "evenRow" : "oddRow"}>
                                    <td className="tableCol checkCol"><input type="checkbox" 
                                                                  value={timeline._id} 
                                                                  name={timeline._id}
                                                                  numofevents={timeline.timelineEvents.length}
                                                                  onChange={onChangeSelectHandler}/></td>
                                    <td className="tableCol colorCol">{timeline.timelineColor}</td>
                                    <td className="tableCol nameCol">{timeline.timelineName}</td>
                                    <td className="tableCol numEventsCol">{timeline.timelineEvents.length}</td>
                                    <td className="tableCol firstEventCol">First Event</td>
                                    <td className="tableCol lastEventCol">Last Event</td>
                                    <td className="tableCol editCol"><Link to={"/EditTimeline/" + timeline._id} className="editLink">
                                                                        Edit 
                                                                  </Link>
                                    </td>
                                    <td className="tableCol deleteCol">
                                          <button className="trashCanBtn" onClick={() => {deleteTimeline(timeline._id)}}>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                          </button>
                                    </td>
                              </tr>
                        ))}
                  </tbody>
            </table>
            <div className="viewBtnDiv">
                  <button className="viewBtn" ref={viewTimelineBtn} onClick={viewTimeline}>View Timeline</button>
                  <button className="viewBtn" ref={viewBothTimelinesBtn} onClick={viewBothTimelines}>View Both Timelines</button>
            </div>
            </>
      )
}
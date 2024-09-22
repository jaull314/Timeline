import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function TimelineSelectMenu(){
      const [timelines, setTimelines] = useState([]);
      const colorInputRef = useRef(null);
      const nameInputRef = useRef(null);
      const addBtnRef = useRef(null);

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

      const onChangeHandler = () => {
            if(colorInputRef.current.value.length > 0 && nameInputRef.current.value.length > 0){
                  addBtnRef.current.disabled = false;
            }else{
                  addBtnRef.current.disabled = true;
            }
      }

      const addAndRenderNewTimeline= async () => {
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

      useEffect(() => {
            addBtnRef.current.disabled = true;
            fetchAndRenderAllTimelines();
      }, [])

      return(
            <>
            <h1 className="header">Timeline Select Menu</h1>
            <div className="inputDiv">
                  <label>Timeline Color</label>
                  <input className="input" type="text" ref={colorInputRef} onChange={onChangeHandler}></input>
                  <label>Timeline Name</label>
                  <input className="input" type="number" ref={nameInputRef} onChange={onChangeHandler}></input>
                  <button className="addBtn" onClick={addAndRenderNewTimeline} ref={addBtnRef}>Add</button>
            </div>
            <table>
                  <thead>
                        <tr>
                              <th className="tableCol">ID</th>
                              <th className="tableCol">Color</th>
                              <th className="tableCol">Name</th>
                              <th className="tableCol">Edit</th>
                        </tr>
                  </thead>
                  <tbody>
                        {timelines.map((timeline, index) => (
                              <tr key={timeline._id} className={(index % 2 === 0) ? "evenRow" : "oddRow"}>
                                    <td className="tableCol">{timeline._id}</td>
                                    <td className="tableCol">{timeline.timelineColor}</td>
                                    <td className="tableCol">{timeline.timelineName}</td>
                                    <td className="tableCol"><Link to={"/EditTimeline/" + timeline._id}>Edit </Link></td>
                              </tr>
                        ))}
                  </tbody>
            </table>
            </>
      )
}
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function EditTimelineInput({id, parentComponentCallback}){
    const titleInputRef = useRef(null);
    const timeInputRef = useRef(null);
    const descriptInputRef = useRef(null);
    const addBtnRef = useRef(null);

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
        parentComponentCallback();
      }

      useEffect(() => {
        addBtnRef.current.disabled = true;
      }, [])

    return (
        <>
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
    </>
    )
}
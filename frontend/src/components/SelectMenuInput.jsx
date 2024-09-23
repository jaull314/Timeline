import { useEffect, useRef } from "react";


export default function SelectMenuInput({parentComponentCallback}){
        const colorInputRef = useRef(null);
        const nameInputRef = useRef(null);
        const addBtnRef = useRef(null);

        const onChangeInputHandler = () => {
            if(nameInputRef.current.value.length > 0){
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
            parentComponentCallback();
      }

      useEffect(() => {
        addBtnRef.current.disabled = true;
      }, [])

    return (
        <>
            <div className="inputDiv">
            <label>Timeline Color</label>
            <select name="color" className="input" ref={colorInputRef} onChange={onChangeInputHandler}>
                <option value="#dfb2f4">Pastel Purple</option>
                <option value="#ffc8dd">Pastel Pink</option>
                <option value="#1b85b8">Pastel Blue</option>
                <option value="#61f4de">Pastel Turquoise</option>
                <option value="#559e83">Pastel Dark Green</option>
                <option value="#77DD77">Pastel Light Green</option>
                <option value="#f5e960">Pastel Yellow</option>
                <option value="#f6ac69">Pastel Orange</option>
                <option value="#ff686b">Pastel Red</option>
                <option value="#dab894">Pastel Brown</option>
            </select>
            <label>Timeline Name</label>
            <input className="input" type="text" ref={nameInputRef} onChange={onChangeInputHandler}></input>
            <button className="addBtn" onClick={addAndRenderNewTimeline} ref={addBtnRef}>Add</button>
        </div>
    </>
    )
}
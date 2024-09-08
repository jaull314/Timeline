import React from 'react'

export default function ScrollableCards({color, visibleEvents}){
    console.log(color)
    return (
        <div className="slots">
            {
                visibleEvents.map((visibleEvent, index) => (
                    <div key= {index} className="card" style={{backgroundColor: "red"}}>
                        <h3>{visibleEvent.title}</h3>
                        <p>blah blah blah blah blah blah blah blah
                            blah blah blah blahblah blah blah blah
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

import React from 'react'

export default function ScrollableCards({color, visibleEvents}){
    return (
        <div className="slots">
            {
                visibleEvents.map((visibleEvent, index) => (
                    <div key= {index} className="card" style={{backgroundColor: color}}>
                        <h3>{visibleEvent.title}</h3>
                        <p>{visibleEvent.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

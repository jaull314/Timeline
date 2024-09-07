import React from 'react'
import {useRef, useEffect} from 'react';

export default function TimelineCanvas({timelineObj}){
    
    const canvasRef = useRef(null);
    
    useEffect(() => {
        let ctx = canvasRef.current.getContext('2d');
        timelineObj.drawTimeline(ctx)
    })

    return (
        <canvas 
            ref={canvasRef}
            width={window.innerWidth * .8}
            height={window.innerHeight * .4}
        />
    )
}

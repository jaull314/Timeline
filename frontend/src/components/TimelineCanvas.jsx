import React from 'react'
import {useRef, useEffect} from 'react';

export default function TimelineCanvas({color, timeline}){
    
    const canvasRef = useRef(null);
    
    useEffect(() => {
        let ctx = canvasRef.current.getContext('2d');
        ctx.font = "575 12px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        timeline.drawTimeline(ctx)
    })

    return (
        <canvas 
            ref={canvasRef}
            className="canvas"
            width={window.innerWidth * .8}
            height={window.innerHeight * .4}
        />
    )
}

import React from 'react'
import { Link, useParams } from "react-router-dom";

export function Home(){
  return (
    <>
    <div id="homeDiv">
        <h1 className="homeHeader">Timeline</h1>
        <p>
          Welcome to Timeline! Go to Timeline Select Menu to start creating and viewing your timelines.
        </p>
        <div id="homeLinksDiv">
          <Link to="/TimelineSelectMenu" className="homeLinks">Timeline Select Menu</Link>
        </div>
      </div>
    </>
  )
}

export default Home
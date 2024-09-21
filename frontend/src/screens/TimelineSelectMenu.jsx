import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TimelineSelectMenu(){
      const [timelines, setTimelines] = useState([]);

      useEffect(() => {
        const fetchAllTimelines = async () => {
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
        fetchAllTimelines();
      }, [])

      if(timelines.length){
            const ex = timelines[0];
            console.log(ex._id)
      }


      return(
            <>
            <h1>Timeline Select Menu</h1>
            <table>
                  <thead>
                        <tr>
                              <th>ID</th>
                              <th>Color</th>
                              <th>Name</th>
                              <th>Edit</th>
                        </tr>
                  </thead>
                  <tbody>
                        {timelines.map((timeline) => (
                              <tr key={timeline._id}>
                                    <td>{timeline._id}</td>
                                    <td>{timeline.timelineColor}</td>
                                    <td>{timeline.timelineName}</td>
                                    <td><Link to={"/EditTimeline/" + timeline._id}>Edit </Link></td>
                              </tr>
                        ))}
                  </tbody>
            </table>
            </>
      )
}
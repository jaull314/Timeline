import SingleTimeline from "./components/SingleTimeline.jsx"

function App() {
  const arrTimeline = [  new TimelineEvent("Declaration Of Independence", 1776),
    new TimelineEvent("Treaty of Paris", 1783), 
    new TimelineEvent("Start of Civil War", 1861), 
    new TimelineEvent("End of Civil War", 1865)];

  return <SingleTimeline timelineEventArr={arrTimeline}/>;
}
export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import TimelineSelectMenu from "./screens/TimelineSelectMenu";
import Home from "./screens/Home";
import SingleTimelineScreen from './screens/SingleTimelineScreen';
import EditTimeline from './screens/EditTimeline';
import TwoTimelinesScreen from './screens/TwoTimelinesScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home/>} />
      <Route path="/TimelineSelectMenu" element={<TimelineSelectMenu/>} />
      <Route path="/EditTimeline/:id" element={<EditTimeline/>}/>
      <Route path="/SingleTimelineScreen/:id" element={<SingleTimelineScreen/>}/>
      <Route path="/TwoTimelinesScreen/:firstId/:secondId" element={<TwoTimelinesScreen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
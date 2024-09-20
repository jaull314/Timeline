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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home/>} />
      <Route path="/TimelineSelectMenu" element={<TimelineSelectMenu/>} />
      <Route path="/SingleTimelineScreen" element={<SingleTimelineScreen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
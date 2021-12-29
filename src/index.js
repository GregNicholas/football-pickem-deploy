import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import { ScheduleContextProvider } from "./contexts/ScheduleContext";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <ScheduleContextProvider> */}
      <App />
    {/* </ScheduleContextProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
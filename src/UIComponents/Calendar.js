import React from 'react';
import { render } from 'react-dom';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
 
let today = new Date();

render(
  <InfiniteCalendar
    selected={today}
    disabledDays={[0,6]}
  />,
  document.getElementById('root')
);
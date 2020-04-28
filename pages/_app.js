import 'semantic-ui-css/semantic.css'
import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';

const TimerApp = () => {
  const [time, setTime] = useState('0');

  const startTimer = () => {
    setInterval(function () {
      setTime(time - 1);
    }, 1000);
  }

  return (
    <>
      <Input
        action={{
          color: 'blue',
          content: 'Start',
          onClick: () => setInterval(() => {
            setTime(time - 1);
          }, 1000)
        }}
        placeholder='Enter Time'
        onChange={(e)=> setTime(e.target.value)}
        value={time}
      />
    </>
  )
}
export default TimerApp;
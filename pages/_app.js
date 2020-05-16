import 'semantic-ui-css/semantic.css'
import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';

const TimerApp = () => {
  const [countdownTime, setCountdownTime] = useState('');
  const [initCountdownTime, setInitCountdownTime] = useState('');
  const [countdownInterval, setCountdownInterval] = useState();
  const [timerRunning, setTimerRunning] = useState(false);

  const convertTimeToSeconds = time => {
    let minutes = parseInt(time.slice(0, 2)) * 60;
    let seconds = parseInt(time.slice(2));

    return minutes + seconds;
  };

  const startTimer = () => {
    setTimerRunning(true);
    setInitCountdownTime(countdownTime);

    const start = Date.now();
    const countdownTimeSeconds = convertTimeToSeconds(countdownTime);

    let diff, minutes, seconds;

    setCountdownInterval(setInterval(() => {
      diff = countdownTimeSeconds - (((Date.now() - start) / 1000) | 0);

      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setCountdownTime(`${minutes}${seconds}`);

      if (diff <= 0) {
        setTimerRunning(false);
        clearInterval(countdownInterval);
      }
    }));
  }

  const timeFormatter = time => {
    while (time.length < 4) {
      time = '0' + time;
    };
    let minutes = time.slice(0,2);
    let seconds = time.slice(2);

    return `${minutes}:${seconds}`
  };

  const resetTimer = () => {
    setCountdownTime(initCountdownTime);
    setTimerRunning(false);
    clearInterval(countdownInterval);
  }

  return (
    <div style={{ textAlign: 'center'}}>
      <Input
        onChange={(e) => setCountdownTime(e.target.value.replace(/:+/gm, '').slice(-4))}
        value={timeFormatter(countdownTime)}
        size='massive'
      />
      <Button
        primary
        content='Start'
        onClick={() => startTimer()}
        disabled={timerRunning}  
        size='massive'      
      />
      <Button
        secondary
        content='Reset'
        onClick={() => resetTimer()}
        disabled={!timerRunning}
        size='massive'
      />
    </div>
  )
}
export default TimerApp;
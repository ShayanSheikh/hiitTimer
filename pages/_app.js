import 'semantic-ui-css/semantic.css'
import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';

const TimerApp = () => {
  const [countdownTime, setCountdownTime] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);

  const convertTimeToSeconds = time => {
    let minutes = parseInt(time.slice(0, 2)) * 60;
    let seconds = parseInt(time.slice(2));

    return minutes + seconds;
  };

  const startTimer = () => {
    setTimerRunning(true);
    const start = Date.now()
    let diff, minutes, seconds;

    let countdownTimeSeconds = convertTimeToSeconds(countdownTime);

    const countdownInterval = setInterval(() => {
      diff = countdownTimeSeconds - (((Date.now() - start) / 1000) | 0);

      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setCountdownTime(`${minutes}:${seconds}`);

      if (diff <= 0) {
        setTimerRunning(false);
        clearInterval(countdownInterval);
      }
    });
  }

  const timeFormatter = time => {
    console.log(time)
    while (time.length < 4) {
      time = '0' + time;
    };
    let minutes = time.slice(0,2);
    let seconds = time.slice(2);

    return `${minutes}:${seconds}`
  };

  return (
    <>
      <Input
        action={{
          color: 'blue',
          content: 'Start',
          onClick: () => startTimer()
        }}
        placeholder='00:00'
        onChange={(e) => setCountdownTime(e.target.value.replace(/:+/gm, '').slice(-4))}
        value={timerRunning ? countdownTime : timeFormatter(countdownTime)}
      />
    </>
  )
}
export default TimerApp;
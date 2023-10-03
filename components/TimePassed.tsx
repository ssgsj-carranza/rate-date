import { useState, useEffect } from 'react';


type TimePassedProps = {
    startDate: string;
    title: string;
  };
  
function TimePassed({ startDate, title }: TimePassedProps) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - new Date(startDate).getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition-all ease-in-out duration-300">
      <h2 className="text-2xl mb-4">{title}</h2>
      <p>{time.days} days, {time.hours} hours, {time.minutes} minutes, {time.seconds} seconds</p>
    </div>
  );
}

export default TimePassed;

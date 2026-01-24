

export default function Stopwatch( { secondsElapsed }) {
 

   // 紐約最低工資：$16.50 / hr
  const hourlyRate = 30;
  const perSecondRate = hourlyRate / 3600;
  const earned = (secondsElapsed * perSecondRate).toFixed(4);

  const days = Math.floor(secondsElapsed / (3600*24));
  const hours = Math.floor((secondsElapsed % (3600*24)) / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  return (
    <>
      <div className="flex gap-5 pb-4 pt-10 ">
        <div  className="text-accent">
          <span className="countdown  text-4xl text-accent">
            <span style={{"--value":days}}  >{days}</span>
          </span>
          days
        </div>
        <div className="text-accent">
          <span className="countdown   text-4xl text-accent">
            <span style={{"--value":hours}}  >{hours}</span>
          </span>
          hours
        </div>
        <div className="text-accent">
          <span className="countdown  text-4xl text-accent">
            <span style={{"--value":minutes}} >{minutes}</span>
          </span>
          min
        </div>
        <div className="text-accent">
          <span className="countdown   text-4xl text-accent">
            <span style={{"--value":seconds}}  >{seconds}</span>
          </span>
          sec
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 md:justify-start ">
        <div className="title font-secondary text-accent">
          Equivalent
        </div>
        <div className="amount font-secondary text-accent">
          ${earned}
        </div>
        <div className="note font-secondary text-accent">
          at min wage
        </div>
      </div>
    </>
  );
}


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
      <div className="flex gap-5 pb-8 pt-10 ">
        <div>
          <span className="countdown  text-4xl text-primary">
            <span style={{"--value":days}}  className="text-primary ">{days}</span>
          </span>
          days
        </div>
        <div>
          <span className="countdown   text-4xl text-primary">
            <span style={{"--value":hours}}  className="text-primary  " >{hours}</span>
          </span>
          hours
        </div>
        <div>
          <span className="countdown  text-4xl text-primary">
            <span style={{"--value":minutes}} className="text-primary  " >{minutes}</span>
          </span>
          min
        </div>
        <div>
          <span className="countdown   text-4xl text-primary">
            <span style={{"--value":seconds}} className="" >{seconds}</span>
          </span>
          sec
        </div>
      </div>
      <div className="value-card">
        <div className="title font-secondary">
          Equivalent
        </div>
        <div className="amount font-secondary">
          ${earned}
        </div>
        <div className="note font-secondary">
          at min wage
        </div>
      </div>
    </>
  );
}
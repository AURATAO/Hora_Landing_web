export default function Stopwatch({ secondsElapsed }) {
  // New York local hour (so everyone sees NYC timing)
  const nyHour = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  ).getHours();

  const perMinuteNow = nyHour >= 0 && nyHour < 8 ? 1 : 0.5;
  const perSecond = perMinuteNow / 60;

  const earned = (secondsElapsed * perSecond).toFixed(2);

  const days = Math.floor(secondsElapsed / (3600 * 24));
  const hours = Math.floor((secondsElapsed % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  return (
    <>
      <div className="flex gap-5 pb-4 pt-10">
        <div className="text-accent">
          <span className="countdown text-4xl text-accent">
            <span style={{ "--value": days }}>{days}</span>
          </span>
          days
        </div>
        <div className="text-accent">
          <span className="countdown text-4xl text-accent">
            <span style={{ "--value": hours }}>{hours}</span>
          </span>
          hours
        </div>
        <div className="text-accent">
          <span className="countdown text-4xl text-accent">
            <span style={{ "--value": minutes }}>{minutes}</span>
          </span>
          min
        </div>
        <div className="text-accent">
          <span className="countdown text-4xl text-accent">
            <span style={{ "--value": seconds }}>{seconds}</span>
          </span>
          sec
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 md:justify-start">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
          <span className="text-accent">⏱️</span>
          <span className="font-secondary text-accent text-sm">
            Right now: <span className="font-semibold">${perMinuteNow}</span>
            <span className="opacity-70"> / min</span>
          </span>
        </div>

        <div className="font-secondary text-accent text-sm">
          Your time is worth <span className="font-semibold text-accent">${earned}</span>right now.
        </div>
      </div>
    </>
  );
}

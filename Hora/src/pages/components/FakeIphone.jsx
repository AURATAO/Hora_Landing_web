import { useEffect, useState } from "react";

export default function FakeIphone() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY / 3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iphoneHeight = 600; // iPhone 框高度
  const appHeight = 1400;   // App 畫面高度
  const maxOffset = appHeight - iphoneHeight;

  // 限制 offset 範圍，避免超出
  const safeOffset = Math.min(Math.max(offset, 0), maxOffset);

  return (
  <div className="h-[353px] w-[280px] round-t-[32px] flex justify-center items-start overflow-hidden ">
    <div
    className="relative w-[400px] h-auto overflow-hidden rounded-[32px] drop-shadow-2xl "
    style={{ position: "relative", overflow: "hidden", height: 600 }}
  >
    <div
      className="absolute left-0 w-full "
      style={{
        height: 1400,
        transform: `translateY(-${safeOffset}px)`,
        transition: "transform 0.3s",
      }}
    >
      <img
        src="/img/horaapp.svg"
        alt="App"
        className="w-full h-full pt-4 object-contain "
        style={{ height: 1500}}
      />
    </div>

    <img
      src="/img/fakeiphone.svg"
      alt="Phone frame"
      className="absolute top-[-15px] inset-0 w-full h-full object-cover pointer-events-none z-10 "
    />
    </div>
  </div>
  );
}
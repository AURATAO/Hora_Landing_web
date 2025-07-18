import '@splinetool/viewer';

export default function Iphone_01() {
  return (
    <div className="w-full max-w-2xl mx-auto h-[500px]">
      <spline-viewer 
        url="https://prod.spline.design/JSUldFJXC0D5z1rV/scene.splinecode"
        style={{ width: "100%", height: "160%" }}
      ></spline-viewer>
    </div>
  );
}

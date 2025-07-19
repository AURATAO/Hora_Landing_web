import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./pages/components/ ScrollToTop";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact"
import FQA from "./pages/FQA";
import { useEffect, useState } from "react";



function App() {
const [secondsElapsed, setSecondsElapsed] = useState(0);

 useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <BrowserRouter>
       <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home secondsElapsed={secondsElapsed}  />} />
          <Route path="/mission" element={<Mission secondsElapsed={secondsElapsed}/>} />
          <Route path="/terms" element={<Terms />}/>
          <Route path='/privacy' element={<Privacy/>}/>
          <Route path="/Contact" element={<Contact secondsElapsed={secondsElapsed} />}/>
          <Route path="/FQA" element={<FQA secondsElapsed={secondsElapsed}/>} />
          {/* Example: <Route path="/about" element={<About />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


import Footer from "./components/Footer"
import Header from "./components/Header"
import DemoModal from './components/DemoModal.jsx';
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';



export default function Contact( {secondsElapsed}  ){
    const [showModal, setShowModal] = useState(false);

   const hours = Math.floor(secondsElapsed / 3600);
   const minutes = Math.floor((secondsElapsed % 3600) / 60);
   const seconds = secondsElapsed % 60;
   const earned = (secondsElapsed * (16.50/3600)).toFixed(4);

    useEffect(() => {
       AOS.init({
         duration: 1200,
       });
    }, []);

    return(
        <>
        <Header handleColor={'bg-primary/20'} onDemoClick={() => setShowModal(true)}/>
            <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-br from-primary to-accent">
             <DemoModal show={showModal} onClose={() => setShowModal(false)} />
             <div className="pb-2 flex items-baseline space-x-2 font-secondary text-sm text-primary " data-aos="zoom-out-left">
                <span>{hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</span>
                <span className="text-sm text-primary/40">${earned} <span className="text-[10px]">at min wage</span></span>
            </div>
            <div className="max-w-md w-full space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                Get in touch
                </h1>
                <p className="text-center text-accent font-secondary text-sm">
                Whether you’re interested in partnership, press, or just want to say hi — we’d love to connect.
                </p>

                <form className="space-y-4">
                <div>
                    <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                    />
                </div>
                <div>
                    <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                    />
                </div>
                <div>
                    <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 button-tech font-secondary"
                >
                    Send Message
                </button>
                </form>

                <div className="text-center text-primary/50 text-sm mt-6">
                Or email us directly at <a href="mailto:info@my-hora.com" className="text-secondary hover:underline">info@my-hora.com</a>
                </div>
             </div>
            </div>
        <Footer/>

        </>
    )
}
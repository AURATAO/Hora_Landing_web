import { Helmet } from "react-helmet-async";
import Footer from "./components/Footer"
import Header from "./components/Header"
import DemoModal from './components/DemoModal.jsx';
import { useEffect, useState } from "react";
import { useTimer } from "../context/TimerContext.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Loader2 } from 'lucide-react';
import { postJSON } from "../lib/fetcher";


export default function Contact() {
  const secondsElapsed = useTimer();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors]= useState('');
  const [loading, setLoading] = useState(false);

   const hours = Math.floor(secondsElapsed / 3600);
   const minutes = Math.floor((secondsElapsed % 3600) / 60);
   const seconds = secondsElapsed % 60;
   const earned = (secondsElapsed * (16.50/3600)).toFixed(4);


const handleSubmit = async (e) => {
    e.preventDefault();

    // 先驗證，不通過就不要進 loading
    if (!name || !email || !message) {
        setErrors('Please complete all fields and agree to the terms.');
        return;
    }

    setErrors('');
    setLoading(true);

    const payload = {
        full_name: name,
        email: email,
        message: message,
    };

    try {
        await postJSON("/submit-contact", payload);

        alert("Thank you! We’ve received your message and will get back to you shortly.");

        // 清表單
        setName('');
        setEmail('');
        setMessage('');
    } catch (err) {
        console.error("contact error:", err);

        // 若有做 ServiceBanner，可通知
        if (err?.status >= 500 || err?.status === 408) {
        window.__reportServiceFail?.();
        alert("Service is unstable. Please try again in a moment.");
        } else {
        alert(err?.message || "Request failed.");
        }
    } finally {
        setLoading(false);
    }
    };

     useEffect(() => {
    
    }, []);

    useEffect(() => {
       AOS.init({
         duration: 1200,
       });
    }, []);



    return(
        <>
        <Helmet>
          <title>Contact Us | Hora</title>
          <meta name="description" content="Get in touch with the Hora team. Questions, partnership inquiries, or feedback — we'd love to hear from you." />
        </Helmet>
        <Header handleColor={'bg-primary/20'} onDemoClick={() => setShowModal(true)}/>
            <div className="min-h-screen flex flex-col justify-center items-center px-4 pt-28 pb-16 bg-linear-to-br from-primary to-accent">
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

                <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                    />
                </div>
                <div>
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                    />
                </div>
                <div>
                    <textarea
                    placeholder="Message"
                    rows="4"
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                    ></textarea>
                </div>
                {errors && (
                <div className="text-red-500 text-sm text-center">{errors}</div>
                )}
                <button
                    type="submit"
                    className="w-full py-3 button-tech font-secondary"
                >
                     {loading ? (
                        <>
                           <span className="flex justify-center items-center space-x-2">
                                <Loader2 className="animate-spin w-4 h-4" />
                                <span>Processing...</span>
                            </span>
                        </>
                    ) : (
                        "SEND MESSAGE"
                    )}
                </button>
                </form>

                <div className="text-center text-primary/50 text-sm mt-6">
                Or email us directly at <a href="mailto:liang.you@horaapp.co" className="text-secondary hover:underline">liang.you@horaapp.co</a>
                </div>
             </div>
            </div>
        <Footer/>

        </>
    )
}
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function Footer() {
      useEffect(() => {
        AOS.init({
          duration: 1200,
        });
      }, []);
    return (
        <>
         <footer className="w-full bg-primary py-8">
            <div className=' mx-auto px-8 flex-col items-start  md:items-center  lg:max-w-7xl'>
                <div className='w-full flex flex-col items-start justify-center md:flex-row md:items-start md:justify-center md:gap-8 lg:max-w-7xl '>
                <div className='hidden w-full h-75 mx-auto flex-col items-start justify-end  lg:flex '>
                <h2 className='text-5xl text-accent font-heading mb-auto' data-aos="fade-down"> <Link to="/" >
                              <div className='w-45'>
                              <img src="/img/hora_logo.png" alt="horalogo" className='w-full'/>
                              </div>
                              </Link></h2>
                <div className="flex flex-col justify-end">
                    <p className='text-accent text-md'>© 2025 Hora. All rights reserved.</p>
                </div>
                </div>
                <div className='pt-5 w-full md:w-1/3 '>
                    <ul className='flex flex-col items-start justify-start gap-4 '>
                    <li className='text-accent/30 text-lg' data-aos="fade-down">Index</li>
                    <li className='text-accent hover:text-secondary text-sm'><Link to="/mission">Mission</Link></li>
                    <li>
                        <ul className='flex items-center justify-center gap-2'>
                        <li className='text-accent hover:text-secondary text-sm'><Link to="/contact">Contact</Link></li>
                        </ul>
                    </li>
                    </ul>
                </div>
                <div className='pt-5 w-full md:w-1/3 '>
                    <ul className='flex flex-col items-start justify-start gap-4'>
                    <li className='text-accent/30 text-lg' data-aos="fade-down"> Resources</li>
                    <li className='text-accent hover:text-secondary text-sm'> <Link to="/FQA">FAQ</Link></li>
                    </ul>
                </div>
                <div className='pt-5 w-full md:w-1/3 '>
                    <ul className='flex flex-col items-start justify-start gap-4'>
                    <li className='text-accent/30 text-lg' data-aos="fade-down">Legal</li>
                    <li className='text-accent hover:text-secondary text-sm'><Link to="/terms">Terms</Link></li>
                    <li className='text-accent hover:text-secondary text-sm'><Link to="/privacy">Privacy</Link></li>                    </ul>
                </div>
                </div>
                <div className='pt-10 w-full text-center lg:hidden'>
                    <p className='text-accent text-md'>© 2025 Hora. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </>
    );
}
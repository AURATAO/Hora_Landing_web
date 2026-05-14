import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import DemoModal from './components/DemoModal.jsx';
import TestimonialsSlider from './components/TestimonialsSlider.jsx';
import NewsSection from './components/NewsSection.jsx';
import {
  Bike,
  ShoppingCart,
  WashingMachine,
  Users,
  Clock,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const services = [
  {
    icon: Bike,
    title: "Same-day Delivery",
    desc: "Multi-stop pickups and drop-offs, on your schedule",
    delay: "100",
  },
  {
    icon: ShoppingCart,
    title: "Grocery & Errands",
    desc: "We go to the store so you don't have to",
    delay: "150",
  },
  {
    icon: WashingMachine,
    title: "Laundry Service",
    desc: "Wash, dry, fold — picked up and returned",
    delay: "200",
  },
  {
  icon: Users,
  title: "Companionship",
  desc: "A friendly presence for a walk, a chat, or just some company — no medical care included",
  delay: "250",
  },
  {
    icon: Clock,
    title: "Queue & Wait",
    desc: "We hold your spot so you can be somewhere better",
    delay: "300",
  },
  {
    icon: Sparkles,
    title: "Anything Else",
    desc: "If we can do it, just ask",
    delay: "350",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hora — Turn Time into Value | Find Trusted Support Near You</title>
        <meta name="description" content="Tap. Match. Track. Hora connects you with verified supporters nearby for any task — pay only per minute. Now in NYC and Milan." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hora",
          "url": "https://my-hora.com",
          "logo": "https://my-hora.com/img/hora_logo.png",
          "description": "Time-based task matching platform connecting requesters with verified local supporters.",
          "sameAs": []
        })}</script>
      </Helmet>

      <Header onDemoClick={() => setShowDemoModal(true)} />

      <main id="main-content" className="flex flex-col items-center justify-center bg-accent pt-15">

        {/* ── SCENE 1 — Full-bleed hero image ── */}
        <div className="hero relative w-full h-svh overflow-hidden">
          <img
            src="/img/horaImage4.png"
            alt="Hora supporter delivering in NYC"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.2) translate(4%, -2%)', transformOrigin: 'center' }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-primary/40 via-primary/20 to-transparent" />
          <div className="relative h-full flex items-center justify-center z-10 pt-20 lg:pt-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-primary font-secondary">Free beta trial · NYC 🗽</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/70 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    <span className="text-sm font-medium text-white font-secondary"> Beta trial starts June 4</span>
                  </div>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
                  A real person,
                  <br />
                  <span className="gradient-animate inline-block">5 minutes away.</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-secondary mb-8 max-w-2xl">
                  Post any task — errands, deliveries, laundry runs. Get matched with someone verified and nearby, instantly.
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {["Same-day delivery", "Grocery runs", "Laundry drop-off"].map((label) => (
                    <div key={label} className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                      <span className="text-white/90 font-secondary text-sm">{label}</span>
                    </div>
                  ))}
                </div>

        
              </div>
            </div>
          </div>

          {/* Floating stat card */}
          <div className="hidden md:flex absolute bottom-20 right-8 lg:bottom-32 lg:right-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/20 animate-float z-10">
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <p className="text-xs text-primary/60 font-secondary">Avg Response</p>
                <p className="text-lg font-bold text-primary">5 min</p>
              </div>
            </div>
          </div>
        </div>

         
   
        {/* HORA IN ACTION - Image Grid */}
       <div className="w-full bg-white py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
                What we do
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                Every errand. Every task. Handled.
              </h2>
              <p className="text-xl text-primary/70 font-secondary max-w-3xl mx-auto">
                Real people near you — ready for whatever you need.
              </p>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, delay }) => (
              <div
                key={title}
                className="group bg-gray-50 hover:bg-secondary/5 border border-gray-100 hover:border-secondary/20 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={delay}
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-primary/60 font-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          </div>
        </div>


        {/* ── HOW IT WORKS ── */}
        <div className="w-full bg-primary py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-accent mb-4">How HO:RA Works</h2>
              <p className="text-lg text-accent/70 font-secondary max-w-2xl mx-auto">From request to done in minutes.</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
              <div className="w-full lg:w-1/2 space-y-12">
                {[
                  { n: "01", title: "Sign Up & Verify", desc: "Create your account and complete a quick sign-up. Get instant access to our trusted community." },
                  { n: "02", title: "Tap QuickRequest", desc: "Describe what you need in one tap. Whether it's groceries, errands, or companionship—we've got you covered." },
                  { n: "03", title: "Auto-Match Nearby", desc: "We connect you with a verified supporter nearby. Average match time: 2 minutes." },
                  { n: "04", title: "Track & Pay", desc: "Real-time tracking keeps you updated. Pay only for minutes used with automatic refunds for early completions." },
                ].map(({ n, title, desc }, i) => (
                  <div key={n}>
                    <div className="flex gap-6 group">
                      <div className="shrink-0 w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">{n}</div>
                      <div className="pt-1">
                        <h3 className="text-2xl font-bold text-accent mb-3">{title}</h3>
                        <p className="text-accent/70 font-secondary leading-relaxed">{desc}</p>
                      </div>
                    </div>
                    {i < 3 && <div className="ml-8 mt-12 h-12 w-0.5 bg-accent/20" />}
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                <div className="relative max-w-xs lg:max-w-sm">
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl" />
                  <img src="/img/greenphone2.png" alt="Hora App Process" className="relative w-full max-w-65 lg:max-w-150" />
                  {[
                    { icon: "✅", label: "Match found!", className: "top-6", delay: "animate-float" },
                    { icon: "🕒", label: "Checked in 3:14 PM", className: "top-20", delay: "animate-float-delayed" },
                    { icon: "💸", label: "Payment confirmed", className: "top-34", delay: "animate-float" },
                  ].map(({ icon, label, className, delay }) => (
                    <div key={label} className={`absolute ${className} left-2 lg:-left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-3 ${delay}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{icon}</span>
                        <div>
                          <span className="text-xs font-semibold text-gray-700 block">HO:RA</span>
                          <p className="text-xs text-gray-900 leading-tight">{label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Section logo  */}

        <div className="w-full bg-primary py-12 ">
              <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-primary/10 shadow-sm">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-secondary text-primary">ID Verified</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-primary/10 shadow-sm">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-secondary text-primary">Background Checked</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-primary/10 shadow-sm">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-secondary text-primary">Secure Payments</span>
                  </div>
                </div>
            
            <div className='max-w-7xl mx-auto px-4 md:px-8'>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-accent/20" />
              <div className="text-sm font-semibold tracking-[0.3em] uppercase text-accent/60">Trusted & powered by</div>
              <div className="flex-1 h-px bg-accent/20" />
            </div>
            </div>
          
          

          <div className='flex items-center justify-center gap-8'>
          <img src="/img/checkr.png" alt="checkr logo" className="h-10 md:h-10 w-auto" />
          <img src="/img/stripeLogo.png" alt="Stripe logo" className="h-14 pt-2 md:h-14 md:pt-2 w-auto" />
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <TestimonialsSlider />
        {/* ── NEWS & UPDATES ── */}
        <NewsSection />

        {/* ── WHO USES HORA ── */}
        <div className="w-full bg-linear-to-b from-white to-accent py-20 lg:py-32">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Who Uses HO:RA?</h2>
              <p className="text-lg text-primary/70 font-secondary">Join thousands already getting things done smarter</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-secondary to-secondary/50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">💚</div>
                    <h3 className="text-2xl font-bold text-primary">Supporter</h3>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {[["Who", "Students, freelancers, part-timers"], ["Why", "Turn spare time into income—help with groceries, yard work, or simply share an hour at the park."], ["How to start", "Sign up + verify identity"]].map(([label, text]) => (
                      <li key={label} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <div><span className="font-semibold text-secondary">{label}: </span><span className="text-primary/80 font-secondary">{text}</span></div>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-secondary/5 border-l-4 border-secondary rounded-r-xl p-4 mb-6">
                    <p className="text-sm italic text-primary/70 font-secondary">"Weekend free? I take a task or two—and turn time into extra income."</p>
                  </div>
                  <button className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" onClick={() => navigate('/beta')}>Earn on Your Schedule →</button>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              </div>
              <div className="group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-primary/50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">🤝</div>
                    <h3 className="text-2xl font-bold text-primary">Requester</h3>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {[["Who", "Busy professionals, families, teams"], ["Why", "Get groceries, handle chores, or simply need company—post it and reclaim your time."], ["How to start", "QuickRequest or Schedule a task"]].map(([label, text]) => (
                      <li key={label} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <div><span className="font-semibold text-primary">{label}: </span><span className="text-primary/80 font-secondary">{text}</span></div>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-4 mb-11">
                    <p className="text-sm italic text-primary/70 font-secondary">"One tap. Chores done. I've got my time back."</p>
                  </div>
                  <button className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" onClick={() => navigate('/beta')}>Get Help in Minutes →</button>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ── TEAM ── */}
        <div className="w-full bg-linear-to-br from-primary via-primary to-primary/90 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-16">
              <div className="flex-1 h-px bg-accent/20" />
              <div className="text-sm font-semibold tracking-[0.3em] uppercase text-accent/60">Behind HO:RA</div>
              <div className="flex-1 h-px bg-accent/20" />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-16 mb-12">
              {[
                { src: "/img/founder1.JPG", alt: "Liang you", role: "Co-founder, Product & Business", name: "Liang you", linkedin: "https://www.linkedin.com/in/liang-you-tao-658705106/", github: "https://github.com/AURATAO" },
                { src: "/img/founder2.jpg", alt: "Daniele", role: "Co-founder, Marketing & Growth", name: "Daniele", linkedin: "https://www.linkedin.com/in/daniele-rollo-9898061a5/" },
              ].map(({ src, alt, role, name, linkedin, github }) => (
                <div key={name} className="group flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl scale-110" />
                    <img src={src} alt={alt} className="relative w-40 h-40 rounded-full object-cover transition-all duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0 shadow-2xl border-4 border-white/10" />
                  </div>
                  <p className="text-sm text-accent/50 mb-2 font-secondary">{role}</p>
                  <h3 className="text-2xl font-bold text-accent mb-3">{name}</h3>
                  <div className="flex gap-4">
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent/60 hover:text-secondary text-sm transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      LinkedIn
                    </a>
                    {github && (
                      <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent/60 hover:text-secondary text-sm transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <div className="inline-block bg-accent/5 border border-accent/10 rounded-2xl px-8 py-6 backdrop-blur-sm">
                <p className="text-lg text-accent/90 font-secondary italic">"We are building HO:RA to redefine how the world values time."</p>
              </div>
            </div>
          </div>
        </div>

   

        {/* ── FINAL CTA ── */}
        <div className="w-full h-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/img/section_5_1.JPG)' }}>
            <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-accent/80 font-secondary mb-8 max-w-2xl">Join the HO:RA community and experience a new way to manage your time</p>
            <button
              className="px-10 py-5 bg-secondary text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-secondary/50 hover:-translate-y-1 transition-all duration-300"
              onClick={() => setShowDemoModal(true)}
            >
              Book Your Demo Today
            </button>
          </div>
        </div>

        <DemoModal show={showDemoModal} onClose={() => setShowDemoModal(false)} />
        <Footer />
      </main>
    </>
  );
}
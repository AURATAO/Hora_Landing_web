import React, { useState,useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer'
import ReactMarkdown from "react-markdown";
import DemoModal from './components/DemoModal';


const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function Terms() {
    const [showDemoModal, setShowDemoModal] = useState(false)
    

    const [content, setContent] = useState("");
    useEffect (()=>{
        fetch('/termText/terms.md')
        .then(res => res.text())
        .then(text => setContent(text));
    },[])



    return (
      <>
        <Header handleColor={'bg-primary/40'} onDemoClick={() => setShowDemoModal(true)} />
        <div className='bg-gradient-to-br from-primary to-primary/50 py-[150px] px-4'>
            <div className="max-w-7xl mx-auto">
            <DemoModal show={showDemoModal === true} onClose={() => setShowDemoModal(false)} />
             <div className='justify-start mx-8 flex flex-col pb-10 md:hidden'>
            <p className="text-sm text-accent/60 italic border-l-4 pl-4 border-accent/30 mb-6">
            ⚠️ This Terms of Use document is a preliminary version drafted in anticipation of the platform’s full release. As Hora is currently in MVP development, certain clauses may be revised to reflect future functionalities.
            </p>
            <h1 className='text-3xl font-semibold text-accent  '>Hora Global Terms of Service</h1>
            </div>
            <div className="flex flex-wrap gap-2 justify-start mx-8 pb-4 md:pb-10 md:mx-20 lg:mx-30">
                <a href="#1-platform" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Platform
                </a>
                <a href="#2-use-of-the-platform" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                     Use of the Platform
                </a>
                <a href="#3-fees-billing-invoicing-and-payment-cancellation" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                     Fees, Billing, Invoicing, and Payment; Cancellation
                </a>
                <a href="#4-contests-and-promotional-codes"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Contests and Promotional Codes
                </a>
                <a href="#5-public-areas"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Public Areas
                </a>
                <a href="#6-deactivation-and-suspension"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Deactivation and Suspension
                </a>
                <a href="#7-termination"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Termination
                </a>
                <a href="#8-user-generated-content-feedback"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    User Generated Content; Feedback
                </a>
                <a href="#9-intellectual-Property-right"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Intellectual Property Rights
                </a>
                <a href="#10-links-to-third-party-websites"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Links to Third-Party Websites
                </a>
                <a href="#11-copyright-complaints"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Copyright Complaints
                </a>
                <a href="#12-disclaimer-of-warranties"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Disclaimer of Warranties
                </a>
                <a href="#13-limitation-of-liability."  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                     Limitation of Liability
                </a>
                <a href="#14-indemnification"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Indemnification
                </a>
                <a href="#15-dispute-resolution"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Dispute Resolution
                </a>
                <a href="#16-App Store-Sourced Apps"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    App Store-Sourced Apps
                </a>
                <a href="#17-changes-to-the-agreement-the-platform-and-the-app"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Changes to the Agreement, the Platform and the App
                </a>
                <a href="#18-no-rights-of-third-parties"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    No Rights of Third Parties                
                </a>
                <a href="#19-notices-and-consent-to-receive-notices-electronically"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Notices and Consent to Receive Notices Electronically
                </a>
                <a href="#20-consent-to-electronic-signatures"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Consent to Electronic Signatures
                </a>
                <a href="#21-governing-law"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                     Governing Law
                </a>
                <a href="#22-notices"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Notices
                </a>
                <a href="#23-general-provisions"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    General Provisions
                </a>
                <a href="#24-jurisdiction-specific-provisions-including-dispute-resolution"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    Jurisdiction-specific Provisions, including Dispute Resolution
                </a>
                <a href="#25-acknowledgement-and-consent"  className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                    ACKNOWLEDGEMENT AND CONSENT
                </a>
            </div>
            <div className='hidden flex-col justify-start mx-8 md:flex md:mx-20 lg:mx-30'>
            <p className="text-sm text-accent/60 italic border-l-4 pl-4 border-accent/30 mb-6">
            ⚠️ This Terms of Use document is a preliminary version drafted in anticipation of the platform’s full release. As Hora is currently in MVP development, certain clauses may be revised to reflect future functionalities.
            </p>
            <h1 className='text-3xl font-semibold text-accent  '>Hora Global Terms of Service</h1>
            </div>
            <div className='flex flex-col justify-center items-start mx-8 md:mx-20 lg:mx-30 text-accent'>
                <ReactMarkdown
                components={{
                    h1: ({ children, ...props }) => {
                    const getText = (children) => {
                        return React.Children.toArray(children)
                        .map(child => (typeof child === 'string' ? child : ''))
                        .join('');
                    };

                    const id = slugify(getText(children));
                    return (
                        <h1 id={id} className="text-accent text-3xl md:text-3xl font-bold my-6 pt-[80px]" {...props}>
                        {children}
                        </h1>
                    );
                    },
                    h2: (props) => (
                    <h2 className=" text-accent text-lg md:text-2xl font-semibold my-4" {...props} />
                    ),
                    p: (props) => (
                    <p className="text-accent font-secondary text-base md:text-lg leading-relaxed my-2" {...props} />
                    ),
                    li: (props) => (
                    <li className="text-accent font-secondary list-disc ml-5 md:ml-8 text-base md:text-lg my-1" {...props} />
                    ),
                    strong: (props) => (
                    <strong className="text-accent font-secondary font-semibold" {...props} />
                    ),
                    em: (props) => (
                    <em className="text-accent font-secondary italic" {...props} />
                    ),
                }}
                >
                {content}
                </ReactMarkdown>
            </div>
            </div>
        </div>
        <Footer />
       </>
    )
}
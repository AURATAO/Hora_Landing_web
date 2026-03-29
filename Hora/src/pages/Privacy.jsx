import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";

const slugify = (text) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function Privacy() {
    const [content, setContent] = useState('');
    const [showDemoModal, setShowDemoModal] = useState(false);

    useEffect(() => {
        fetch('/termText/privacy.md')
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);
    return (
        <>
            <Header handleColor="bg-primary/40" onDemoClick={() => setShowDemoModal(true)} />
            <div className='bg-linear-to-br from-primary to-primary/50 py-37.5 px-4'>
                <div className="max-w-7xl mx-auto">
                    <DemoModal show={showDemoModal === true} onClose={() => setShowDemoModal(false)} />
                    <div className='justify-start mx-8 flex flex-col pb-10 md:hidden'>
                        <p className="text-sm text-accent/60 italic border-l-4 pl-4 border-accent/30 mb-6">
                            ⚠️ Hora is currently operating in a limited beta phase. Certain features, workflows, and policy sections may be updated as we continue testing and refining the platform.
                        </p>
                        <h1 className='text-3xl font-semibold text-accent'>Hora Privacy Policy</h1>
                        <h5 className="text-sm text-accent/60 italic border-accent/30 mt-4">
                            Last updated: March 29, 2026
                        </h5>                    </div>
                    <div className="flex flex-wrap gap-2 justify-start mx-8 pb-4 md:pb-10 md:mx-20 lg:mx-30">
                        <a href="#1-introduction" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Introduction
                        </a>
                        <a href="#11-beta-program-notice" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Beta Program Notice
                        </a>
                        <a href="#2-general-terms" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            General Terms
                        </a>
                        <a href="#3-information-collection" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Information Collection
                        </a>
                        <a href="#4-use-of-personal-information" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Use of Personal Information
                        </a>
                        <a href="#5-disclosure-of-personal-information" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Disclosure of Personal Information
                        </a>
                        <a href="#6-retention-of-personal-information" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Retention of Personal Information
                        </a>
                        <a href="#7-your-rights-and-choices" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Your Rights and Choices
                        </a>
                        <a href="#8-contacting-us" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Contacting Us
                        </a>
                        <a href="#9-jurisdiction-specific-provisions" className="px-4 py-2 text-sm rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all">
                            Jurisdiction-Specific Provisions
                        </a>
                    </div>
                    <div className='hidden flex-col justify-start mx-8 md:flex md:mx-20 lg:mx-30'>
                        <p className="text-sm text-accent/60 italic border-l-4 pl-4 border-accent/30 mb-6">
                            ⚠️ Hora is currently operating in a limited beta phase. Certain features, workflows, and policy sections may be updated as we continue testing and refining the platform.
                        </p>
                        <h1 className='text-3xl font-semibold text-accent  '>Hora Privacy Policy</h1>
                        <h5 className="text-sm text-accent/60 italic border-accent/30 mt-4">Last updated: March 29, 2026</h5>
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
                                        <h1 id={id} className="text-accent text-3xl md:text-3xl font-bold my-6 pt-20" {...props}>
                                            {children}
                                        </h1>
                                    );
                                },
                                h2: ({ children, ...props }) => {
                                    const getText = (children) => {
                                        return React.Children.toArray(children)
                                            .map((child) => (typeof child === 'string' ? child : ''))
                                            .join('');
                                    };

                                    const id = slugify(getText(children));
                                    return (
                                        <h2
                                            id={id}
                                            className="text-accent text-lg md:text-2xl font-semibold my-4 pt-20"
                                            {...props}
                                        >
                                            {children}
                                        </h2>
                                    );
                                },
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
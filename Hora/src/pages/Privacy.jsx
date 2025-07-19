import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Privacy(){
    const [content, setContent]=useState('');

    useEffect(()=>{
        fetch('/termText/privacy.md')
        .then(res => res.text())
        .then(text => setContent(text))
    })
    return (
        <>
        <Header handleColor="bg-primary/20" />
        <div className='bg-gradient-to-br from-primary to-primary/50 py-[150px] px-4'>
              <div className="max-w-7xl mx-auto ">
                  <div className='flex flex-col justify-center items-start pt-8 mx-8 md:mx-20 lg:mx-30 text-accent'>
                   <ReactMarkdown components={{
                          h1: (props) => (
                              <h1 className=" text-accent text-3xl md:text-3xl font-bold my-6" {...props} />
                              ),
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
                          }}>{content}</ReactMarkdown>
                  </div>
              </div>
              </div>
            <Footer/>
        </>
    )
} 
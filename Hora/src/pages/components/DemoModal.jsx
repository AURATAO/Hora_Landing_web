import { useState, useEffect } from "react"
import { X } from 'lucide-react';
import { Link } from "react-router-dom";
import { Loader2 } from 'lucide-react';


export default function DemoModal({ show, onClose, }){
    const [company, setCompany] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false);
    const [errors, setErrors]= useState('');
    const [loading, setLoading] = useState(false);

useEffect(()=>{
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
   if (show) {
  document.body.classList.add('overflow-hidden');
  document.body.style.paddingRight = `${scrollBarWidth}px`;
} else {
  document.body.classList.remove('overflow-hidden');
  document.body.style.paddingRight = '';
}
return () => {
  document.body.classList.remove('overflow-hidden');
  document.body.style.paddingRight = '';
};
},[show])

useEffect(()=>{
    if(show){
    setCompany('');
    setName('');
    setEmail('');
    setAgree(false);
    setErrors('');
    }
},[show])

if(!show) {
    return null;
}

const handleClose = () => {
  onClose(); // 只負責關閉
};

const handleSubmit =async(e)=>{
            e.preventDefault();
            setLoading(true);
           console.log("Submit button clicked"); 

        if (!company || !name || !email || !agree) {
            console.warn('Form not complete', { company, name, email, agree });
            setErrors('Please complete all fields and agree to the terms.');
            setLoading(false);
            return;
        }

        setErrors('');
        console.log("Form data ready to submit:", { company, name, email, agree });

        // 🚀 這裡可以呼叫你的 API 或其他邏輯
        const payload = {
            company: company,
            full_name: name,
            email: email,
        };
       
        try {
            const res = await fetch("https://hora-pocketbase.onrender.com/api/collections/demo_requests/records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
            });

            if (!res.ok) {
            const error = await res.json();
            alert("We're sorry, your submission could not be completed. (" + error.message + ")");
            setLoading(false);
            return;
            }

            alert("Thanks! Your request has been received — we'll be in touch with your demo access.");
            setName("");
            setEmail("");
        } catch (err) {
            console.error("Error:", err);
            alert("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
            

        onClose(); // 成功後關閉 modal
    };


    return (
        <>
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-primary)]/70 p-4">
            <div className="relative bg-primary  rounded-lg p-8  w-full max-w-md">
                {/* X button */}
                <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-accent hover:text-secondary"
                >
                <X />
                </button>

                <h2 className="text-2xl font-semibold mb-6 text-accent text-center">
                Sign Up
                </h2>

                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-accent mb-1">Company Name</label>
                    <input 
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-accent focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-accent mb-1">Full Name</label>
                    <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-accent focus:outline-none  focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-accent mb-1">Email Address</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none text-accent focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                </div>

                <div className="flex items-center mb-4">
                    <input 
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mr-2 accent-[var(--color-secondary)]"
                    />
                    <span className="text-accent text-sm">
                    I have read and agree to the <Link to="/privacy" className="underline text-secondary">Privacy Policy</Link> and <Link to="/terms" className="underline text-secondary">Terms of Use</Link>.
                    </span>
                </div>

                {errors && (
                    <p className="text-red-600 text-sm mb-4">{errors}</p>
                )}

                <button 
                    type="submit"
                    className="w-full py-4 button-tech"
                     disabled={loading}
                >
                    {loading ? (
                        <>
                           <span className="flex justify-center items-center space-x-2">
                                <Loader2 className="animate-spin w-4 h-4" />
                                <span>Processing...</span>
                            </span>
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </button>
                </form>
            </div>
        </div>

        </>
    )
}
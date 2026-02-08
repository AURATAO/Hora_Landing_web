import { useState } from 'react';
import JoinModal from "./components/JoinModal";


export default function JoinPage(){
    const [showJoinModal, setShowJoinModal]=useState(null);

    return(
        <>
        <div className=" bg-linear-to-br from-primary to-primary/30 text-secondary min-h-screen py-25 px-4">

              <div className="pt-12 pb-20 w-full ">
                  <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-semibold text-primary  uppercase mb-4" >Join Hora</h2>
                    <p className="text-primary/70 font-secondary mb-12">
                    Be first to try Hora — Join Early Access
                    </p>
            
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                      {/* Supporter Card */}
                      <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md"  >
                        <h3 className="text-xl font-semibold text-primary mb-4">💚 Supporter</h3>
                        <ul className="space-y-3 text-sm text-gray-700">
                          <li><span className="font-medium text-secondary">Who:</span> Students, freelancers, part-timers</li>
                          <li><span className="font-medium text-secondary">Why:</span> Use your spare time wisely — support with groceries, clean a backyard, or share an hour at the park. Every task brings value.</li>
                          <li><span className="font-medium text-secondary">How to start:</span> Sign up + verify identity</li>
                          <li className="italic text-xs text-gray-500">“Weekend free? I take a task or two — and turn time into extra income.”</li>
                        </ul>
                        <button
                          className="mt-6 w-full py-2 rounded-lg bg-primary text-white hover:bg-[#333f48] transition"
                          onClick={() => setShowJoinModal('supporter')}
                        >
                         Start Earning Your Spare Time
                        </button>
                      </div>
            
                      {/* Requester Card */}
                      <div className="border border-[#E5E7EB] bg-white rounded-3xl p-8 shadow-md" >
                        <h3 className="text-xl font-semibold text-primary mb-4">🤝 Requester</h3>
                        <ul className="space-y-3 text-sm text-gray-700">
                          <li><span className="font-medium text-secondary">Who:</span> Busy professionals, families, teams</li>
                          <li><span className="font-medium text-secondary">Why:</span> Whether it’s picking up groceries, handling chores, or simply needing company — post what you need and use your time wisely.</li>
                          <li><span className="font-medium text-secondary">How to start:</span> QuickRequest or Schedule a task</li>
                          <li className="italic text-xs text-gray-500">“One tap. Chores done. I’ve got my time back.”</li>
                        </ul>
                        <button
                          className="mt-6 w-full py-2 rounded-lg bg-secondary text-primary hover:bg-[#91b76e] transition"
                          onClick={() => setShowJoinModal('requester')}
                        >
                          Post Your First Task
                        </button>
                      </div>
                    </div>
                     {showJoinModal && (
                      <JoinModal role={showJoinModal} onClose={() => setShowJoinModal(null)} />
                    )}
                  </div>
              </div>
              <p className="text-xs text-accent text-center mt-4">
                We respect your privacy — your information will only be used to contact you about Hora’s early access.
            </p>
        </div>
        </>
    )
}
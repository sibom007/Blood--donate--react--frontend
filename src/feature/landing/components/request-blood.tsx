// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { AlertCircle, Droplets, ArrowRight } from "lucide-react";
// import { Link } from "react-router";

// export function RequestBlood() {
//   return (
//     <section
//       id="request"
//       className="py-16 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden min-h-[85vh] flex items-center">
//       {/* Dynamic Background Blur Deco */}
//       <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

//       <div className="max-w-5xl mx-auto w-full relative z-10">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key="landing"
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.4, ease: "easeInOut" }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             {/* Left Side: Visual / Image Container */}
//             <div className="relative group rounded-2xl overflow-hidden shadow-xl border border-border aspect-[4/3] md:aspect-square bg-muted flex items-center justify-center">
//               {/* Fallback designed placeholder representing a clinical environment. Swap src with your asset URI */}
//               <img
//                 src="https://images.unsplash.com/photo-1615461066841-6116ecdacd6f?q=80&w=1000&auto=format&fit=crop"
//                 alt="Blood Bank Logistics and Medical Assistance"
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
//               <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-xl border border-border flex items-center gap-3">
//                 <div className="bg-destructive/10 p-2 rounded-lg">
//                   <Droplets className="w-5 h-5 text-destructive animate-pulse" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-foreground">
//                     Verified Storage Network
//                   </p>
//                   <p className="text-[11px] text-muted-foreground">
//                     Real-time emergency tracking active
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side: Informational Core Text */}
//             <div className="flex flex-col justify-center space-y-6">
//               <div className="inline-flex items-center gap-2 bg-primary/10 text-primary self-start px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
//                 <AlertCircle className="w-3.5 h-3.5" /> Emergency Dispatch
//               </div>

//               <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-none">
//                 Need Blood Urgent? <br />
//                 <span className="text-primary font-medium text-3xl sm:text-4xl">
//                   We bridge the gap instantly.
//                 </span>
//               </h2>

//               <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
//                 Access our prioritized system linking registered medical
//                 facilities directly to neighborhood donor registries. Submit
//                 immediate verification credentials to mobilize emergency
//                 logistics support.
//               </p>

//               <div className="border-t border-border/60 pt-4 flex items-center gap-4 text-xs text-muted-foreground">
//                 <div>
//                   <span className="block text-lg font-bold text-foreground">
//                     24/7
//                   </span>{" "}
//                   Dispatch Lines
//                 </div>
//                 <div className="w-px h-8 bg-border" />
//                 <div>
//                   <span className="block text-lg font-bold text-foreground">
//                     &lt; 15m
//                   </span>{" "}
//                   Response Time
//                 </div>
//               </div>

//               {/* Primary Transition Action Button */}
//               <Link to={"/request-blood"}>
//                 <Button
//                   icon={
//                     <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                   }
//                   iconPosition="end">
//                   Initiate Blood Request
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, Droplets, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import blooddonatesvg from "../../../assets/RequestForBlood.svg";

export function RequestBlood() {
  return (
    <section
      id="request"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side: Visual / Image Container */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-border/80 aspect-4/3 md:aspect-square bg-muted flex items-center justify-center transition-all duration-300 hover:border-primary/30">
              <img
                src={blooddonatesvg}
                alt="Blood Bank Logistics and Medical Assistance"
                className="w-full h-full  group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

              {/* Premium Floating Status Badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-background/60 backdrop-blur-md p-4 rounded-xl border border-border/50 flex items-center gap-3.5 shadow-lg">
                <div className="bg-primary/10 p-2.5 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground tracking-tight">
                    Verified Storage Network
                  </p>
                  <p className="text-xs text-muted-foreground/90 mt-0.5">
                    Real-time emergency tracking active
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Informational Core Text */}
            <div className="flex flex-col justify-center space-y-6 lg:space-y-7">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary self-start px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                <AlertCircle className="w-3.5 h-3.5 text-primary" /> Emergency
                Dispatch
              </div>

              <h2 className="text-4xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-[1.1] text-balance">
                Need Blood Urgent? <br />
                <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent font-semibold">
                  We bridge the gap instantly.
                </span>
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed text-balance">
                Access our prioritized system linking registered medical
                facilities directly to neighborhood donor registries. Submit
                immediate verification credentials to mobilize emergency
                logistics support.
              </p>

              {/* Stats Grid Splitter */}
              <div className="border-t border-border/80 pt-5 flex items-center gap-6 text-xs text-muted-foreground">
                <div>
                  <span className="block text-2xl font-black text-foreground tracking-tight mb-0.5">
                    24/7
                  </span>{" "}
                  Dispatch Lines
                </div>
                <div className="w-px h-10 bg-border/80" />
                <div>
                  <span className="block text-2xl font-black text-foreground tracking-tight mb-0.5">
                    &lt; 15m
                  </span>{" "}
                  Response Time
                </div>
              </div>

              {/* Primary Transition Action Button */}
              <div className="pt-2">
                <Link to="/request-blood">
                  <Button
                    size="lg"
                    icon={
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    }
                    iconPosition="end">
                    Initiate Blood Request
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

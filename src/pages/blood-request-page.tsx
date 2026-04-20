import { motion } from "motion/react";
import RequestForBlood from "@/assets/RequestForBlood.svg";
import RequestForm from "@/feature/blood-request/components/request-form";

function BloodRequestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 ">
        {/* Left Side: Illustration Container */}
        <div className="hidden md:flex flex-col justify-center group items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <div className="relative flex justify-center items-center">
              <div className="absolute -inset-4 rounded-4xl border-2 border-dashed border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />

              <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src={RequestForBlood}
                  alt="Blood Donation Illustration"
                  className="w-full h-full max-w-125 object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-gray-800 text-center">
              Every Drop Counts
            </h2>
            <p className="mt-4 text-gray-600 text-center">
              Your request helps connect patients with local donors quickly.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Form Area */}
        <div className="flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <RequestForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodRequestPage;

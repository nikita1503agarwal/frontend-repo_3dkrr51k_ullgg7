import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
        >
          Web3 Voting Platform
        </motion.h1>
        <p className="mt-4 text-blue-200/80 text-lg">
          Discover and vote for the best web3 projects. One wallet, one vote.
        </p>
      </div>
    </section>
  );
}

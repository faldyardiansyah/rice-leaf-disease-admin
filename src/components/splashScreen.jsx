import { motion } from 'framer-motion';

function SplashScreen({ onComplete }) {
  const letters = "PadiScan".split("");

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      onAnimationComplete={onComplete}
    >
      {/* Efek Lingkaran Cahaya di Belakang */}
      <motion.div 
        className="absolute w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Container Logo dengan Efek 3D */}
      <div className="relative flex items-center space-x-1 perspective-1000">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: index * 0.08, 
              duration: 0.6,
              type: "spring",
              damping: 12
            }}
            className="text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-200 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            {char}
          </motion.span>
        ))}

        {/* Garis Laser Pemindai (Scanner Effect) */}
        <motion.div
          className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_10px_#34d399]"
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: ["0%", "100%", "50%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>

      {/* Subtitle Kecil di Bawah */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-4 text-slate-400 text-sm tracking-widest uppercase font-medium"
      >
        Smart Disease Detection
      </motion.p>
    </motion.div>
  );
}

export default SplashScreen;
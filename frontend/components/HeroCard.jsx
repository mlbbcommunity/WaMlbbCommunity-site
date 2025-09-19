import React from 'react';
import { motion } from 'framer-motion';

export default function HeroCard({name, role, color}){
  return (
    <motion.div whileHover={{ y: -6 }} className={"p-5 rounded-xl shadow-xl " + color + " text-black"}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center text-white font-bold">{name[0]}</div>
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-sm opacity-80">{role}</div>
        </div>
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-white/20 rounded-lg">View Commands</button>
      </div>
    </motion.div>
  );
}

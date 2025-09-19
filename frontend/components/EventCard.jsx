import React from 'react';
import { motion } from 'framer-motion';

export default function EventCard({event}){
  return (
    <motion.div layout initial={{opacity:0}} animate={{opacity:1}} className="mb-3 p-3 rounded-lg bg-gray-900/60">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{event.title}</div>
          <div className="text-sm text-gray-400">{event.description}</div>
        </div>
        <div className="text-xs text-gray-400">{event.start_time ? new Date(event.start_time).toLocaleString() : ''}</div>
      </div>
    </motion.div>
  );
}

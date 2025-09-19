import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import HeroCard from './components/HeroCard';
import EventCard from './components/EventCard';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App(){
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(()=>{
    fetchEvents();
    fetchNews();
  },[]);

  async function fetchEvents(){
    try{
      const res = await axios.get(API + '/api/events');
      setEvents(res.data);
    }catch(e){ console.error(e) }
  }
  async function fetchNews(){
    try{
      const res = await axios.get(API + '/api/news');
      setNews(res.data);
    }catch(e){ console.error(e) }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, 10, -6, 0] }}
          transition={{ duration: 1.2, type: 'spring' }}
          className="inline-block bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-3 rounded-2xl shadow-2xl"
        >
          <h1 className="text-2xl font-bold">WaMlbb <span className="text-sm block">Community</span></h1>
        </motion.div>
      </header>

      <main className="p-6 grid grid-cols-12 gap-6">
        <aside className="col-span-4">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Community News</h2>
            {news.length===0 && <p className="text-gray-400">No news yet.</p>}
            {news.map(n=> <div key={n.id} className="mb-3 p-4 rounded-lg bg-gray-900/60">{n.title}</div>)}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Events</h2>
            {events.length===0 && <p className="text-gray-400">No events yet.</p>}
            {events.map(e=> <EventCard key={e.id} event={e} />)}
          </section>
        </aside>

        <section className="col-span-8">
          <h2 className="text-2xl font-bold mb-4">WhatsApp Bots</h2>
          <div className="grid grid-cols-2 gap-4">
            <HeroCard name="Layla" role="Hero Assistant" color="bg-pink-500" />
            <HeroCard name="Silvanna" role="Tournament Manager" color="bg-cyan-500" />
            <HeroCard name="Aamon" role="Stats Tracker" color="bg-violet-600" />
          </div>
        </section>
      </main>
    </div>
  );
}

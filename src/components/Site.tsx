import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowRight, Check, Award, Users, BookOpen, Target, MessageCircle } from 'lucide-react';
import { InstituteLogo } from './InstituteLogo';
import { COURSES, NOTICES, INSTITUTION_INFO as I } from '../data/mockData';

const gold = 'text-[color:var(--color-gold)]';
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className={`text-xs font-semibold tracking-[0.25em] uppercase ${gold}`}>{children}</p>
);
const Btn = ({ children, onClick, ghost }: { children: React.ReactNode; onClick?: () => void; ghost?: boolean }) => (
  <button onClick={onClick} className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition ${ghost ? 'border border-white/40 text-white hover:bg-white/10' : 'bg-[color:var(--color-gold)] text-[color:var(--color-ink)] hover:brightness-110'}`}>{children}</button>
);

const LINKS = [['programs', 'Programs'], ['why', 'Why Us'], ['team', 'Our Team'], ['notices', 'Notices'], ['chairman', 'Chairman'], ['contact', 'Contact']];

export const Navbar = ({ onApply }: { onApply: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3"><InstituteLogo size={52} /><span className="hidden sm:block leading-tight"><span className="font-serif text-xl uppercase tracking-wide text-[#0b1b33]">BE SMART</span><br /><span className="text-xs tracking-[0.12em] text-[#b5121b] font-sans font-bold uppercase">Coaching Center Pvt. Ltd.</span></span></a>
        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map(([id, l]) => <a key={id} href={`#${id}`} className="text-sm text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-gold)] transition">{l}</a>)}
          <Btn onClick={onApply}><MessageCircle size={16} /> WhatsApp Enquiry</Btn>
        </nav>
        <button className="lg:hidden text-[color:var(--color-ink)]" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="lg:hidden bg-white px-6 pb-6 space-y-4 border-t border-slate-100">
        {LINKS.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block text-[color:var(--color-ink)]/80">{l}</a>)}
        <Btn onClick={() => { setOpen(false); onApply(); }}><MessageCircle size={16} /> WhatsApp Enquiry</Btn>
      </div>}
    </header>
  );
};

export const Hero = ({ onApply }: { onApply: () => void }) => (
  <section id="top" className="relative min-h-screen flex items-center bg-[color:var(--color-ink)] text-white overflow-hidden">
    <img src="./images/hero_coaching_campus_1791091823438.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-ink)] via-[color:var(--color-ink)]/80 to-transparent" />
    <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid">
      <div className="max-w-2xl space-y-8">
        <Eyebrow>Janakpurdham · Est. 2024</Eyebrow>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[1.05]">Where ambition meets <span className={gold}>excellence.</span></h1>
        <p className="text-lg text-white/75 leading-relaxed">School tuition for Classes 1–10, Loksewa preparation and Nepal Engineering Council license exam classes — guided by experienced faculty in Janakpurdham.</p>
        <div className="flex flex-wrap gap-4"><Btn onClick={onApply}><MessageCircle size={16} /> Enquire on WhatsApp <ArrowRight size={16} /></Btn><a href="#programs"><Btn ghost>Explore Programs</Btn></a></div>
      </div>
    </div>
    <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-black/30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/80">
        {[[`${COURSES.length} Programs`, 'School · Loksewa · NEC License'], ['Sun – Fri', '6:00 AM – 7:30 PM'], ['Class 1–10', 'Tuition classes'], ['Janakpur-04', 'Dhanusha, Nepal']].map(([a, b]) => <div key={a}><p className="font-serif text-xl text-white">{a}</p><p className="text-xs text-white/60">{b}</p></div>)}
      </div>
    </div>
  </section>
);

export const Programs = ({ onApply }: { onApply: (id: string) => void }) => (
  <section id="programs" className="py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-2xl mb-16 space-y-4"><Eyebrow>Our Programs</Eyebrow><h2 className="font-serif text-4xl md:text-5xl">Focused preparation for every ambition</h2></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {COURSES.map((c) => (
          <article key={c.id} className="group border border-slate-200 hover:border-[color:var(--color-gold)] hover:shadow-2xl transition flex flex-col">
            <div className="h-48 overflow-hidden"><img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" /></div>
            <div className="p-7 flex-1 flex flex-col">
              <p className={`text-[11px] tracking-[0.2em] uppercase font-semibold ${gold}`}>{c.category}</p>
              <h3 className="font-serif text-xl mt-2 mb-3 leading-snug">{c.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{c.tagline}</p>
              <ul className="space-y-2 text-sm text-slate-700 mb-6">{c.features.slice(0, 3).map((f) => <li key={f} className="flex gap-2"><Check size={16} className={`${gold} shrink-0 mt-0.5`} />{f}</li>)}</ul>
              <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                <div><p className="text-xs text-slate-500">{c.badge}</p><p className="font-serif text-lg">{c.feeNPR > 0 ? `NPR ${c.feeNPR.toLocaleString()}` : 'Fee on inquiry'}</p></div>
                <button onClick={() => onApply(c.id)} className="text-sm font-semibold text-[color:var(--color-ink)] flex items-center gap-1 hover:gap-2 transition-all">Enquire <MessageCircle size={14} /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const WhyUs = () => (
  <section id="why" className="py-28 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <Eyebrow>Why Be Smart</Eyebrow><h2 className="font-serif text-4xl md:text-5xl">A disciplined, personal approach to results</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {[[Users, 'Experienced Faculty', 'Subject specialists for school, Loksewa and engineering license exams.'], [Target, 'Weekly Model Tests', 'Regular exam-pattern tests with clear feedback.'], [BookOpen, 'Complete Modules', 'Study modules and solved past questions.'], [Award, 'Personal Attention', 'Focused guidance so every student keeps pace.']].map(([Icon, t, d]: any) => (
            <div key={t} className="space-y-2"><Icon className={gold} size={26} /><h3 className="font-serif text-lg">{t}</h3><p className="text-sm text-slate-600 leading-relaxed">{d}</p></div>
          ))}
        </div>
      </div>
      <div className="relative"><img src="./images/classroom_study_group_1791091838115.webp" alt="Classroom" className="w-full h-[480px] object-cover" /><div className="absolute -bottom-5 -left-5 w-full h-full border border-[color:var(--color-gold)] -z-10" /></div>
    </div>
  </section>
);

export const Team = () => (
  <section id="team" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-2xl mb-12 space-y-4"><Eyebrow>Our Team</Eyebrow><h2 className="font-serif text-4xl md:text-5xl">Meet the people guiding Be Smart</h2><p className="text-slate-600 leading-relaxed">Our leadership team supports academic quality, administration and technology.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[['Er. Sumit Yadav', 'Head of Department'], ['Mr. Ravi Jha', 'Administration Head'], ['Er. Purushendra Karn', 'IT Head']].map(([name, role]) => (
          <article key={role} className="border border-slate-200 p-7 bg-slate-50 hover:border-[color:var(--color-gold)] transition">
            <div className="w-12 h-1 bg-[color:var(--color-gold)] mb-6" />
            <h3 className="font-serif text-xl text-[color:var(--color-ink)]">{name}</h3>
            <p className="mt-2 text-sm font-semibold tracking-wide text-slate-600">{role}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const Notices = () => (
  <section id="notices" className="py-28 bg-white">
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-12 space-y-4"><Eyebrow>Notice Board</Eyebrow><h2 className="font-serif text-4xl">Latest announcements</h2></div>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {NOTICES.filter((n) => n.category !== 'Administrative').map((n) => (
          <div key={n.id} className="py-6 grid sm:grid-cols-[110px_1fr] gap-2 sm:gap-8">
            <time className="text-sm text-slate-500">{n.date}</time>
            <div><span className={`text-[11px] tracking-[0.2em] uppercase font-semibold ${gold}`}>{n.category}</span><h3 className="font-serif text-lg mt-1">{n.title}</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">{n.content}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Chairman = () => (
  <section id="chairman" className="py-28 bg-[color:var(--color-ink)] text-white">
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[280px_1fr] gap-12 items-center">
      <img src={I.directorAvatar} alt={I.director} className="w-full h-auto max-h-[560px] object-contain object-top" />
      <div className="space-y-5"><Eyebrow>From the Chairman</Eyebrow>
        <blockquote className="font-['Playfair_Display'] italic text-2xl md:text-3xl leading-snug">“Every student carries a dream. Our work is to give it structure, discipline and direction.”</blockquote>
        <div><p className="font-semibold">{I.director}</p><p className="text-sm text-white/60">Chairman</p></div></div>
    </div>
  </section>
);

export const Contact = ({ onApply }: { onApply: () => void }) => (
  <section id="contact" className="py-28 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
      <div className="space-y-8"><Eyebrow>Contact</Eyebrow><h2 className="font-serif text-4xl md:text-5xl">Begin your journey with us</h2>
        <ul className="space-y-5 text-slate-700">
          <li className="flex gap-4"><MapPin className={gold} />{I.address}</li>
          <li className="flex gap-4"><Phone className={gold} /><a href="tel:+9779765630131" className="hover:underline">+977 9765630131 · Call us</a></li>
          <li className="flex gap-4"><MessageCircle className={gold} /><a href="https://wa.me/9779765630131?text=Namaste%2C%20I%20would%20like%20to%20enquire%20about%20classes%20at%20Be%20Smart%20Coaching%20Center." target="_blank" rel="noreferrer" className="hover:underline">WhatsApp: 9765630131</a></li>
          <li className="flex gap-4"><Mail className={gold} /><a href={`mailto:${I.email}`} className="break-all">{I.email}</a></li>
          <li className="flex gap-4"><Clock className={gold} />Sunday – Friday, 6:00 AM – 7:30 PM</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href="tel:+9779765630131" className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-ink)] text-white px-5 py-3 text-sm font-semibold hover:bg-slate-800 transition"><Phone size={17} /> Call Now</a>
          <a href="https://wa.me/9779765630131?text=Namaste%2C%20I%20would%20like%20to%20enquire%20about%20classes%20at%20Be%20Smart%20Coaching%20Center." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 text-sm font-semibold hover:bg-green-700 transition"><MessageCircle size={17} /> WhatsApp Us</a>
        </div>
      </div>
      <div className="space-y-5">
        <div className="bg-white p-6 border border-slate-200 space-y-3"><h3 className="font-serif text-2xl">Find our institute</h3><p className="text-slate-600 text-sm">Janakpur-04, Dhanusha, Nepal</p>
          <div className="overflow-hidden border border-slate-200 aspect-[4/3] min-h-[280px]"><iframe title="Be Smart Coaching Center location map" src="https://maps.google.com/maps?q=Be%20Smart%20Coaching%20Center%20Janakpur-04%20Dhanusha%20Nepal&output=embed" width="100%" height="100%" style={{ border: 0, minHeight: '280px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
          <a href="https://maps.app.goo.gl/YCkpC7ZDaLfUmq8BA?g_st=aw" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-ink)] hover:underline"><MapPin size={16} /> Open exact location in Google Maps <ArrowRight size={14} /></a>
        </div>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="bg-[color:var(--color-ink)] text-white/60 text-sm"><div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between gap-2"><p>© {new Date().getFullYear()} {I.name}</p><p>Reg. No. {I.registrationNo} · {I.city}, {I.country}</p></div></footer>
);

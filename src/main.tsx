import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, MotionConfig, useReducedMotion} from 'motion/react';

import {paragraphs} from './content';
import './style.css';
import {ScrollPillars} from './ScrollPillars';
import {Specialists} from './Specialists';

export function App(){
 const reduced=useReducedMotion();
 const reveal={
  initial: reduced ? false as const : {opacity:0,y:24},
  whileInView:{opacity:1,y:0},
  viewport:{once:true,amount:0.15,margin:'0px 0px -35px 0px'},
  transition:{duration:0.75,ease:[0.22,1,0.36,1] as [number,number,number,number]}
 };


 const [copied,setCopied]=useState('');
 async function copy(){try{await navigator.clipboard.writeText('+79187423820');setCopied('Номер скопирован');}catch{setCopied('Номер для записи: +7 918 742-38-20');}}
 return <MotionConfig reducedMotion="user"><a className="skip" href="#about">К содержанию</a><header><a className="brand" href="#home"><img className="corner-emblem" src="./emblem-transparent.svg" alt="Шалфей — курорт Пятигорск. Содружество медицинских специалистов"/></a><nav aria-label="Основная навигация"><a href="#about">О встрече</a><a href="#pillars">Пять опор</a><a href="#team">Специалисты</a><a href="#program">Программа</a></nav></header><div className="page-landscape" aria-hidden="true"/><main>
 <section id="home" className="hero"><div className="hero-copy"><motion.p {...reveal} className="eyebrow">Восстановительная групповая терапия</motion.p><motion.h1 {...reveal}>Время найти<br/><em>баланс</em><span className="dot">.</span></motion.h1><motion.p {...reveal} className="intro">Уметь чувствовать непривычное<br/>и принимать оптимальное.</motion.p><div className="flex flex-wrap gap-4 items-center"><a className="button" href="tel:+79187423820">Позвонить и записаться ↗</a><a href="#about">О мероприятии ↓</a></div><motion.p {...reveal} className="date">21 ноября · суббота · 16:30</motion.p></div></section>
 <div className="facts">{[[8,"занятий в цикле"],[2,"раза в неделю"],[8,"человек в группе"]].map(([number,label],i)=><motion.span key={label} {...reveal} transition={{...reveal.transition,delay:i*.1}}><b>{number}</b>{label}</motion.span>)}</div>
 <section id="about" className="section about"><motion.p {...reveal} className="eyebrow">01 / О мероприятии</motion.p><div><motion.h2 {...reveal}>{paragraphs[0]}</motion.h2>{paragraphs.slice(1).map(p=><motion.p {...reveal} key={p}>{p}</motion.p>)}</div></section>
 <ScrollPillars/>
 <Specialists/>
 <section id="program" className="section program program-refined">
  <div className="program-heading"><motion.p {...reveal} className="eyebrow">04 / Программа и формат</motion.p><motion.h2 {...reveal}>Восемь встреч.<br/>Время для себя.</motion.h2></div>
  <div className="program-details">
   {[
    ['Первая встреча','21 ноября','Суббота · 16:30'],
    ['Полный цикл','8 занятий','Два раза в неделю'],
    ['Группа','8 человек','']
   ].map(([label,value,detail],i)=><motion.div {...reveal} transition={{...reveal.transition,delay:i*.08}} className="program-detail" key={label}>
    <span className="program-label">{label}</span><strong>{value}</strong>{detail&&<span className="program-detail-note">{detail}</span>}
   </motion.div>)}
  </div>
  <motion.h2 {...reveal} className="program-closing">Найдите время<br/><em>найти баланс.</em></motion.h2>
  <motion.p {...reveal} className="program-invitation">Сообщить запрос, уточнить детали<br/>и записаться можно по телефону.</motion.p>
 </section>
 <section id="signup" className="section signup" aria-label="Запись на мероприятие"><a className="phone" href="tel:+79187423820">+7 918 742-38-20 ↗</a><div className="flex flex-wrap justify-center gap-4"><a className="button" href="tel:+79187423820">Позвонить и записаться</a><button className="copy" onClick={copy}>Скопировать номер</button></div><motion.p {...reveal} role="status">{copied}</motion.p></section>
 </main><footer><span>Шалфей-Пятигорск</span><a href="#home">К началу ↑</a></footer></MotionConfig>
}
createRoot(document.getElementById('root')!).render(<App/>);
















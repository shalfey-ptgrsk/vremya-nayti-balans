import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {specialistProfiles} from './specialistProfiles';

export function Specialists(){
 const reduced=useReducedMotion();
 const part={
  hidden:{opacity:0,y:24},
  visible:{opacity:1,y:0,transition:{duration:.75,ease:[.22,1,.36,1] as [number,number,number,number]}}
 };
 return <section id="team" className="section specialists-section" aria-labelledby="team-title">
  <p className="eyebrow">03 / Специалисты</p>
  <h2 id="team-title">Вместе<br/><em>и внимательно.</em></h2>
  <p className="team-intro">В блестящем взаимодействии и разнообразии применяемых методик группу курирует Содружество профильных специалистов Шалфей-Пятигорск.</p>
  <div className="specialist-profiles specialist-pages">
   {specialistProfiles.map((person,i)=><motion.article key={person.id} id={"specialist-"+person.id} className="specialist-profile specialist-page" aria-labelledby={'name-'+person.id}
    initial={reduced?false:'hidden'} whileInView="visible"
    viewport={{once:false,amount:.22}}
    variants={{hidden:{opacity:0,y:reduced?0:45},visible:{opacity:1,y:0,transition:{duration:.8,ease:[.22,1,.36,1],staggerChildren:.12}}}}>
     <motion.figure className="specialist-visual" variants={part}>
      <img src={person.image} alt={person.alt} width={person.width} height={person.height} loading="lazy" decoding="async"/>
     </motion.figure>
     <div className="specialist-copy">
      <motion.p variants={part} className="eyebrow specialist-count">Специалист · 0{i+1} / 05</motion.p>
      <motion.h3 variants={part} id={'name-'+person.id}>{person.name}</motion.h3>
      <motion.p variants={part} className="specialist-role">{person.role}</motion.p>
      {person.paragraphs.map(text=><motion.p key={text} variants={part}>{text}</motion.p>)}
      <a className="specialist-next" href={i<specialistProfiles.length-1?'#specialist-'+specialistProfiles[i+1].id:'#program'}>{i<specialistProfiles.length-1?'Следующий специалист ↓':'К программе встречи ↓'}</a>
     </div>
   </motion.article>)}
  </div>
 </section>;
}




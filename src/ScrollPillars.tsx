import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {pillars} from './content';

export function ScrollPillars(){
 const reduced=useReducedMotion();
 return <section id="pillars" className="section pillars-compact" aria-labelledby="pillars-title">
  <p id="pillars-title" className="eyebrow">02 / Пять опор</p>

  <p className="eyebrow pillars-caption">Уметь</p>
  <ol className="pillars-list">
   {pillars.map((word,i)=><motion.li key={word}
    initial={reduced?false:{opacity:0,y:24}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true,amount:.65,margin:'0px 0px -8% 0px'}}
    transition={{duration:.75,ease:[.22,1,.36,1]}}>
     <span className="pillar-number" aria-hidden="true">0{i+1}</span>
     <h3>{word}<span>.</span></h3>
     <span className="pillar-row-line" aria-hidden="true"/>
    </motion.li>)}
  </ol>
  <motion.p initial={reduced?false:{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.6}} transition={{duration:.6}}>Этим и планируем вас занять.</motion.p>
 </section>;
}


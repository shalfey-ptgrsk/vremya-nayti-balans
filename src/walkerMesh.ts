import {gait} from './gait';
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(x:number)=>{const t=clamp(x);return t*t*(3-2*t);};
export function meshPoint(u:number,v:number,pose:ReturnType<typeof gait>,layer=2){
 const s=pose.size,w=s*.75;
 const base={x:pose.hip.x+(.49-u)*w,y:pose.hip.y+(v-.47)*s};
 if(layer===2||v<=.47)return base;
 const side=layer===0?1:0,foot=pose.feet[side],knee=pose.knees[side];
 const sx=layer===0?.235:.77,sk=layer===0?.32:.62;
 const t=clamp((v-.47)/(.925-.47));
 // Curved skinning along each anatomical leg; separate depth layers prevent merging.
 const arc=4*t*(1-t);
 const sourceCentre=.49+(sx-.49)*t+arc*(sk-(.49+sx)/2);
 const targetCentre={
  x:pose.hip.x+(foot.x-pose.hip.x)*t+arc*(knee.x-(pose.hip.x+foot.x)/2),
  y:pose.hip.y+(foot.y-pose.hip.y)*t+arc*(knee.y-(pose.hip.y+foot.y)/2)
 };
 const target={x:targetCentre.x-(u-sourceCentre)*w,y:targetCentre.y+Math.max(0,v-.925)*s};
 const blend=ease((v-.47)/.07);
 return {x:base.x+(target.x-base.x)*blend,y:base.y+(target.y-base.y)*blend};
}

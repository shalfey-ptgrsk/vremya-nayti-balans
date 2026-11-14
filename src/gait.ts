export const ropeY=(x:number,w:number,h:number)=>(710+6*x/w+12*Math.sin(Math.PI*x/w))*h/1024;
type Point={x:number;y:number};
const smooth=(t:number)=>t*t*t*(10+t*(-15+6*t));
export function gait(p:number,w:number,h:number){
 p=Math.max(0,Math.min(1,p));
 const size=Math.min(h*(w<=760?.3:.44),350);
 const margin=size*.42+24, travel=Math.max(1,w-2*margin);
 const cycles=Math.max(2,Math.ceil(travel/(size*.22))), stride=travel/(cycles*2);
 const start=w-margin-stride/2, phase=p*cycles;
 function foot(offset:number){
  const s=phase+offset,n=Math.floor(s),f=s-n;
  const swing=f>.66,u=Math.max(0,(f-.66)/.34);
  const x=start+offset*2*stride-2*stride*(n+smooth(u));
  const lift=swing?Math.pow(Math.sin(Math.PI*u),2)*size*.028:0;
  return {x,y:ropeY(x,w,h)-lift,planted:!swing,transfer:swing?Math.pow(Math.sin(Math.PI*u),2):0};
 }
 const feet=[foot(0),foot(.5)];
 const nominal=w-margin-p*travel;
 const shifted=nominal+(feet[1].x-nominal)*feet[0].transfer*.3+(feet[0].x-nominal)*feet[1].transfer*.3;
 const hip={x:shifted,y:ropeY(shifted,w,h)-size*.425};
 const length=size*.216;
 function knee(end:Point):Point{
  const ankle={x:end.x,y:end.y-size*.018};
  const dx=ankle.x-hip.x,dy=ankle.y-hip.y,d=Math.hypot(dx,dy);
  const bend=Math.sqrt(Math.max(0,length*length-d*d/4));
  return {x:(hip.x+ankle.x)/2-dy/d*bend,y:(hip.y+ankle.y)/2+dx/d*bend};
 }
 return {size,hip,feet,knees:feet.map(knee)};
}





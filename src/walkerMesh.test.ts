import {it,expect} from 'vitest';
import {gait,ropeY} from './gait';
import {meshPoint} from './walkerMesh';
it('keeps each sole attached to its own leg across 10001 scroll positions',()=>{
 for(let i=0;i<=10000;i++){
  const pose=gait(i/10000,1440,900);
  for(const [layer,u] of [.235,.77].entries()){
   const actual=meshPoint(u,.925,pose,layer),foot=pose.feet[1-layer];
   expect(actual.x).toBeCloseTo(foot.x,7);
   expect(actual.y).toBeCloseTo(foot.y,7);
   if(foot.planted)expect(actual.y).toBeCloseTo(ropeY(actual.x,1440,900),7);
   const top=meshPoint(.49,.47,pose,layer);
   expect(top.x).toBe(pose.hip.x);expect(top.y).toBe(pose.hip.y);
  }
 }
});
it('has no discontinuity at gait cycle boundaries',()=>{
 for(const [w,h] of [[360,800],[1440,900]]){
  for(let i=1;i<1000;i++){
   const p=i/1000,a=gait(p-1e-7,w,h),b=gait(p+1e-7,w,h);
   for(const layer of [0,1])for(const v of [.47,.55,.7,.9,.925]){
    const q=meshPoint(layer===0?.235:.77,v,a,layer),r=meshPoint(layer===0?.235:.77,v,b,layer);
    expect(Math.hypot(q.x-r.x,q.y-r.y)).toBeLessThan(.01);
   }
  }
 }
});

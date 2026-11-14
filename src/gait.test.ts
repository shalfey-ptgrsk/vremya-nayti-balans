import {expect,it} from 'vitest';
import {gait,ropeY} from './gait';
it('alternates planted and swinging feet and keeps planted feet on the rope',()=>{
 for(const [w,h] of [[360,800],[454,896],[1440,900],[2560,1440]]){
  let lifted=0;
  for(let i=0;i<=1000;i++){
   const pose=gait(i/1000,w,h);
   expect(pose.feet.some(f=>f.planted)).toBe(true);
   for(const f of pose.feet){
    if(f.planted)expect(f.y).toBeCloseTo(ropeY(f.x,w,h),8);
    else if(f.y<ropeY(f.x,w,h)-1)lifted++;
    expect(f.x).toBeGreaterThan(0);expect(f.x).toBeLessThan(w);
   }
  }
  expect(lifted).toBeGreaterThan(100);
 }
});
it('does not slide the planted foot during a step',()=>{
 const a=gait(.001,1440,900),b=gait(.002,1440,900);
 expect(a.feet[0].planted&&b.feet[0].planted).toBe(true);
 expect(a.feet[0].x).toBe(b.feet[0].x);
 expect(a.hip.x).not.toBe(b.hip.x);
});

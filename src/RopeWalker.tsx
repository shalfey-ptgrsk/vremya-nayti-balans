import React,{useEffect,useRef,useState} from 'react';
import type {MotionValue} from 'motion/react';
import {gait} from './gait';
import {meshPoint} from './walkerMesh';
export function RopeWalker({progress,reduced,width,height}:{progress:MotionValue<number>;reduced:boolean|null;width:number;height:number}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const [fallback,setFallback]=useState(false);
 useEffect(()=>{
  const node=canvas.current;if(!node)return;
  const gl=node.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});
  if(!gl){setFallback(true);return;}
  let disposed=false;
  const compile=(type:number,source:string)=>{
   const shader=gl.createShader(type)!;gl.shaderSource(shader,source);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader)||'shader');
   return shader;
  };
  const vs=compile(gl.VERTEX_SHADER,'attribute vec2 position; attribute vec2 uv; uniform vec2 viewport; varying vec2 tex; void main(){tex=uv;gl_Position=vec4(position.x/viewport.x*2.0-1.0,1.0-position.y/viewport.y*2.0,0.0,1.0);}');
  const fs=compile(gl.FRAGMENT_SHADER,'precision mediump float; varying vec2 tex; uniform sampler2D photo; uniform float layer; void main(){float u=tex.x*4.0; float v=tex.y; if(layer>1.5){if(v>0.52)discard;}else{if(v<0.47)discard;if(layer<0.5 && u>0.48)discard;if(layer>0.5 && u<0.48)discard;}gl_FragColor=texture2D(photo,tex);}');
  const program=gl.createProgram()!;gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.useProgram(program);
  const nx=40,ny=56,data=new Float32Array((nx+1)*(ny+1)*4),indices:number[]=[];
  for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){const a=y*(nx+1)+x,b=a+1,c=a+nx+1,d=c+1;indices.push(a,c,b,b,c,d);}
  const vertices=gl.createBuffer(),elements=gl.createBuffer(),texture=gl.createTexture();
  gl.bindBuffer(gl.ARRAY_BUFFER,vertices);
  for(const [name,offset] of [['position',0],['uv',8]] as const){
   const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,16,offset);
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,elements);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
  const ratio=Math.min(window.devicePixelRatio||1,2);
  node.width=Math.round(width*ratio);node.height=Math.round(height*ratio);
  gl.viewport(0,0,node.width,node.height);gl.uniform2f(gl.getUniformLocation(program,'viewport'),width,height);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  let ready=false;
  const draw=()=>{
   if(!ready||disposed)return;
   const pose=gait(reduced?0:progress.get(),width,height);
   gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
   for(const layer of [0,1,2]){
    for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++){
     const u=x/nx,v=y/ny,p=meshPoint(u,v,pose,layer),i=(y*(nx+1)+x)*4;
     data[i]=p.x;data[i+1]=p.y;data[i+2]=u/4;data[i+3]=v;
    }
    gl.uniform1f(gl.getUniformLocation(program,'layer'),layer);
    gl.bindBuffer(gl.ARRAY_BUFFER,vertices);gl.bufferData(gl.ARRAY_BUFFER,data,gl.DYNAMIC_DRAW);
    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
   }
  };
  const img=new Image();img.onload=()=>{
   if(disposed)return;
   gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
   ready=true;setFallback(false);draw();
  };img.onerror=()=>setFallback(true);img.src='./walker-steps.png';
  const off=progress.on('change',draw);
  return ()=>{disposed=true;off();gl.deleteBuffer(vertices);gl.deleteBuffer(elements);gl.deleteTexture(texture);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
 },[progress,reduced,width,height]);
 return <>{fallback&&<div className="walker-fallback" aria-hidden="true"/>}<canvas className="rope-walker-scene" ref={canvas} aria-hidden="true"/></>;
}


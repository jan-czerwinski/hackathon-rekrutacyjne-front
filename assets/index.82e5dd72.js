import{j as h,r as c,_ as y,R as N,a as v}from"./vendor.e7dc4b31.js";const I=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}};I();const s=h.exports.jsx,d=h.exports.jsxs;function S(){const[i,n]=c.exports.useState(),[l,a]=c.exports.useState(),e=c.exports.useRef(null),[t,o]=c.exports.useState(!1),[x,b]=c.exports.useState(0);return s("div",{className:"w-screen h-screen p-12 bg-blue-200",children:d("div",{className:"w-full h-full flex flex-col justify-between",children:[d("div",{className:"flex justify-around w-full h-4/5 my-auto",children:[s("div",{className:"w-1/2 h-full flex",children:l&&s("img",{className:"m-auto w-auto h-auto max-h-full object-contain shadow-md p-4 bg-white",src:l})}),s("div",{className:"w-1/2 h-full flex justify-center items-center",children:t?s(y,{color:"blue",size:120}):i&&s("img",{className:"m-auto w-auto h-auto max-h-full object-contain shadow-md p-4 bg-white",src:i})})]}),d("div",{className:"flex h-1/5 justify-around text-white text-3xl",children:[s("input",{onChange:()=>{var u;if(!((u=e.current)==null?void 0:u.files))return;const r=e.current.files[0],f=URL.createObjectURL(r);n(void 0),a(f)},type:"file",ref:e,accept:".png, .jpg, .jpeg",className:"hidden"}),s("button",{className:"m-6 w-1/4 rounded-xl bg-blue-300 shadow-md ",onClick:()=>{var r;return(r=e.current)==null?void 0:r.click()},children:"Upload png/jpeg/jpg image"}),i?d("span",{className:"grid place-content-center text-center w-1/4",children:["Total time: ",s("br",{}),x," ms"]}):s("button",{className:"m-6 w-1/4 rounded-xl bg-blue-300 shadow-md",onClick:async()=>{var g;o(!0);const r=performance.now(),f="https://europe-central2-optimistic-host-320114.cloudfunctions.net/detect-edges";if(!((g=e.current)==null?void 0:g.files))return;const u=e.current.files[0],p=new FormData;p.append("image",u);const m=await fetch(f,{method:"POST",body:p});if(!m.ok){console.error(m);return}const w=URL.createObjectURL(await m.blob()),j=performance.now();o(!1),b(j-r),n(w)},disabled:t,children:"Detect edges"})]})]})})}N.render(s(v.StrictMode,{children:s(S,{})}),document.getElementById("root"));
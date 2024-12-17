addEventListener("message",({data:e})=>{let s=r(e);postMessage(s)});function r(e){return e<=1?e:r(e-1)+r(e-2)}

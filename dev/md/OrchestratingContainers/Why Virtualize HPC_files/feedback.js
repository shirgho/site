!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}console.log("feedback.js: Last updated August 29, 2022 time 11:26 AM");var s,r="https://feedback.esp.vmware.com/api/feedback/v1",l=window["esp"],c=window["esp"]["feedback"]=window["esp"]["feedback"]||{};function d(e,t,n,i,o,s){c._callbacks=o,c._clientId=n.id,c._integration=s,c._configuration=i;var l=r+"/trigger-status";-1!=="feedback".indexOf("announcement")&&(l+="?recommendation=true"),console.log("IPF received the event for feedback");var d=new XMLHttpRequest;d.open("POST",l,!0),d.setRequestHeader("Content-Type","application/json"),i&&i.config.token&&d.setRequestHeader("Authorization","Bearer "+i.config.token),d.onreadystatechange=function(){if(4==d.readyState&&d.status<300){var e=JSON.parse(d.responseText);if(e.open)if(i&&i.config.pass_to_parent){var o=r.replace("/api/feedback/v1",""),s={result:e,config:a(a({},i),{},{clientId:n.id,clientName:n.name,feedbackUrl:o,feedbackHost:o,userId:t.id,userHash:t.hash})};i.config.metadata&&(s.config.metadata=i.config.metadata);var l={event:"feedback",data:s};window.parent.postMessage(l,"*")}else u(e.feature_url,e.position,t,n,i)}},e.client=n.id,e.user_id=t.hash,d.send(JSON.stringify(e))}function u(e,t,n,i,a,o){var s;if(p(s=i.id)&&localStorage.removeItem("esp-feedback-remindme-"+s),!document.getElementById("esp-feedback-iframe")){if(!t){var l=document.createElement("div");l.id="esp-feedback-modal",l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.bottom="0",l.style.right="0",l.style.display="flex",l.style.flexDirection="column",l.style.justifyContent="center",l.style.alignItems="center",l.style.padding="2rem",l.style.zIndex="999999999",document.body.appendChild(l);var c=document.createElement("div");c.id="esp-feedback-layer",c.style.position="fixed",c.style.top="0",c.style.left="0",c.style.bottom="0",c.style.right="0",c.style.backgroundColor="#303030",c.style.opacity="0.85",c.style.zIndex="1040",l.appendChild(c)}var d=document.createElement("div");if(d.id="esp-feedback-iframe",d.style.borderRadius="3px",a&&a.theme&&"dark"===a.theme?d.style.backgroundColor="#1b2a32":d.style.backgroundColor="white",d.style.zIndex="1050",t)if(d.style.display="none","bottom-right"==t||"top-right"==t||"bottom-left"==t||"top-left"==t)d.style.position="fixed",d.style.width="414px",d.style.maxWidth="98%",d.style.maxHeight="96%",d.style.boxShadow="0px 0px 10px 5px #ccc","top-left"==t?(d.style.top="2%",d.style.left="1%"):"top-right"==t?(d.style.top="2%",d.style.right="1%"):"bottom-right"==t?(d.style.bottom="2%",d.style.right="1%"):"bottom-left"==t&&(d.style.bottom="2%",d.style.left="1%"),document.body.appendChild(d);else{d.style.position="relative",d.style.zIndex="",d.style.maxHeight="100%";var u=document.querySelector(t);if(!u)return void console.log("Failed to locate element : "+t);u.appendChild(d)}else d.style.width="660px",d.style.height="240px",d.style.maxWidth="100%",d.style.maxHeight="100%",l.appendChild(d);var f=document.createElement("div");f.style.border="5px solid #d9d9d9",f.style.borderRadius="50%",f.style.borderLeft="5px solid #0072a3",f.style.position="absolute",f.style.width="72px",f.style.height="72px",f.style.left="50%",f.style.top="50%",f.style.marginLeft="-36px",f.style.marginTop="-36px",f.style.animation="spin 1s linear infinite",f.style.webkitAnimation="spin 1s linear infinite",f.style.zIndex="1050",d.appendChild(f);var m=document.createElement("iframe");m.style.display="none",m.style.border="0",m.style.borderRadius="3px",m.style.width="100%",m.style.height="100%",m.addEventListener("load",(function(){f.style.display="none",m.style.display="inline",d.style.display="block";var e=o?o.config.metadata:a.config.metadata;if(e){var t={type:"metadata",data:e};m.contentWindow.postMessage(t,r)}a&&a.config&&a.config.token&&m.contentWindow.postMessage({type:"token",data:a.config.token},r)})),m.src=function(e,t,n,i,a){var o=e;o+="&client_id="+(t&&t.client&&t.client.id?t.client.id:i.id),o+="&client_name="+encodeURIComponent(t&&t.client&&t.client.name?t.client.name:i.name),o+="&url="+encodeURIComponent(window.location.href),a&&a.theme&&(o+="&theme="+a.theme);var s=t&&t.lang?t.lang:a?a.lang:null;(s=s||navigator.language||navigator.userLanguage)&&(o+="&lang="+s);var r=t?t.user.id:n.id;return o+="&user_id="+encodeURIComponent(r),o+="&user_hash="+(t&&t.user&&t.user.hash?t.user.hash:n.hash)}(e,o,n,i,a),d.appendChild(m)}}function f(e){var t=document.getElementById("esp-feedback-iframe");t&&t.parentNode.removeChild(t);var n=document.getElementById("esp-feedback-modal");n&&n.parentNode.removeChild(n),c._callbacks&&c._callbacks.close&&c._callbacks.close({when:e.when?e.when:null,opt_out:!!e.opt_out&&e.opt_out})}function p(e){var t=localStorage.getItem("esp-feedback-remindme-"+e);return t?JSON.parse(t):null}c.handleEvent=d,c._configs=c._configs||{},c._configs.env&&(console.log("Feedback.js environment",c._configs.env),"prod"==c._configs.env?r="https://feedback.esp.vmware.com/api/feedback/v1":"stg"==c._configs.env?r="https://feedback.esp-staging.vmware-aws.com/api/feedback/v1":"dev"==c._configs.env&&(r="http://localhost:9000/api/feedback/v1")),window.addEventListener("message",(function(e){if("message"===e.type)try{var t=e.data;if("close"===t.event)setTimeout((function(){f(t.data)}),0);else if("resize"===t.event)setTimeout((function(){var e,n;e=t.data,(n=document.getElementById("esp-feedback-iframe"))&&(n.style.width=e.width,n.style.height=e.height)}),0);else if("submit"===t.event)setTimeout((function(){var e;e=t.data,c._callbacks&&c._callbacks.submit&&c._callbacks.submit({feedback:e||null,form_name:e.name?e.name:null,form_title:e.title?e.title:null})}),0);else if("feedback"===t.event){var n=t.data.result,i=t.data.config,a={id:i.userId,hash:i.userHash},o={id:i.clientId,name:i.clientName},r={user:a,client:o,config:i.config,lang:i.lang};u(n.feature_url,n.position,a,o,c._configuration,r)}else if("remindme"===t.event){var d=Date.now(),p=(n=t.data.result,t.data.config),m=60*n.timeout*1e3;n.timeout=d+m,s&&clearTimeout(s),s=l._configs&&l._configs.pass_to_parent?setTimeout(window.parent.postMessage.bind(this,{event:"feedback",data:t.data},"*"),m):setTimeout(u.bind(this,n.feature_url,n.position,p.user,p.client,c._configuration,p),m),function(e,t){localStorage.setItem("esp-feedback-remindme-"+e,JSON.stringify(t))}(p.client.id,t.data),f({when:"REMINDME_LATER"})}}catch(e){}}),!1),function(e){if(c.handleEvent=d,e&&e.length>0){console.log("processing feedback service queue",e);for(var t=0;t<e.length;t++){var n=e[t],i=n[0];c[i](n[1],n[2],n[3],n[4],n[5],n[6])}}}(c._q),function(){var e=function(){var e;l._segment&&analytics&&analytics._user?e=analytics._user.id():l._user&&(e=l._user.id);e||(e=localStorage.getItem("lumos-feedback-user"));return e}();if(l._clientId&&e){var t=p(l._clientId);if(t){var n=t.result,i=t.config;if(e!==i.user.id)return;var a=Date.now();n.timeout>a?s=l._configs&&l._configs.pass_to_parent?setTimeout(window.parent.postMessage.bind(this,{event:"feedback",data:t},"*"),n.timeout-a):setTimeout(u.bind(this,n.feature_url,n.position,i.user,i.client,l._configs,i),n.timeout-a):l._configs&&l._configs.pass_to_parent?window.postMessage({event:"feedback",data:t},"*"):u(n.featureUrl,n.position,i.user,i.client,l._configs,i)}}}()}]);
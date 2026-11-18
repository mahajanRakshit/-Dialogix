const KEY="dialogixMessages", messagesEl=document.getElementById("messages"), input=document.getElementById("messageInput");
let messages=[];try{messages=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(messages))messages=[]}catch{messages=[]}
function save(){localStorage.setItem(KEY,JSON.stringify(messages))}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){messagesEl.innerHTML=messages.map(m=>`<article class="row ${m.sender}">${m.sender==="assistant"?'<div class="msg-avatar">D</div>':""}<div class="wrap"><p class="meta">${m.sender==="user"?"You":"Dialogix Assistant"} · ${new Date(m.time).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}</p><div class="bubble">${safe(m.text)}</div></div>${m.sender==="user"?'<div class="msg-avatar">Y</div>':""}</article>`).join("");messagesEl.scrollTop=messagesEl.scrollHeight}
function add(text,sender){messages.push({text,sender,time:Date.now()});save();render()}
function reply(text){const t=text.toLowerCase();if(t.includes("what can you do")||t.includes("help")||t.includes("start"))return "I’m the Dialogix demo assistant. You can send messages, try suggested prompts, and explore this chat interface. This sample runs in your browser and is not connected to a live AI service.";if(t.includes("fun fact"))return "Here’s a fun fact: honey can remain preserved for a very long time when stored properly.";if(/\b(hi|hello|hey)\b/.test(t))return "Hello! Welcome to Dialogix. What would you like to talk about?";if(t.includes("thank"))return "You’re welcome! Feel free to send another message.";return "Thanks for your message! This is a front-end demonstration. You can customize the sample replies in js/app.js."}
function send(text){text=text.trim();if(!text)return;add(text,"user");input.value="";document.getElementById("suggestions").hidden=true;setTimeout(()=>add(reply(text),"assistant"),400)}
document.getElementById("messageForm").addEventListener("submit",e=>{e.preventDefault();send(input.value)});
document.getElementById("suggestions").addEventListener("click",e=>{if(e.target.tagName==="BUTTON")send(e.target.textContent)});
function clear(){if(messages.length&&!confirm("Clear this conversation?"))return;messages=[];save();render();document.getElementById("suggestions").hidden=false}
document.getElementById("clearChat").addEventListener("click",clear);
document.getElementById("newChat").addEventListener("click",clear);
render();

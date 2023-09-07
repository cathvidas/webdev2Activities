let msgSent = document.getElementById('sent-msg');
let msgInput = document.getElementById('msg-input');
let msgDiv = document.getElementById('display-msg');


function Msg(){
  if(msgInput.value!="" && msgInput.value!=" "){
  let msgEleDiv = document.createElement("div");
  let msgP = document.createElement("p");
  msgEleDiv.className = "msg-cov";
  msgEleDiv.appendChild(msgP);
  msgP.innerHTML = msgInput.value;
  msgDiv.appendChild(msgEleDiv);
  msgInput.value = "";
  }
}


function openChat(){
    document.getElementById("chat-box").style.display = "block";
    document.getElementById("chat-btn").style.display = "none"
}

function closeChat(){
   document.getElementById("chat-box").style.display = "none";
   document.getElementById("chat-btn").style.display = "block"
}

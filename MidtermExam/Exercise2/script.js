let container = document.getElementById('container');
let h = document.getElementById('height');
let w = document.getElementById('width');
let s = document.getElementById('urls');

function refresh(){ 
    container.style.height =  h.value;    
    container.style.width =  w.value; 
    container.src = s.value;
}


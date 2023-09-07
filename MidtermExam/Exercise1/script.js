function calc(){
    let input = document.getElementById("calc").value;
    let result = eval(input);
    document.getElementById("result").innerHTML = result;
}
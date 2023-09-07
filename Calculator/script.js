const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach((input) => {
  input.onclick = () => {
    if (input.id == "clear") {
      display.innerText = "";
    } else if (input.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != "" && input.id == "equal") {
      display.innerText = eval(display.innerText);
    } else if (display.innerText == "" && input.id == "equal") {
      display.innerText = "";
    } else {
      display.innerText += input.id;
    }
  };
});

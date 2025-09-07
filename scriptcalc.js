"use strict";
const calculator = document.querySelector(".calculator");
const btn = document.querySelectorAll("button");
const calcWide = document.querySelector(".calcWide");
const moneyConvert = document.querySelector(".moneyConvert");
const second = document.querySelector(".second");
/* === Expand and compact canculator size and functions === */
let calcWideChange = false;
calcWide.addEventListener("click", (e) => {
  //To expand calculator for more functions
  e.preventDefault();
  if (calcWideChange == false) {
    //Extra buttons when the calc expand
    second.innerHTML = `          
         <button class="trigo">2nd</button>
       <button>10<sup>x</sup></button>
        <button >(</button>
        <button >)</button>
        <button >AC</button>
        <button ><<</button>
        <button >+/-</button>
        <button >/</button>

        <button >1/x</button>
        <button>y<sup>x</sup></button>
        <button >x!</button>
        <button><sup>y</sup>&radic;x</button> 
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        
        <button class="sin">sin</button>
        <button class="cos">cos</button>
        <button class="tan">tan</button>
        <button >log</button>
        <button >4</button>
        <button >5</button>
        <button >6</button>
        <button >-</button>

        <button class="sinh">sinh</button>
        <button class="cosh">cosh</button>
        <button class="tanh">tanh</button>
        <button >ln</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>+</button>
        
        <button >+/-</button>
        <button >π</button>
        <button >e</button>
         <button>e<sup>x</sup></button>
        <button>%</button>
        <button>0</button>
        <button>.</button>
        <button>=</button>`;
    second.style.gridTemplateColumns = "repeat(8, 1fr)";
    calculator.style.maxWidth = "800px";
    const buttons = document.querySelectorAll("button");
    const disp = document.querySelector(".display");

    const mq = window.matchMedia("(max-width: 500px)"); //style change bellow 500px screen
    function applyChanges(e) {
      if (e.matches) {
        buttons.forEach((btn) => {
          btn.style.padding = "7px";
          btn.style.fontSize = "1rem";
        });
        disp.style.fontSize = "2rem";
        disp.style.height = "70px";
        disp.style.padding = "7px 12px";
      }
    }
    mq.addEventListener("change", applyChanges);
    applyChanges(mq); // run once at load
    calcWideChange = true;
  } else {
    //Function to return the calculator to ita normal state
    second.innerHTML = `
        <button >AC</button>
        <button ><<</button>
        <button >+/-</button>
        <button >/</button>

        <button >7</button>
        <button >8</button>
        <button >9</button>
        <button >*</button>

        <button >4</button>
        <button >5</button>
        <button >6</button>
        <button >-</button>

        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>

        <button >%</button>
        <button >0</button>
        <button >.</button>
        <button >=</button>`;
    second.style.gridTemplateColumns = "repeat(4, 1fr)";
    calculator.style.maxWidth = "400px";
    const buttons = document.querySelectorAll("button");
    const disp = document.querySelector(".display");
    const calc = document.querySelector(".calculator");
    const specialButton = document.querySelectorAll(".specialButton");
    const mq = window.matchMedia("(max-width: 500px)"); //style change bellow 500px screen
    function applyChanges(e) {
      if (e.matches) {
        buttons.forEach((btn) => {
          btn.style.padding = "15px";
          btn.style.fontSize = "1.2rem";
          calc.style.maxWidth = "300px";
        });
        disp.style.fontSize = "2rem";
        disp.style.height = "70px";
        disp.style.padding = "10px 15px";
        specialButton.forEach((btn) => {
          btn.style.padding = "5px";
        });
      }
    }
    mq.addEventListener("change", applyChanges);
    applyChanges(mq); // run once at load
    calcWideChange = false;
  }
});
let inverse = false;
second.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("trigo")) {
    const sec = document.querySelectorAll("button");
    if (!inverse) {
      sec.forEach((btn) => {
        if (btn.textContent === "sin") btn.textContent = "sin⁻¹";
        if (btn.textContent === "cos") btn.textContent = "cos⁻¹";
        if (btn.textContent === "tan") btn.textContent = "tan⁻¹";
        if (btn.textContent === "sinh") btn.textContent = "sinh⁻¹";
        if (btn.textContent === "cosh") btn.textContent = "cosh⁻¹";
        if (btn.textContent === "tanh") btn.textContent = "tanh⁻¹";
      });
      inverse = true;
    } else {
      sec.forEach((btn) => {
        if (btn.textContent === "sin⁻¹") btn.textContent = "sin";
        if (btn.textContent === "cos⁻¹") btn.textContent = "cos";
        if (btn.textContent === "tan⁻¹") btn.textContent = "tan";
        if (btn.textContent === "sinh⁻¹") btn.textContent = "sinh";
        if (btn.textContent === "cosh⁻¹") btn.textContent = "cosh";
        if (btn.textContent === "tanh⁻¹") btn.textContent = "tanh";
      });
      inverse = false;
    }
  }
});

// 🔹 Helper to replace user-friendly symbols with JS Math equivalents
function prepareExpression(expr) {
  if (expr === "Error") return "0";
  else
    return expr
      .replace(/π/g, "Math.PI") //
      .replace(/e/g, "Math.E") //
      .replace(/√/g, "Math.sqrt") //
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/sin⁻¹/g, "asin")
      .replace(/cos⁻¹/g, "acos")
      .replace(/tan⁻¹/g, "atan")
      .replace(/sinh⁻¹/g, "asinh")
      .replace(/cosh⁻¹/g, "acosh")
      .replace(/tanh⁻¹/g, "atanh")
      .replace(/([0-9]+)!/g, (match, n) => factorial(parseInt(n)))
      .replace(/\^/g, "**"); // allow exponentiation
}

// 🔹 Factorial function
function factorial(n) {
  if (n < 0) return NaN;
  return n <= 1 ? 1 : n * factorial(n - 1);
}
second.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const value = e.target.textContent;
    const display = document.querySelector(".display");
    if ("/*-+".includes(display.value.slice(-1)) && "/*-+".includes(value)) {
      //for prevent math sign display side by side
      display.value += value;
      display.value = display.value.slice(0, -1);
    } else if (value === "AC") {
      //to clear fullscreen
      display.value = "0";
    } else if (value === "<<") {
      //to backspace one no
      if (display.value.length === 1 || display.value === "Error") {
        display.value = "0";
      } else {
        display.value = display.value.slice(0, -1);
      }
    } else if (value === "=") {
      //Final step give ans
      try {
        let expr = prepareExpression(display.value);
        display.value = Function(`"use strict"; return (${expr})`)();
      } catch {
        display.value = "Error";
      }
    } else if (value === "") {
    } else if (value === "2nd") {
      //dont display 2nd
    } else if (value === "10x") {
      //to display 10^ in place of 10x
      if (display.value === "0" || display.value === "Error") {
        display.value = "10^";
      } else {
        display.value += "10^";
      }
    } else if (value === "1/x") {
      //to display ^-1 in place of 1/x
      if (display.value === "0" || display.value === "Error") {
        display.value = "0";
      } else {
        display.value += "^-1";
      }
    } else if (value === "yx") {
      // //to display ^ in place of yx calculate y^x
      if (display.value === "0" || display.value === "Error") {
        display.value = "0";
      } else {
        display.value += "^";
      }
    } else if (value === "ex") {
      // //to display ^ in place of ex calculate e^x
      if (display.value === "0" || display.value === "Error") {
        display.value = "e^";
      } else {
        display.value += "e^";
      }
    } else if (value === "x!") {
      //factorial !
      if (display.value === "0" || display.value === "Error") {
        display.value = "0";
      } else {
        display.value += "!";
      }
    } else if (value === "y√x") {
      //root √
      if (display.value === "0" || display.value === "Error") {
        display.value = "√";
      } else {
        display.value += "√";
      }
    } else if (
      value === "sin" ||
      value === "cos" ||
      value === "tan" ||
      value === "sin⁻¹" ||
      value === "cos⁻¹" ||
      value === "tan⁻¹" ||
      value === "sinh" ||
      value === "cosh" ||
      value === "tanh" ||
      value === "sinh⁻¹" ||
      value === "cosh⁻¹" ||
      value === "tanh⁻¹"
    ) {
      //root √
      if (display.value === "0" || display.value === "Error") {
        display.value = value+"(";
      } else {
        display.value += value+"(";
      }
    } else if (value === "+/-") {
      //change the sign
      let expr = display.value;

      let match = expr.match(/(\d+(\.\d+)?)$/);
      if (match) {
        let number = match[0];
        let start = expr.slice(0, -number.length);

        if (number.startsWith("-")) {
          number = number.slice(1);
        } else {
          number = "(-" + number + ")";
        }

        display.value = start + number;
      }
    } else {
      if (display.value === "0" || display.value === "Error") {
        display.value = value;
      } else {
        display.value += value;
      }
    }
  }
});

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const view = document.querySelector(".view");

function place() {
    if(view.lastChild.innerText == "0") {
        if(checkZero(this.innerText)) {
            view.removeChild(view.lastChild);
        }
    }
    let container = document.createElement("span");
    let content = document.createTextNode(this.innerText);
    container.appendChild(content);
    view.appendChild(container);
}

function operatorCheck() {
    if(view.lastChild.innerText == "*" || 
       view.lastChild.innerText == "/" || 
       view.lastChild.innerText == "+" || 
       view.lastChild.innerText == "-") {
        view.removeChild(view.lastChild);
    }
}

function empty() {
    view.innerHTML = `<span>0</span>`;
}

function seperate() {
    const arr = view.innerText.split("\n");
    let store = [];
    store[0] = 0;
    let i = 0;
    let change = 0;
    arr.forEach(atom => {
        if(atom == "*" ||
           atom == "/" ||
           atom == "+" ||
           atom == "-") {
            if(change == 0) {i++;}
            store[i] = atom
            change = 1;
        }
        else {
            if(change == 1) {i++;}
            if(store[i] == null) {store[i] = "";}
            if(store[i] == "0") {
                store[i] = atom;
                console.log(atom);
            }
            else {
                if(atom == ".") {
                    store[i] += "0";
                }
                store[i] += atom;
            }
            change = 0;
        }
    });
    let ans = calculate(store);
    console.log(store, ans);
    while(ans.length > 1) {
        ans = calculate(store);
    }
    empty();
    view.innerHTML = (ans[0] % 1 == 0)?ans[0]:ans[0].toFixed(5);
}

function calculate(atom) {
    let ans = 0;
    if(atom[2]) {
        switch(atom[1]) {
            case "*": {
                ans = parseFloat(atom[0]) * parseFloat(atom[2]);
                break;
            }
            case "/": {
                ans = parseFloat(atom[0]) / parseFloat(atom[2]);
                break;
            }
            case "+": {
                ans = parseFloat(atom[0]) + parseFloat(atom[2]);
                break;
            }
            case "-": {
                ans = parseFloat(atom[0]) - parseFloat(atom[2]);
                break;
            }
            default: {
                ans = atom[0];
            }
        }
    }
    else {
        ans = atom[0];
    }
    atom.shift();
    atom.shift();
    atom[0] = ans;
    return atom;
}

function checkZero(x) {
    if(x == "." ||
       x == "*" ||
       x == "/" ||
       x == "+" ||
       x == "-") {
        return false;
    }
    else {
        return true;
    }
}

numbers.forEach(number => number.addEventListener("click", place));
operators.forEach(operator => {
    operator.addEventListener("click", operatorCheck);
    operator.addEventListener("click", place);
});
clear.addEventListener("click", empty);
equal.addEventListener("click", seperate);
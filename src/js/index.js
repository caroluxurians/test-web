
let counter = 0;

const counterValue = document.getElementById("counterValue");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const resetButton = document.getElementById("resetButton");

plus.addEventListener("click", function plusOne() {
    counter++;
    counterValue.innerHTML = counter;
});

minus.addEventListener("click", function minusOne() {
    counter--;
    counterValue.innerHTML = counter;
});

resetButton.addEventListener("click", reset);

function reset() {
    counter = 0;
    counterValue.innerHTML = counter;
}
/* DOM Get Elements */
const billInput = document.getElementById("Bill");
const tipGrid = document.getElementById("tipGrid");
const buttonGrid = tipGrid.querySelectorAll("button");
const numberOfPeopleInput = document.getElementById("NumberOfPeople");
const tipTotal = document.getElementById("tipTotal");
const totalPrice = document.getElementById("totalPrice");
const resetBtn = document.getElementById("resetBtn");
const customPercent = document.getElementById("Custom%");
const errorMessage = document.getElementById("caption");

/* Global Variables */
let tipPercent = 10;
let billPrice = 0;
let numberOfPeople = 0;

/* Tip Button grid functionality */
for(const button of buttonGrid) {
    button.addEventListener("click",(e) => {
        tipPercent = parseInt(button.textContent);

        clearActiveBtns()
        customPercent.value = "";
        e.target.classList.add("active")

        updateTotals()
    })
};

/* Bill Input Functionality */
billInput.addEventListener("input", () => {
    billPrice = Number(billInput.value) ? Number(billInput.value) : 0;
    
    updateTotals()
});

/* Number of people Functionality and validation */
numberOfPeopleInput.addEventListener("input", () => {
    numberOfPeopleInput.classList.remove("error");
    errorMessage.textContent = "";

    /* Max value and NaN Validation */
    numberOfPeople = Number(numberOfPeopleInput.value) ?
    Number(numberOfPeopleInput.value) >= 100 ?
    100 : Number(numberOfPeopleInput.value) 
    : 0;

    /* No 0 Validation */
    if (numberOfPeople === 0) {
        errorMessage.textContent = "Can't be zero.";
        numberOfPeopleInput.classList.add("error");
    }

    numberOfPeopleInput.value = numberOfPeople; 

    updateTotals()
});

/* Custom % Input */
customPercent.addEventListener("input", () => {
    clearActiveBtns()

    tipPercent = customPercent.value;

    updateTotals()
});

/* Reset Button Functionality -- Only Active after updateTotals function */ 
function resetBtnEvent () {
    resetBtn.addEventListener ("click", () => {
        billInput.value = "";
        customPercent.value = "";
        numberOfPeopleInput.value ="";
        billPrice = 0;
        numberOfPeople = 0;

        totalZero()

         resetBtn.classList.add("inactive")
    })
}

/* Formats numbers to have periods between thousands i.e: 1000000 => 1.000.000 */
function numberFormat (number) {
   const formatedNum = new Intl.NumberFormat("de-DE").format(number);

   /* Format only Happens if it's not 0 */
   if (formatedNum && formatedNum !== 0) {
    return formatedNum
   }

    totalZero()
};

/* Calculates, Formats and updates both Totals */
function updateTotals () {
    let tipPerson = (billPrice * (tipPercent/100)) / numberOfPeople;
    let TotalPerson = ((billPrice * (tipPercent/100)) + billPrice)/ numberOfPeople;

    /* Only updates if number not 0, format function breaks with 0 */
    if (numberOfPeople !== 0) {
    tipTotal.textContent = `$${numberFormat(tipPerson)}`
    totalPrice.textContent = `$${numberFormat(TotalPerson)}`

        /* If Total number is to big, change to exponential notation */
        if (TotalPerson > 10000000) {
        tipPerson = expo(tipPerson, 2)
        TotalPerson = expo(TotalPerson, 2)

        tipTotal.textContent = `$${tipPerson}`
        totalPrice.textContent = `$${TotalPerson}`
        }
    }
    /* If total is 0, update to "0.00" */
    else {
        totalZero()
    }

    /* If total is not 0, activate reset button */
    if (TotalPerson !== 0) {
        resetBtn.classList.remove("inactive")
        resetBtnEvent()
    }
};

/* Deselects all tip buttons */
function clearActiveBtns () {
    for(const b of buttonGrid) {b.classList.remove("active")}
};

/* Exponential Formating */
function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
};

/* Sets Totals to 0.00 */
function totalZero() {
    tipTotal.textContent = `$0.00`;
    totalPrice.textContent = `$0.00`;
}
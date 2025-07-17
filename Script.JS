const billInput = document.getElementById("Bill");
const tipGrid = document.getElementById("tipGrid");
const buttonGrid = tipGrid.querySelectorAll("button");
const numberOfPeopleInput = document.getElementById("NumberOfPeople");
const tipTotal = document.getElementById("tipTotal");
const totalPrice = document.getElementById("totalPrice");
const resetBtn = document.getElementById("resetBtn");
const customPercent = document.getElementById("Custom%");
const errorMessage = document.getElementById("caption");


let tipPercent = 10;
let billPrice = 0;
let numberOfPeople = 0;

for(const button of buttonGrid) {
    button.addEventListener("click",(e) => {
        tipPercent = parseInt(button.textContent);

        clearActiveBtns()
        customPercent.value = "";
        e.target.classList.add("active")

        updateTotals()
    })
};


billInput.addEventListener("input", () => {
    billPrice = Number(billInput.value) ? Number(billInput.value) : 0;
    
    updateTotals()
});

numberOfPeopleInput.addEventListener("input", () => {
    numberOfPeopleInput.classList.remove("error");
    errorMessage.textContent = "";

    numberOfPeople = Number(numberOfPeopleInput.value) ?
    Number(numberOfPeopleInput.value) >= 100 ?
    100 : Number(numberOfPeopleInput.value) 
    : 0;

    if (numberOfPeople === 0) {
        errorMessage.textContent = "Can't be zero.";
        numberOfPeopleInput.classList.add("error");
    }

    numberOfPeopleInput.value = numberOfPeople; 

    updateTotals()
});

customPercent.addEventListener("input", () => {
    clearActiveBtns()

    tipPercent = customPercent.value;

    updateTotals()
});

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

function numberFormat (number) {
   const formatedNum = new Intl.NumberFormat("de-DE").format(number);
   if (formatedNum && formatedNum !== 0) {
    return formatedNum
   }

    totalZero()
};

function updateTotals () {
    let tipPerson = (billPrice * (tipPercent/100)) / numberOfPeople;
    let TotalPerson = ((billPrice * (tipPercent/100)) + billPrice)/ numberOfPeople;

    if (numberOfPeople !== 0) {
    tipTotal.textContent = `$${numberFormat(tipPerson)}`
    totalPrice.textContent = `$${numberFormat(TotalPerson)}`

        if (TotalPerson > 100000000) {
        tipPerson = expo(tipPerson, 2)
        TotalPerson = expo(TotalPerson, 2)

        tipTotal.textContent = `$${tipPerson}`
        totalPrice.textContent = `$${TotalPerson}`
        }
        else {
            console.log(TotalPerson)
        }
    }
    else {
        totalZero()
    }

    if (TotalPerson !== 0) {
        resetBtn.classList.remove("inactive")
        resetBtnEvent()
    }
};

function clearActiveBtns () {
    for(const b of buttonGrid) {b.classList.remove("active")}
};

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
};

function totalZero() {
    tipTotal.textContent = `$0.00`;
    totalPrice.textContent = `$0.00`;
}
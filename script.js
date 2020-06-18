//select elements

const balance = document.querySelector('.value');
const incomeTotal = document.querySelector('.income-total');
const outcomeTotal = document.querySelector('.outcome-total');

const expencessBtn = document.querySelector('.tab-1');
const incomeBtn = document.querySelector('.tab-2');
const allBtn = document.querySelector('.tab-3');

const expenseEl = document.querySelector('#expencess');
const incomeEl = document.querySelector('#income');
const allEl = document.querySelector('#all');

const expenseList = document.querySelector('#expencess .list');
const incomeList = document.querySelector('#income .list');
const allList = document.querySelector('#all .list');

const incomeTitle = document.querySelector('#income-title-input');
const incomeAmount = document.querySelector('#income-amount-input');
const addIncome = document.querySelector('.add-income');

const expenseTitle = document.querySelector('#expense-title-input');
const expenseAmount = document.querySelector('#expense-amount-input');
const addExpense = document.querySelector('.add-expense');


function active(element) {
    element.classList.add('active')
}

function nonActive(elementsArray) {
    elementsArray.forEach(element => {
        element.classList.remove('active')
    });
}

function hide(elementsArray) {
    elementsArray.forEach(element => {
        element.classList.add('hide')
    })
}

function show(element) {
    element.classList.remove('hide')
}


expencessBtn.addEventListener('click', function () {
    active(expencessBtn);
    nonActive([incomeBtn, allBtn])
    hide([incomeEl, allEl]);
    show(expenseEl)

})

incomeBtn.addEventListener('click', function () {
    active(incomeBtn);
    nonActive([expencessBtn, allBtn]);
    show(incomeEl)
    hide([expenseEl, allEl])
})

allBtn.addEventListener('click', function () {
    active(allBtn);
    nonActive([expencessBtn, incomeBtn]);
    show(allEl);
    hide([expenseEl, incomeEl])
})

let ENTRY_LIST = [];

function clearInputs(inputsArr) {
    inputsArr.forEach(input => input.value = '')
}

addIncome.addEventListener('click', function () {

    if (!incomeTitle.value || !incomeAmount.value) return

    let income = {
        type: 'income',
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value),
    }

    ENTRY_LIST.push(income);
    console.log(ENTRY_LIST);

    clearInputs([incomeTitle, incomeAmount])
})

addExpense.addEventListener('click', function () {

    if (!expenseTitle.value || !expenseAmount.value) return

    let expense = {
        type: 'expense',
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }

    ENTRY_LIST.push(expense);
    console.log(ENTRY_LIST);

    clearInputs([expenseTitle, expenseAmount])

})


function calculateTotal(type, ENTRY_LIST){

    let sum = 0;

    ENTRY_LIST.forEach(element => {
        if (element.type === type) {
            sum+= element.amount
        }    
    })

    return sum
}


function calculateBalance(income, outcome) {
    return income - outcome
}


let income = calculateTotal(income, ENTRY_LIST);
let outcome = calculateTotal(expense, ENTRY_LIST);
let balance = calculateBalance(income, outcome);

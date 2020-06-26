//select elements

const balanceValue = document.querySelector('.value');
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

    clearInputs([incomeTitle, incomeAmount]);
    updateUi()
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

    clearInputs([expenseTitle, expenseAmount]);
    updateUi()

})

function calculateTotal(type, ENTRY_LIST) {

    let sum = 0;

    ENTRY_LIST.forEach(element => {
        if (element.type === type) {
            sum += element.amount
        }
    })

    return sum
}


function calculateBalance(income, outcome) {
    return income - outcome
}

function updateUi() {

    let income = calculateTotal("income", ENTRY_LIST);
    let outcome = calculateTotal("expense", ENTRY_LIST);
    let balance = Math.abs(calculateBalance(income, outcome));
    const sign = (outcome > income) ? "-$" : "$";

    incomeTotal.innerHTML = `<small>$</small>${income}`;
    outcomeTotal.innerHTML = `<small>$</small>${outcome}`;;
    balanceValue.innerHTML = `${sign}${balance}`;

    clearElement([incomeList, expenseList, allList]);


    ENTRY_LIST.forEach((entry, index) => {


        if (entry.type === 'income') {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index);
        } else if (entry.type === 'expense') {
            showEntry(expenseList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index);

    })
}

function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = '';

    })
}


function showEntry(list, type, title, amount, id) {


    const entry =
        `<li class="${type}" id="${id}">
            <div class="entry">${title}: $${amount}</div>
            <div id="edit"></div>
            <div id="delete"></div>
         <li>`

    const position = "afterbegin";


    list.insertAdjacentHTML(position, entry)
}


incomeList.addEventListener('click', deleteOrEdit);
expenseList.addEventListener('click', deleteOrEdit);
allList.addEventListener('click', deleteOrEdit);

function deleteOrEdit(e) {

    let targetBtn = e.target;
    let ENTRY = targetBtn.parentNode;

    if (targetBtn.id === "edit") {
        editEntry(ENTRY)
    } else if (targetBtn.id === "delete") {
        deleteEntry(ENTRY);
        updateUi()
    }

}


function deleteEntry(ENTRY) {
    ENTRY_LIST.splice(ENTRY.id, 1)
}

function editEntry(ENTRY) {

    if (ENTRY.className === 'income') {
        incomeTitle.value = ENTRY_LIST[ENTRY.id].title;
        incomeAmount.value = ENTRY_LIST[ENTRY.id].amount;
        updateUi()
        deleteEntry(ENTRY)
    } else if (ENTRY.className === 'expense') {
        expenseTitle.value = ENTRY_LIST[ENTRY.id].title;
        expenseAmount.value = ENTRY_LIST[ENTRY.id].amount;
        updateUi()
        deleteEntry(ENTRY)
    } else {
        return
    }

}
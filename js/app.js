const income = [
    new Income('Salario', 2100.00),
    new Income('Venta conche', 1500.00)
];

const egress = [
    new Egress('Renta departamento', 900.00),
    new Egress('Ropa', 400.00)
];

let loadApp = () => {
    loadheadboard();
    loadIncome();
}
let totalIncome = () => {
    let totalEntry = 0;
    for(let entry of income){
        totalEntry += entry.value;
    }
    return totalEntry;
}

let totalEgresses = () => {
    let totalEgress = 0;
    for(let output of egress){
        totalEgress += output.value;
    }
    return totalEgress;

}
let loadheadboard = () => {
    let budget = totalIncome() - totalEgresses();
    let percentageEgress = totalEgresses()/totalIncome();
    document.getElementById('budget').innerHTML = currencyFormat(budget);
    document.getElementById('percentage').innerHTML = percentageFormat(percentageEgress);
    document.getElementById('income').innerHTML = currencyFormat(totalIncome());
    document.getElementById('egress').innerHTML = currencyFormat(totalEgresses());
}

const currencyFormat = (value) => {
    return value.toLocaleString('en-US',{style:'currency', currency: 'USD', minimumFractionDigits:2});
}

const percentageFormat = (value) => {
    return value.toLocaleString('en-US',{style: 'percent', minimumFractionDigits:2})
}

const loadIncome = () => {
    let incomeHTML = '';
    for(let entry of income){
        incomeHTML += createIncomeHTML(entry);
    }
    document.getElementById('list-income').innerHTML = incomeHTML;
}
const createIncomeHTML = (entry) => {
    let incomeHTML = `
    <div class="element clearStyles">
    <div class="element_description">${entry.description}</div>
    <div class="right clearStyles">
        <div class="element_value">${currencyFormat(entry.value)}</div>
        <div class="element_delet">
            <button class="element_delet--btn">
                <ion-icon name='close-circle-outline'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return incomeHTML;
}
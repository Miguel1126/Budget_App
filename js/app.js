const income = [
    new Income('Salario', 2100.00),
    new Income('Venta conche', 1500.00)
];

const egresses = [
    new Egress('Renta departamento', 900.00),
    new Egress('Ropa', 400.00),
    new Egress('Gastos operativos',1000.00)
];

let loadApp = () => {
    loadheadboard();
    loadIncome();
    loadEgresses();
    
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
    for(let egress of egresses){
        totalEgress += egress.value;
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
const loadEgresses = () => {
    let egressesHTML = '';
    for(let egress of egresses){
        egressesHTML += createEgressesHTML(egress);
    }
    document.getElementById('list-egress').innerHTML = egressesHTML;
}
const createEgressesHTML = (egress) => {
    let egressesHTML = `
    <div class="element clearStyles">
    <div class="element_description">${egress.description}</div>
    <div class="right clearStyles">
        <div class="element_value">- ${currencyFormat(egress.value)}</div>
        <div class="element_percentage">${percentageFormat(egress.value/totalEgresses())}</div>
        <div class="element_delet">
            <button class="element_delet--btn">
                <ion-icon name='close-circle-outline'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egressesHTML;
}

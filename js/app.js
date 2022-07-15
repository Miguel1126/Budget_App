const income = [
    new Income('Salario', 2100.00),
    new Income('Venta conche', 1500.00)
];
console.log(income);

const egresses = [
    new Egress('Renta departamento', 900.00),
    new Egress('Ropa', 400.00),
    new Egress('Gastos operativos',1000.00)
];
console.log(egresses);

let loadApp = () => {
    loadHeadboard();
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
let loadHeadboard = () => {
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
        <div class="element_delete">
            <button class="element_delete--btn">
                <ion-icon name='close-circle-outline' onclick="deleteIncome(${income.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return incomeHTML;
}

const deleteIncome = (id) => {
    let indexDelete = income.findIndex(income => {income.id === id});
    income.splice(indexDelete, 1);
    loadHeadboard();
    loadIncome();
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
        <div class="element_delete">
            <button class="element_delete--btn">
                <ion-icon name='close-circle-outline' onclick="deleteEgress(${egresses.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egressesHTML;
}
const deleteEgress = (id) => {
    let indexDelete = egresses.findIndex(egresses => {egresses.id === id});
    egresses.splice(indexDelete, 1);
    loadHeadboard();
    loadEgresses();
}

let addData = () => {
    let form = document.forms['form'];
    let type = form['type'];
    let description = form['description'];
    let value = form['value'];
    if(description.value !== '' && value.value !== ''){
        if(type.value === 'income'){
            income.push(new Income(description.value, +value.value));
            loadHeadboard();
            loadIncome();
        }else if(type.value === 'egresses'){
            egresses.push(new Egress(description.value, +value.value));
            loadHeadboard();
            loadEgresses();
        }
    }
}
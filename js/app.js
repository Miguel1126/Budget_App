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
    document.getElementById('budget').innerHTML = coinFormat(budget);
    document.getElementById('percentage').innerHTML = percentageFormat(percentageEgress);
    document.getElementById('income').innerHTML = coinFormat(totalIncome());
    document.getElementById('egress').innerHTML = coinFormat(totalEgresses());
}

const coinFormat = (value) => {
    return value.toLocaleString('en-US',{style:'currency', currency: 'USD', minimumFractionDigits:2});
}

const percentageFormat = (value) => {
    return value.toLocaleString('en-US',{style: 'percent', minimumFractionDigits:2})
}

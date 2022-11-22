const form = document.getElementById('transactionForm')


form.addEventListener('submit' , function(e) {
    e.preventDefault()
    if(form.transactionMonto.value > 0){
        let transactionFormData = new FormData(form)
        let transactionObj = convertFormDataToTransactionObj(transactionFormData)
        saveTransactionObj(transactionObj)
        insertRowInTransactionTable(transactionObj)
        form.reset()
    }
    else {
        alert("Estas ingresando un monto menor a 0")
    }
})

function draw_category() {
    let allCategories = [
        "Verdura", "Comida", "Bebida", "Trabajo", "Limpieza", "Informatica", "Antojos"
    ]
    for (let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index])
    }
}

function insertCategory(categoryName){
    const selectElement = document.getElementById("transactionCategoria")
    let htmlToInsert = `<option> ${categoryName} </option>`
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)
}

document.addEventListener('DOMContentLoaded', function(e) {
    draw_category()
    let transactionObjarr = JSON.parse(localStorage.getItem("TransactionData"))
    transactionObjarr.forEach(
        function(arrayElement) {
            insertRowInTransactionTable(arrayElement)
        }
    )

})

function getNewTransactionId(){
    let lasTransactionId = localStorage.getItem("lasTransactionId") || "-1"
    let newTransactionId = JSON.parse(lasTransactionId) + 1
    localStorage.setItem("lasTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId
}
//Le paso como parametro el transactionId de la transaccion que quiero eliminar 
function deleteTransactionObj(transactionId){
    //Obtengo las transaccion de mi "base de datos" (Desconvierto de json a objeto)
    let transactionObjarr = JSON.parse(localStorage.getItem("TransactionData"))
    //Busco el indice / la posicion de la transaccion que quiero eliminar
    let transactionIndexInArray = transactionObjarr.find(element => element.id === transactionObjarr)
    //Elimino el eleemento de esa posicion
    transactionObjarr.splice(transactionIndexInArray, 1)
    //Convierto de objeto a formato JSON
    let transactionArrayJSON = JSON.stringify(transactionObjarr)
    //Guardo mi array de transaccion en formato JSON en el local storage
    localStorage.setItem("TransactionData", transactionArrayJSON)
}

function convertFormDataToTransactionObj(transactionFormData){
    let transactionType = transactionFormData.get("transactionType")
    let transactionDescription = transactionFormData.get("transactionDescription")
    let transactionMonto = transactionFormData.get("transactionMonto")
    let transactionCategoria = transactionFormData.get("transactionCategoria")
    let transactionId = getNewTransactionId()
    return {
        "transactionType": transactionType,
        "transactionDescription": transactionDescription,

        "transactionMonto": transactionMonto,
        "transactionCategoria": transactionCategoria,
        "transactionId": transactionId
    }
}

function insertRowInTransactionTable(transactionObj){

    let transactionTableRef = document.getElementById("transactionTable")

    let newTransactionRowRef = transactionTableRef.insertRow(-1)
    newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"])

    let newTypeCellRef = newTransactionRowRef.insertCell(0) 
    newTypeCellRef.textContent = transactionObj["transactionType"]

    newTypeCellRef = newTransactionRowRef.insertCell(1); 
    newTypeCellRef.textContent = transactionObj["transactionDescription"]

    newTypeCellRef = newTransactionRowRef.insertCell(2) 
    newTypeCellRef.textContent = transactionObj["transactionMonto"]

    newTypeCellRef = newTransactionRowRef.insertCell(3) 
    newTypeCellRef.textContent = transactionObj["transactionCategoria"]

    let newDeleteCell = newTransactionRowRef.insertCell(4)
    let deleteButton = document.createElement("i")
    // deleteButton.className = "btn waves-effect waves-light"
    deleteButton.className = "material-icons"
    deleteButton.textContent = "delete"
    newDeleteCell.appendChild(deleteButton)

    newTransactionRowRef

    deleteButton.addEventListener("click", (e) => {
        let transactionRow = e.target.parentNode.parentNode
        let transactionId = transactionRow.getAttribute("data-transaction-id")
        transactionRow.remove()
        deleteTransactionObj(transactionId);
    })
}

function saveTransactionObj(transactionObj){

    let myTransactionArray = JSON.parse(localStorage.getItem("TransactionData")) || [] //array vacio
    myTransactionArray.push(transactionObj)
    //Convierto mi array de transaccion a json
    let transactionArrayJSON = JSON.stringify(myTransactionArray)
    //Guardo mi array de transaccion en formato JSON en el localstorage
    localStorage.setItem("TransactionData",transactionArrayJSON) 
}  
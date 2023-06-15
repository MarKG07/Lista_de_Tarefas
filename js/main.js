const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

tarefas.forEach((elemento) => {
    criaTarefa(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const tarefa = evento.target.elements['tarefa']
    const existe = tarefas.find(elemento => elemento.tarefa === tarefa.value)

    const tarefaAtual = {
        "tarefa": tarefa.value
    }

    if (tarefa.value == "") {
        alert("Elemento está vazio")
    } else {

        if (existe) {
            alert("Elemento já existe")
        } else {
            tarefaAtual.id = tarefas[tarefas.length - 1] ? (tarefas[tarefas.length - 1].id) + 1 : 0
            console.log(tarefaAtual.id)
            
            criaTarefa(tarefaAtual)
            tarefas.push(tarefaAtual)
        }
    }


    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    tarefa.value = ""

})

function criaTarefa(item) {
    const novoItem = document.createElement("li")
    novoItem.innerHTML = item.tarefa
    novoItem.dataset.id = item.id
    novoItem.classList.add("item")

    const btnDel = btnDelete(item.id)
    btnDel.classList.add("delete")
    novoItem.append(btnDel)

    lista.appendChild(novoItem)
}

function btnDelete(id) {
    const btnDelete = document.createElement("button")
    btnDelete.innerText = "X"

    btnDelete.addEventListener("click", function () {
        deletaTarefa(this.parentNode, id)
    })

    return btnDelete
}

function deletaTarefa(tag, id) {
    tag.remove()
    tarefas.splice(tarefas.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}
let historico = [];
const historicoMax = 4;

function insert(value) {
    document.getElementById("resultado").value += value;
}

function limpar() {
    document.getElementById("resultado").value = "";
}

function apagar() {
    let resultado = document.getElementById("resultado").value;
    document.getElementById("resultado").value = resultado.slice(0, -1);
}

function calcular() {
    let operacao = document.getElementById("resultado").value;
    let resultado;

    
    let expressaoEval = operacao.replace('x', '*');

    try {
        resultado = eval(expressaoEval); 
        document.getElementById("resultado").value = resultado; 
    } catch (erro) {
        document.getElementById("resultado").value = "Erro";
        return;
    }

  
    let horario = new Date().toLocaleTimeString();
    let novaOperacao = `${horario} - ${operacao} = ${resultado}`;
    historico.push(novaOperacao);

    if (historico.length > historicoMax) {
        historico.shift(); 
    }

    atualizarHistorico(); 
}

function atualizarHistorico() { 
    const historicoLista = document.getElementById("historicoLista");
    historicoLista.innerHTML = ''; 

    historico.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        li.onclick = () => usarHistorico(item);
        historicoLista.appendChild(li);
    });
}

function usarHistorico(operacao) {
    let expressao = operacao.split(" - ")[1].split(" = ")[0]; // Extrai a expressão da operação clicada
    document.getElementById("resultado").value = expressao;
}
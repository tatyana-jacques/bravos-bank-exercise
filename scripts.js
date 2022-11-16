
class ContaBancaria {
    constructor(agencia, numeroConta, saldo){
    this.agencia = agencia
    this.numeroConta = numeroConta
    this.saldo = saldo
    this.operacoes = [] 
    }

    debitar (valor) {
        if (valor > this.saldo){
        return false
        }
        this.saldo -= valor
        const lancamento = new Lancamento ('débito', valor)
        this.operacoes.push(lancamento)
        return true 
    }

    creditar (valor) {
        this.saldo +=valor
        const lancamento = new Lancamento ("crédito", valor)
        this.operacoes.push (lancamento)

    }

    gerarExtrato (){
        const extrato = []
        for (let i=0; i<this.operacoes.length; i++){
        const operacao = this.operacoes[i]
        const formatada = `Data: ${operacao.data.toLocaleString('pt-BR')} - ${operacao.tipo} - R$ ${operacao.valor}`
        extrato.push(formatada)
        }
        return extrato
    }
     
}

class Lancamento {
    constructor (tipo, valor){
        this.tipo = tipo
        this.valor = valor
        this.data = new Date () //data atual
    }

}

var conta = new ContaBancaria(1212, 333, 1000);

// controller: interação com UI
function efetuarOperacao(acao) {
    let valor = obterValor()

    if (acao!=='saldo' && acao !== 'extrato'){
        //validar o valor de entrada
        const isValido = validar (valor)
        if (!isValido){
            return
        }
        valor = parseFloat(valor) //convertendo de string para numérico fracionário
    }

    switch (acao){
        case 'sacar':
            sacar (valor)
            break    

        case 'saldo':
            imprimirTela('saldo')
            break

        case 'depositar':
            conta.creditar(valor);
            imprimirTela('depositar')
           
            break
        case 'extrato':
           consultarExtrato()
            break
            default:
 
}

limparValor()

}

function sacar (valor){
    const sucesso = conta.debitar(valor)
    if (sucesso){
        imprimirTela('sacar')
    }
    else{
        imprimirTela('naoSacar')
        
    }
}

function consultarExtrato(){
    const extrato = conta.gerarExtrato()
    let formatado = ""
    for (let i =0; i<extrato.length; i++){
        formatado +=extrato[i] + '\n'
    }
    const texto3 = document.getElementById ("saidaCinza")
    texto3.innerHTML = formatado
}


function obterValor() {
    const input = document.querySelector("#valor");
    const valor = input.value;
    return valor;
}

function limparValor() {
    const input = document.querySelector("#valor");
    input.value = "";
}

function limparSaida() {
    const saida = document.querySelector("#saida");
    while(saida.hasChildNodes()) {
        saida.removeChild(saida.lastChild);
    }
}

function validar(valor) {
    if (!valor || valor.length === 0) {
       imprimirTela('naoPreenchido')
        return false;
    }
    const regex = /^[0-9]*\.?[0-9]*$/;
    const isNumerico = valor.match(regex);
    if (!isNumerico) {
        imprimirTela('naoNumerico')
        return false;
    }
    if (parseFloat(valor) === 0) {
        imprimirTela('zero')
        return false;
    }
    return true;
}

function imprimirTela (acao){
    const texto = document.getElementById ("saida") 
    const texto2 = document.getElementById ("saidaVermelha") 
   
    switch (acao){

        case 'sacar':
            texto.innerHTML = 'Saque efetuado com sucesso.'
            break   
            
        case 'naoSacar':
            texto2.innerHTML = 'Saldo insuficiente.'
            break 

        case 'saldo':
            texto.innerText = `O saldo atual é ${conta.saldo}.`
            break

        case 'depositar':
            texto.innerText = 'Depósito realizado com sucesso!'
            break

        case 'naoPreenchido':
            texto2.innerHTML = 'Valor do depósito não preenchido!'
            break
        
        case 'naoNumerico':
            texto2.innerHTML = 'Valor deve ser numérico, parte fracionária separada por ponto e ser maior que zero!'; 
            break

        case 'zero':
            texto2.innerHTML = 'O valor não pode ser zero!'
            break

        default: 
            texto2.innerHTML =  'Operacao não reconhecida'       
    
}  
       
    setTimeout (()=>{ 
        texto.innerHTML = null
        texto2.innerHTML= null },4000)
}





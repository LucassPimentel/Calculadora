let btnsNumeros = document.querySelectorAll("[id*=btn]");
let operadores = document.querySelectorAll("[id*=operador]");
let display = document.querySelector(".display");
let novoNumero = true;
let operador;
let numerosAnterior;

const operacaoPendente = () => operador != undefined;
const calcular = () => {
  if (operacaoPendente()) {
    const numAtual = parseFloat(display.textContent);
    novoNumero = true;
    const resultado = eval(`${numerosAnterior}${operador}${numAtual}`);
    atualizarDisplay(resultado);
  }
};
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    display.textContent += texto;
  }
};

const inserirNumero = (evento) => {
  atualizarDisplay(evento.target.textContent);
};

btnsNumeros.forEach((numero) =>
  numero.addEventListener("click", inserirNumero)
);

const selecionarOperador = (evento) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numerosAnterior = parseFloat(display.textContent);
  }
};

operadores.forEach((operador) =>
  operador.addEventListener("click", selecionarOperador)
);

document.getElementById("sinal-igual").addEventListener("click", () => {
  calcular();
  operador = undefined;
});

document.getElementById("limpar-display").addEventListener("click", () => {
  display.textContent = "";
});

document.getElementById("limpar-tudo").addEventListener("click", () => {
  display.textContent = "";
  operador = undefined;
  novoNumero = true;
  numerosAnterior = undefined;
});

document.getElementById("inverter-sinal").addEventListener("click", () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
});

const possuiDecimal = () => display.textContent.indexOf(".") !== -1;

document.getElementById("decimal").addEventListener("click", () => {
  if (!possuiDecimal()) {
    if (display.textContent != 0) {
      atualizarDisplay(".");
    } else {
      atualizarDisplay("0.");
    }
  }
});

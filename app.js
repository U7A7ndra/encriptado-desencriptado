class Encriptador {
  constructor(logicaEncriptador) {
    this.logicaEncriptador = logicaEncriptador;
  }

  encriptar(texto) {
    let textoEncriptado = "";
    for (let i = 0; i < texto.length; i++) {
      let caracter = texto[i];
      if (this.esCaracterValido(caracter)) {
        if (this.logicaEncriptador[caracter]) {
          textoEncriptado += this.logicaEncriptador[caracter];
        } else {
          textoEncriptado += caracter;
        }
      }
    }

    return textoEncriptado;
  }

  desencriptar(texto) {
    let textoDesencriptado = texto;

    for (let letra in this.logicaEncriptador) {
      let valor = this.logicaEncriptador[letra];
      while (textoDesencriptado.indexOf(valor) !== -1) {
        textoDesencriptado = textoDesencriptado.replace(valor, letra);
      }
    }
    return textoDesencriptado;
  }

  esCaracterValido(caracter) {
    const valido =
      (caracter >= "a" && caracter <= "z") ||
      (caracter >= "0" && caracter <= "9") ||
      caracter === " ";

    return valido;
  }
}

const logicaEncriptador = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

const encriptador = new Encriptador(logicaEncriptador);

function encriptarTexto() {
  const textoAEncriptarYDesencriptar = document.getElementById(
    "textoAEncriptarYDesencriptar"
  ).value;
  const textoEncriptado = encriptador.encriptar(textoAEncriptarYDesencriptar);
  document.getElementById("textoDesencriptado").innerText = textoEncriptado;
  document.querySelector(".botonCopiar").innerHTML = "Copiar";
  textoDesencriptadoEsVacio();
}

function desencriptarTexto() {
  const textoAEncriptarYDesencriptar = document.getElementById(
    "textoAEncriptarYDesencriptar"
  ).value;
  const textoDesencriptado = encriptador.desencriptar(
    textoAEncriptarYDesencriptar
  );
  document.getElementById("textoDesencriptado").innerText = textoDesencriptado;
  document.querySelector(".botonCopiar").innerHTML = "Copiar";
}

function validarTexto(textarea) {
  let textoValidado = "";
  for (let i = 0; i < textarea.value.length; i++) {
    let caracter = textarea.value[i];
    if (encriptador.esCaracterValido(caracter)) {
      textoValidado += caracter;
    }
  }
  textarea.value = textoValidado;
}

function copiarTexto() {
  const textoACopiar = document.getElementById("textoDesencriptado").innerText;
  navigator.clipboard.writeText(textoACopiar);
  document.querySelector(".botonCopiar").innerHTML = "Copiado";
}

function textoDesencriptadoEsVacio() {
  const textoDesencriptado =
    document.getElementById("textoDesencriptado").innerText;
  const seccionNoEncontrado = document.querySelector(".seccionNoEncontardo");
  const botonCopiar = document.querySelector(".botonCopiar");

  if (textoDesencriptado.trim() === "") {
    seccionNoEncontrado.style.display = "block";
    botonCopiar.style.display = "none";
  } else {
    seccionNoEncontrado.style.display = "none";
    botonCopiar.style.display = "block";
  }
}

textoDesencriptadoEsVacio();

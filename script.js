//Pegando caixas de texto de cada resultado
var ramplitude = document.getElementById("ramplitude");
var rmedia = document.getElementById("rmedia");
var rvariancia = document.getElementById("rvariancia");
var rdesvio = document.getElementById("rdesvio");
var rcoeficiente = document.getElementById("rcoeficiente");

var maximo = 0;
var minimo = 0;
var amplitude = 0;
var media = 0;
var variancia = 0;
var desvio = 0;
var coeficiente = 0;

var i = 0;

//onclick do botao calcular
function StoreElements() {
  maximo = minimo = amplitude = media = variancia = desvio = coeficiente = 0;

  //Passando elementos pra um array
  var temp = document.getElementById('divelementos');
  var elementos = document.getElementById("divelementos").innerHTML;
  elementos = elementos.replaceAll(" ", ''); // :-D
  elementos = elementos.replaceAll(/[^0-9,.-]+/g, '');
  console.log(elementos);
  elementos = elementos.split(","); // Vira um array aqui
  elementos = elementos.filter(e => String(e).trim());
  temp.innerHTML = elementos;


  var qtd = elementos.length;
  for (i = 0; i < qtd; i++) {
    elementos[i] = parseFloat(elementos[i]);
  }

  if (elementos.includes('') || elementos.includes(undefined) || elementos.includes(NaN) || elementos.length == 0) {
    document.getElementById("divelementos").style.borderColor = "red";
    document.getElementById("divelementos").focus();
  } else {
    //Calculos

    //Média
    if (qtd > 1) {
      for (i = 0; i < qtd; i++) {
        media = media + elementos[i];
      }
      media = media / qtd;
    } else {
      media = elementos[0];
    }

    //Variancia
    for (i = 0; i < qtd; i++) {
      variancia += Math.pow((elementos[i] - media), 2);
    }
    variancia = variancia / (qtd - 1);

    if (isNaN(variancia)) {
      variancia = 0;
    }

    //Amplitude, maximo e minimo
    for (i = 0; i < qtd; i++) {
      if (elementos[i] > maximo) {
        maximo = elementos[i];
      }
    }
    for (i = 0; i < qtd; i++) {
      minimo += elementos[i];
    }
    for (i = 0; i < qtd; i++) {
      if (elementos[i] < minimo) {
        minimo = elementos[i];
      }
    }

    amplitude = maximo - minimo;

    //Desvio padrao
    desvio = Math.sqrt(variancia);

    //Coeficiente de variancia
    coeficiente = desvio / media;

    if (isNaN(coeficiente)) {
      coeficiente = 0;
    }


    //Insere cada resultado nas divs
    ramplitude.innerHTML = amplitude;
    rmedia.innerHTML = media.toFixed(4);
    rvariancia.innerHTML = variancia.toFixed(4);
    rdesvio.innerHTML = desvio.toFixed(4);
    rcoeficiente.innerHTML = coeficiente.toFixed(4);
  }
}

function ShowDesc(id) {
  var resultdiv = document.getElementById("wrapper-resultados");
  var descdiv = document.getElementById(id);

  resultdiv.style.opacity = "0";
  setTimeout(function () {
    resultdiv.style.display = "none";
    descdiv.style.display = "flex";
  }, 100);

  setTimeout(function () {
    descdiv.style.opacity = "1";
  }, 150);
}

function HideDesc(id) {
  var resultdiv = document.getElementById("wrapper-resultados");
  var descdiv = document.getElementById(id);

  descdiv.style.opacity = "0";
  setTimeout(function () {
    descdiv.style.display = "none";
    resultdiv.style.display = "flex";
  }, 100);

  setTimeout(function () {
    resultdiv.style.opacity = "1";
  }, 150);
}
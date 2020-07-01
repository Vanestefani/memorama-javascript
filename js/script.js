class Memorama {
  constructor() {
    /**Propiedades  */
    this.totalTarjetas = [];
    this.numeroTarjetas = 0;
    this.verificaTarjetas = [];
    this.errores = 0;
    this.dificultad = "";
    this.tarjetasCorrectas = [];

    this.agregarTarjetas = [];
    /**Propiedades HTML */
    this.$contenedorTarjetas = document.querySelector(".contenedor-tarjetas");
    this.$contenedorGeneral = document.querySelector(".contenedor-general");
    this.$mensaje = document.querySelector("h2 .mensaje");
    this.$pantallaBloqueada = document.querySelector("h2 .pantalla-bloqueada");
    /*eventos*/
    this.eventos();
  }

  eventos() {
    window.addEventListener("DOMContentLoaded", () => {
      this.cargarRespuestas();
    });
  }
  async cargarRespuestas() {
    /*Extraer datos de json */
    const respuesta = await fetch("../memo.json");
    const data = await respuesta.json();
    this.totalTarjetas = data;
    /*Orden aleatorio */
    if (this.totalTarjetas.length > 0) {
      this.totalTarjetas.sort(orden);
      function orden(a, b) {
        return Math.random() - 0.5;
      }
    }
    /*saber el numero de tarjetas*/
    this.numeroTarjetas = this.totalTarjetas.length;
    /*Ubicacion de tarjetas (template)*/
    let html = "";
    this.totalTarjetas.forEach((card) => {
      html += `<div class="tarjeta"><img class="tarjeta-img" src=${card.src} alt="imagenes"></div>`;
    });
    this.$contenedorTarjetas.innerHTML = html;
    this.comienzaJuego();
  }
  /*al darle click alas tarjetas */
  comienzaJuego() {
    let tarjeta = document.querySelectorAll(".tarjeta");
    tarjeta.forEach((tarjeta) => {
      tarjeta.addEventListener("click", (e) => {
        this.clickTarjeta(e);
      });
    });
  }
  /*Obtener tarjeta que se dio clic*/
  clickTarjeta(e) {
    this.voltearTarjetas(e);
    let sourceImage = e.target.childNodes[0].attributes[1].value;
    this.verificaTarjetas.push(sourceImage);
    let tarjeta = e.target;
    this.agregarTarjetas.unshift(tarjeta);
    this.compararTarjetas();
  }
  /*Voltear tarjetas*/
  voltearTarjetas(e) {
    e.target.style.backgroundImage = "none";
    e.target.style.backgroundColor = "white";
    e.target.childNodes[0].style.display = "block";
  }
  /*Fijar acertado*/
  fijarAcertado(arrTarjetasAcertadas) {
    arrTarjetasAcertadas.forEach((tarjeta) => {
      tarjeta.classList.add("acertada");
      this.tarjetasCorrectas.push(tarjeta);
      console.log(this.tarjetasCorrectas);
    });
  }
  reversoTarjetas(arrTarjetas) {
    arrTarjetas.forEach((tarjeta) => {
      setTimeout(() => {
        tarjeta.style.backgroundImage = "url(../img/cover.jpg)";
        tarjeta.childNodes[0].style.display = "none";
      }, 1000);
    });
  }
  /*Comparar Tarjetas*/
  compararTarjetas() {
    if (this.verificaTarjetas.length == 2) {
      if (this.verificaTarjetas[0] === this.verificaTarjetas[1]) {
        this.fijarAcertado(this.agregarTarjetas);
      } else {
        this.reversoTarjetas(this.agregarTarjetas);
        this.errores++;
      }
      this.verificaTarjetas.splice(0);
      this.agregarTarjetas.splice(0);
    }
  }
}

new Memorama();

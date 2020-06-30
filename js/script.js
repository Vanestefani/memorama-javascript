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
    tarjeta.forEach((targeta) => {
      targeta.addEventListener("click", (e) => {
        this.clickTarjeta(e);
      });
    });
  }
  /*Obtener targeta que se dio clic*/
  clickTarjeta(e) {
    this.voltearTarjetas(e);
    let sourceImage = e.target.childNodes[0].attributes[1].value;
    this.verificaTarjetas.push(sourceImage);
    let targeta = e.target;
    this.agregarTarjetas.unshift(targeta);

  }
  /*Voltear targetas*/
  voltearTarjetas(e){
e.target.style.backgroundImage="none";
e.target.style.backgroundColor="white";
e.target.childNodes[0].style.display="block";
  }
  /*Comparar Tarjetas*/
  compararTarjetas(){

  }
}

new Memorama();

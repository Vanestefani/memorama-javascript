class Memorama {
  constructor() {
    /**Propiedades  */
    this.totalTargetas = [];
    this.numeroTargetas = 0;
    this.verificaTargetas = [];
    this.errores = 0;
    this.dificultad = "";
    this.targetasCorrectas = [];
    this.agregarTargetas = [];
    /**Propiedades HTML */
    this.$contenedorTargetas = document.querySelector(".contenedor-tarjetas");
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
    const respuesta = await fetch("../memo.json");
    const data = await respuesta.json();
    this.totalTargetas=data;
    if (this.totalTargetas.length > 0) {
      this.totalTargetas.sort(orden);
      function orden(a, b) {
        return Math.random() - 0.5;
      }
    }
    console.log(this.totalTargetas);
  }
}

new Memorama();

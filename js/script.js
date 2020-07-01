class Memorama {
  constructor() {
    /**Propiedades  */
    this.totalTarjetas = [];
    this.numeroTarjetas = 0;
    this.verificaTarjetas = [];
    this.errores = 0;
    this.dificultad = "";
    this.tarjetasCorrectas = [];
    this.numeroIntentos = 0;
    this.agregarTarjetas = [];
    /**Propiedades HTML */
    this.$contenedorTarjetas = document.querySelector(".contenedor-tarjetas");
    this.$contenedorGeneral = document.querySelector(".contenedor-general");
    this.$mensaje = document.querySelector(".mensaje");
    this.$pantallaBloqueada = document.querySelector(".pantalla-bloqueada");
    this.$errorcontenedor = document.createElement("div");

    /*eventos*/
    this.eventos();
  }

  eventos() {
    window.addEventListener("DOMContentLoaded", () => {
      this.cargarRespuestas();
      this.seleccionDificultad();
    });
  }
  /*Dificultad del juego*/
  seleccionDificultad() {
    const mensaje = prompt(
      "selecciona el nivel de dificultad que puede ser :Fácil , Intermedio,Difícil .Si n sellecionas un nivel por defecto el nivel sera intermedio"
    );
    if (
      !mensaje ||
      mensaje.toLowerCase() === "intermedio" ||
      mensaje.toLowerCase() === "I"
    ) {
      this.numeroIntentos = 5;
      this.dificultad = "Intermedio";
    } else if (
      mensaje.toLowerCase() === "facil" ||
      mensaje.toLowerCase() === "fácil" ||
      mensaje.toLowerCase() === "f"
    ) {
      this.numeroIntentos = 7;
      this.dificultad = "Fácil";
    } else if (
      mensaje.toLowerCase() === "dificil" ||
      mensaje.toLowerCase() === "difícil" ||
      mensaje.toLowerCase() === "d"
    ) {
      this.numeroIntentos = 3;
      this.dificultad = "Difícil";
    } else {
      this.numeroIntentos = 5;
      this.dificultad = "Intermedio";
    }
    this.contenedorError();
    console.log(this.numeroIntentos, this.dificultad);
  }
  /*Extraer datos de json */
  async cargarRespuestas() {
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
      this.victoriaJuego();
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
        this.incremetadorErrores();
        this.derrotaJuego();
      }
      this.verificaTarjetas.splice(0);
      this.agregarTarjetas.splice(0);
    }
  }
  /*Victoria de juego*/
  victoriaJuego() {
    if (this.tarjetasCorrectas.length === this.numeroTarjetas) {
      setTimeout(() => {
        this.$pantallaBloqueada.style.display = "block";
        this.$mensaje.innerText = "Felicidades has ganado";
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }
  /*Derrota juego errores*/
  incremetadorErrores() {
    this.$errorcontenedor.innerText = `Errores ${this.errores}`;
  }
  derrotaJuego() {
    if (this.errores === 5) {
      setTimeout(() => {
        this.$pantallaBloqueada.style.display = "block";
        this.$mensaje.innerText = "Has perdido";
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }
  contenedorError() {
    this.$errorcontenedor.classList.add("error");
    this.incremetadorErrores();
    this.$contenedorGeneral.appendChild(this.$errorcontenedor);
  }
}

new Memorama();

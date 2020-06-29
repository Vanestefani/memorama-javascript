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
         this.$contenedorTargetas=document.querySelector('.contenedor-tarjetas');
         this.$contenedorGeneral=document.querySelector('.contenedor-general');
         this.$mensaje=document.querySelector('h2 .mensaje');
         this.$pantallaBloqueada=document.querySelector('h2 .pantalla-bloqueada');

    }
}

new Memorama {

};
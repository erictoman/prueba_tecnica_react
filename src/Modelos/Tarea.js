export default class Tarea {
  constructor(id, titulo, desc, min, actual) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = desc;
    this.tiempo = min;
    this.actual = min;
    this.activo = false;
    this.fecha = new Date();
  }
  continuar() {
    this.actual++;
  }
  getActual() {
    return this.actual;
  }
  toggleActivo() {
    this.activo = !this.activo;
  }
}

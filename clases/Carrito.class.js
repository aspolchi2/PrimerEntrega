import Producto from "./Producto.class.js";

export default class Carrito {
  constructor() {
    this.producto = new Producto();
    this.carritos = [];
    this.id = 1;
  }

  listar(id) {
    let prod = this.carritos.find((carr) => carr.id == id);
    return prod || { error: "Carrito no encontrado" };
  }

  listarAll() {
    return this.carritos.length 
      ? this.carritos
      : { error: "no hay carritos cargados" };
  }

  crearCarrito() {
    const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
    this.carritos.push(carr);
  }

  guardarProductoEnCarrito(idProd, idCarr) {
    console.log(idProd);
    const producto = this.producto.listar(idProd);
    this.carritos.forEach((carro) => {
      carro.id == idCarr ? carro.productos.push(producto) : null;
    });
    return this.carritos;
  }

  actualizar(carr, id) {
    carr.id = Number(id);
    let index = this.carritos.findIndex((carr) => carr.id == id);
    this.carritos.splice(index, 1, carr);
  }
  borrar(id) {
    let index = this.carritos.findIndex((carr) => carr.id == id);
    return this.carritos.splice(index, 1);
  }
}

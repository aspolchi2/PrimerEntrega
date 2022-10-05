import fs from "fs";
import Contenedor from "../components/contenedor.js";

const contenedor = new Contenedor();
export default class Producto {
  static productos = [];
  constructor() {
    this.id = 0;
  }
  listar(id) {
    let producto = Producto.productos.find((prod) => prod.id == id);
    return producto || { error: " producto no encontrado " };
  }
  listarAll() {
    return Producto.productos.length
      ? Producto.productos
      : { error: " no hay productos cargados " };
  }
  guardar(prod) {
    prod.id = ++this.id;
    prod.timestamp = Date.now();
    Producto.productos.push(prod)
    contenedor.save(Producto.productos)
    return prod;
  }

  actualizar(prod, id) {
    prod.id = Number(id);
    let index = Producto.productos.findIndex((prod) => prod.id == id);
    Producto.productos.splice(index, 1, prod);
    contenedor.save(Producto.productos)

  }

  borrar(id) {
    let index = Producto.productos.findIndex((prod) => prod.id == id);
    Producto.productos.splice(index, 1);
    contenedor.save(Producto.productos)
  }
}

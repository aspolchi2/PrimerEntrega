import express from "express";
import Carrito from "../clases/Carrito.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("", (req, res) => {
  const carritoCreado = carrito.crearCarrito();
  res.send(carritoCreado);
});
router.delete("/:id", (req, res) => {
  const carritoBorrado = carrito.borrar(req.params.id);
  res.send(carritoBorrado);
});
router.get("/", (req, res) => {
  const listaCarritos = carrito.listarAll();
  res.send(listaCarritos);
});

router.post("/:id/productos/:idPrd", (req, res) => {
  const carrito = carrito.guardarProductoEnCarrito(
    req.params.idPrd,
    req.params.id
  );
  res.send(carrito);
});

export default router;
import express from "express";
import Productos from "../clases/Producto.class.js";
import userLogged from "../server.js";
export const routerProductos = express.Router();
const logicaProductos = new Productos();


routerProductos.get("/", async (req, res, next) => {
  try {
    const productos = await logicaProductos.getAll();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

routerProductos.get("/:id", async (req, res, next) => {
  try {
    if (!Number.isNaN(req.params.id)) {
      const producto = await logicaProductos.getById(Number(req.params.id));
      res.json(producto ?? { error: "producto no encontrado" });
    } else {
      res.json({ error: "parametro incorrecto" });
    }
  } catch (error) {
    next(error);
  }
});

routerProductos.post("/", checkUser, async (req, res, next) => {
  try {
    if (
      req.body.nombre &&
      !Number.isNaN(req.body.precio) &&
      req.body.codigo &&
      !Number.isNaN(req.body.stock)
    ) {
      const producto = await logicaProductos.save(req.body);
      console.log(producto);
      res.json(producto ?? { error: "no se pudo registrar el producto" });
    } else {
      res.json({
        error: "no se pudo registrar el producto, verifique el objeto enviado",
      });
    }
  } catch (error) {
    next(error);
  }
});

routerProductos.put("/:id", checkUser, async (req, res, next) => {
  try {
    if (
      req.body.nombre &&
      !Number.isNaN(req.body.precio) &&
      req.body.codigo &&
      !Number.isNaN(req.body.stock)
    ) {
      let { nombre, descripcion, codigo, url, precio, stock } = req.body;
      const producto = await logicaProductos.update(Number(req.params.id), {
        nombre,
        descripcion,
        codigo,
        url,
        precio,
        stock,
      });
      res.json(producto ?? { error: "no se pudo actualizar el producto" });
    } else {
      res.json({
        error: "no se pudo actualizar el producto, verifique el objeto enviado",
      });
    }
  } catch (error) {
    next(error);
  }
});

routerProductos.delete("/:id", checkUser, async (req, res, next) => {
  try {
    if (!Number.isNaN(req.params.id)) {
      const result = await logicaProductos.delete(Number(req.params.id));
      res.json(
        result !== null
          ? { mensaje: `se elimino el producto con el id: ${result}` }
          : { error: "producto no encontrado" }
      );
    } else {
      res.json({
        error: "el parametro enviado no es un numero",
      });
    }
  } catch (error) {
    next(error);
  }
});

function checkUser(req, res, next) {
  if (userLogged) {
    res.json({
      error: -1,
      descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizada`,
    });
  }
  next();
}


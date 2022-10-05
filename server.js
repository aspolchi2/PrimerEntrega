import express from "express";
import cors from "cors";
import { routerProductos } from "./routes/productos.router.js";
import { routerCarrito } from "./routes/carritos.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const listener = app.listen(process.env.PORT || 8080, function () {
  console.log(`Your app is listening to port: ${listener.address().port}`);
});
listener.on("error", (error) => console.log(`error en el servidor: ${error}`));

let userLogged = false;

//root de la app
app.get("/", (req, res) => {
  res.status(200).json({ msg: "proyecto final zoppini" });
});
app.post("/login", (req, res) => {
  module.exports.logged = true;
  res.status(200).json({ msg: "user logged in" });
});

app.use("/productos", routerProductos);
app.use("/carrito", routerCarrito);

export default userLogged;

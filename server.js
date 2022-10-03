import express from "express";
import routerCarrito from "./routes/carritos.router.js";
import routerProductos from "./routes/productos.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", routerProductos);
app.use("/carritos", routerCarrito);

const PORT = 8081;
const server = app.listen(PORT, () => {
  console.log(`servidor escuchado en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`error en el servidor ${error}`));

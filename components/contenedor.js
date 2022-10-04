export default class Contenedor {
  constructor() {}

  async save(obj) {
    try {
      await fs.promises.writeFile(
        `products.txt`,
        JSON.stringify(obj, null, 2),
        "utf-8"
      );
      console.log(`products.txt creado con exito`);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile("./products.txt", "utf-8");
      // console.log(data);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  async saveNew(newProduct) {
    try {
      const data = await this.getAll();
      const index = data.sort((a, b) => b.id - a.id)[0].id;
      data.push(newProduct);
      this.save(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getByID(id) {
    try {
      const data = await this.getAll();
      const findByID = data.find((data) => data.id === id);
      console.log(findByID);
    } catch (error) {
      console.log("getByID", error);
    }
  }

  async deleteByID(id) {
    try {
      const data = await this.getAll();
      const filterByID = data.filter((data) => data.id !== id);
      console.log(`elemento con ID ${id} Eliminado con exito`);
      this.save(filterByID);
    } catch (error) {
      console.log("deleteByID", error);
    }
  }
  async deleteAll() {
    try {
      fs.promises.unlink(`${this.name}.txt`);
      console.log("bien, eliminaste todo, Campeon");
    } catch (error) {
      console.log(error);
    }
  }
}



import mongooseDriver from "mongoose";


const { database } = require("./keys");
mongooseDriver.set("useFindAndModify", false);
mongooseDriver
  .connect(database.URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Conectado a la base de datos`);
  })
  .catch(reason => {
    console.log(`Error en la conexión ${reason}`);
  });

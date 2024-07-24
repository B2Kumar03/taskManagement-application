import { DatabseConncetion } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({path:"src/.env"})
const port = process.env.PORT ||3000;
DatabseConncetion()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `server is running on port ${port} link http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log(`error occurs while running the server :${err}`);
  });

// app.listen(port, () => {
//   console.log(
//     `server is running on port ${port} link http://localhost:${port}`
//   );
// });

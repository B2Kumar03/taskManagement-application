import { DatabseConncetion } from "./db/index.js";
import { app } from "./app.js";

const port = 3000;
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

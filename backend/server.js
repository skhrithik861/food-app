const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDb = require("./src/db/db");

const port = process.env.PORT || 5000;

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

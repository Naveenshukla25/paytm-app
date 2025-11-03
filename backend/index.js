const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mainRouter = require("./route/index");

app.use("/api/v1", mainRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port 3000 ${PORT}`);
});

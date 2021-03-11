require("dotenv").config();
require("./db/mongoose");
const SalaryRouter = require("./routes/api/salary");
const CongeRouter = require("./routes/api/conge");
const ServiceRouter = require("./routes/api/service");
const AuthRouter = require("./routes/api/auth");
const express = require("express");


const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.use(express.json());
app.use("/api", SalaryRouter);
app.use("/api", CongeRouter);
app.use("/api", ServiceRouter);
app.use("/api", AuthRouter);

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

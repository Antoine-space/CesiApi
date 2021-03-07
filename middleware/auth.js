const jwt = require("jsonwebtoken");
const Salary = require("../models/salary");

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxx" => "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const user = await Salary.findById(decoded.user_id);

    if (!user) {
      throw new Error("test");
    }
    req.params.id = decoded.user_id;

    next();
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
};

const isRH = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  // "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxx" => "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  if (decoded.service != "rh") {
    return res.status(401).send();
  }
  next();
};

const isDR = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  // "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxx" => "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  if (decoded.service != "dr") {
    return res.status(401).send();
  }
  next();
};

const isChief = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  // "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxx" => "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  if (decoded.service != "chief") {
    return res.status(401).send();
  }
  next();
};
module.exports = { isAuth, isRH, isDR, isChief};

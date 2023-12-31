const jwt = require("jsonwebtoken")

// function to check correct token to use private route in backend
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    // verify token
    const data = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
 
  // token from headers = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI" 

  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "broker");
      if (decoded) {
        req.body.userId = decoded.userId;
        req.body.userName = decoded.userName;

        //this is to create relationship using userId and userName 

        next();
      }
    } catch (error) {
      res.status(400).send({error:error.message});
    }
  } else {
    res.staus(200).send({ msg: "Token Not Found, Please Login again" });
  }
};

module.exports = { auth };
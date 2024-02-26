const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.get("authorization").split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.secret_key);
        req.token = decodedToken;
        next();
    } catch (error) {
        error.message = "not authenticated";
        error.status = 401;
        next(error);
    }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.token && req.token.role == "admin") {
      
        next();
    } else {
        let error = new Error("not authorized");
        error.status = 403;
        next(error);
    }
};

module.exports.isTeacher = (req, res, next) => {
    if (req.token && req.token.role == "teacher") {
        next();
    } else {
        let error = new Error("not authorized");
        error.status = 403;
        next(error);
    }
};

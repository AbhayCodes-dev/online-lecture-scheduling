const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  protect: async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer "))
      return res.status(401).json({ msg: "No token" });
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token invalid" });
    }
  },
  admin: (req, res, next) => {
    if (!req.user || req.user.role !== "admin")
      return res.status(403).json({ msg: "Requires admin" });
    next();
  },
};

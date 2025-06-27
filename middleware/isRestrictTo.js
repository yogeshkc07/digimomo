const isRestrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      res.status(400).json({
        message: "You dont have permission to do this",
      });
    } else {
      next();
    }
  };
};
module.exports = isRestrictTo;

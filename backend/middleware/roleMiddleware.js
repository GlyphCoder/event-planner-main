// Role-based access control
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.usertype)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export default isAdmin;

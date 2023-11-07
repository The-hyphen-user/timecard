const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export default isAuthenticated;

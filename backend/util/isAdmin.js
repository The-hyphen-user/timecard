const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'demoAdmin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default isAdmin;

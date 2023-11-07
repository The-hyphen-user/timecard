const isAuthenticated = (req, res, next) => {
<<<<<<< HEAD
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
=======
  if (req.isAuthenticated()) {
    next();
  }
  res.status(401).json({ message: 'Unauthorized' });
>>>>>>> fd372b3971fbf14453e3bbe6933fc8ef689d484a
};

export default isAuthenticated;

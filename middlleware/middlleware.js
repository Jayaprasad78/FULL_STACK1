const jwt = require('jsonwebtoken');
const secretKey = 'jayaprasad1234drtyvdflmlsfficient';

const verifyToken = (req, res, next) => {
  // Get the token from the request, e.g., from a cookie or an Authorization header
  const token = req.cookies.jwtoken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, secretKey);

    // Attach the user data from the token to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;


const jwt = require('jsonwebtoken');

const authMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return { user: null };
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded };
  } catch (err) {
    return { user: null };
  }
};

module.exports = authMiddleware;
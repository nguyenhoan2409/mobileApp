const jwt = require('jsonwebtoken');

function checkAdminRole(req, res, next) {
    const token = req.header('Authorization') || req.query.token;

    if (!token) {
        return res.status(401).json({ message: 'bat xac thuc token len nhe' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.roleId === '653a2519a823940702a4b90a') {
            req.user = decoded; 
            next(); 
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    checkAdminRole,
};

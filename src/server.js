require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const app = express();
//✅ Secret depuis variable d'environnement
const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
console.error('JWT_SECRET must be set and at least 32 characters');
process.exit(1);
}
//✅ Sécurité
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
//✅ Rate limiting
const loginLimiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 5,
message: 'Too many login attempts'
});
//✅ Validation des entrées
app.post('/api/login',
loginLimiter,
[
body('username').isString().trim().notEmpty(),
body('password').isString().notEmpty().isLength({ min: 8 })
],
(req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
const { username, password } = req.body;
// Ici : vérification réelle avec bcrypt + DB
if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
const token = jwt.sign(
{ username },
SECRET,
{ expiresIn: '1h' }
);
res.json({ token });
} else {
res.status(401).json({ error: 'Invalid credentials' });
}
}
);
//✅ Endpoint de santé (sans infos sensibles)
app.get('/health', (req, res) => {
res.json({ status: 'OK' });
});
//✅ Pas d'endpoint de debug en production
if (process.env.NODE_ENV !== 'production') {
app.get('/debug', (req, res) => {
res.json({ message: 'Debug mode' });
});
}

// Route modifiée pour déclencher la règle SQL Injection
app.get('/user-profile', (req, res) => {
    const userId = req.query.id;

    // 1. Ceci va déclencher la règle SQL Injection (SAST)
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    console.log("Database executing:", query); 

    // 2. Ceci déclenche la règle XSS (ce que tu as actuellement)
    res.send("Profil de l'utilisateur " + userId);
});

app.listen(3000, () => console.log('✅ Secure server running'));
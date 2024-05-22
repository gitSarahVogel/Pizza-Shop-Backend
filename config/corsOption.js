const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5500']
    const corsOptions = {
    origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 ||
    !origin) {
    callback(null, true)
    } else {
    callback(new Error('Not allowed by CORS'))
    }
    1},
    credentials: true,
    optionsSuccessStatus: 200
    }
    module.exports = corsOptions
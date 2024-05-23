import dotenv from "dotenv/config"

const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
}

Object.freeze(env)

export default env
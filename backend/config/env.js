import dotenv from "dotenv/config"

const env = {
    PORT: process.env.PORT,
}

Object.freeze(env)

export default env
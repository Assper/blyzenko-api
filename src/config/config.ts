export const config = () => {
  return Object.freeze({
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT),
    assets: process.env.ASSETS_PATH,
    superUser: {
      password: process.env.SUPER_USER_PASSWORD,
      login: process.env.SUPER_USER_LOGIN
    },
    mongo: {
      uri: process.env.MONGO_URI,
      password: process.env.MONGO_PASSWORD,
      username: process.env.MONGO_USERNAME
    },
    market: {
      access: process.env.MARKET_API_ACCESS,
      base: process.env.MARKET_API_BASE
    },
    sentry: {
      dsn: process.env.SENTRY_DSN
    },
    sendPulse: {
      userId: process.env.SEND_PULSE_USER_ID,
      secret: process.env.SEND_PULSE_SECRET,
      uri: process.env.SEND_PULSE_URI
    }
  })
}

export type Config = ReturnType<typeof config>

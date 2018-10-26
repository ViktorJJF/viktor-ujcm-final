module.exports = {
    FB_PAGE_TOKEN: process.env.FB_PAGE_TOKEN,
    FB_VERIFY_TOKEN: process.env.FB_VERIFY_TOKEN,
    API_AI_CLIENT_ACCESS_TOKEN: process.env.API_AI_CLIENT_ACCESS_TOKEN,
    FB_APP_SECRET: process.env.FB_APP_SECRET,
    FB_APP_ID: process.env.FB_APP_ID,
    SERVER_URL: process.env.SERVER_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: 'vj.jimenez96@gmail.com',
    ADMIN_ID: process.env.ADMIN_ID,
    EMAIL_TO: 'vj.jimenez96@gmail.com',
    PG_CONFIG: {
        user: process.env.USER.POSTGRESQL,
        database: process.env.DATABASE.POSTGRESQL,
        password: process.env.PASSWORD.POSTGRESQL,
        host: process.env.HOST.POSTGRESQL,
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000,
    },
};
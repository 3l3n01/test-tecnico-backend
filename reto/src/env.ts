export default {
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379
    },
    api: {
        host: process.env.API_HOST ||  'http://localhost:3000'
    },
    general: {
        dateFormat: process.env.FORMAT_DATE || 'DD-MM-YYYY'
    }
}
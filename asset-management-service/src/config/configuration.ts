export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/wealth-management',
    name: process.env.DATABASE_NAME || 'wealth-management',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
});

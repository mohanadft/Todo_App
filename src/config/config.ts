export default () => ({
  port: process.env.PORT || 8090,
  database_url: process.env.DATABASE_URL,
});

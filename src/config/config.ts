export default () => ({
  port: process.env.PORT || 8080,
  database_url: process.env.DATABASE_URL,
  secret: process.env.SECRET,
});

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const mongoUserPass =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
      ? `${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@mongo-db`
      : '127.0.0.1';

  const host = process.env.MONGO_DB_HOST;
  const port = process.env.MONGO_DB_PORT || 27017;
  const user = process.env.MONGO_ROOT_USERNAME;
  const pass = process.env.MONGO_ROOT_PASSWORD;
  const name = process.env.MONGO_DB_NAME;

  return {
    host,
    port,
    user,
    pass,
    name,
    uri: `mongodb://${mongoUserPass}:${port}/${name}?retryWrites=false&authSource=admin`,
  };
});

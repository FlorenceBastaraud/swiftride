export default ({ env }) => {
  return {
    connection: {
      client: 'postgres',
      connection: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  }
}

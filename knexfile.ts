import path from 'path';

// migrations - controla versão do banco de dados

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory:  path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true,
};
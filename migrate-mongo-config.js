import 'dotenv/config';

const config = {
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
    databaseName: 'how-much',
  },

  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',

  migrationFileExtension: '.js',
  moduleSystem: 'esm',

  useFileHash: false,
};

export default config;

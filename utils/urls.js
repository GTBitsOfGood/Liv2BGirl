const prod = process.env.NODE_ENV === 'production';

export default {
  baseUrl: prod ? '' : 'http://localhost:3000',
  dbUrl: prod ? process.env.MONGO_DB : process.env.MONGO_DEV_DB || 'mongodb://localhost:27017',
  dbName: 'Liv2BGirl',
  pages: {
    index: '/index',
  },
  api: {
    example: '/api/example',
  },
};

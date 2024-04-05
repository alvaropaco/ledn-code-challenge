module.exports = {
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

import 'reflect-metadata';

import { Connection, EntityManager, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';

import { buildSchema } from 'type-graphql';
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';

let RedisStore = connectRedis(session);
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch((err) => {
  console.error('redis error', err);
});

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const emFork: EntityManager<IDatabaseDriver<Connection>> = orm.em.fork();

  // https://stackoverflow.com/questions/66959888/i-want-to-insert-with-mikro-orm-but-it-dont-find-my-table-c-tablenotfoundexce
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  const app = express();

  // redis
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', //csrf
        secure: __prod__, // if true: cookie only works in https
      },
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    })
  );

  // GraphQL server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ emFork, req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server is started on port 4000');
  });
};

main().catch((error) => console.log('[error in main]', error));

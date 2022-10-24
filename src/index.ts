import { MikroORM } from '@mikro-orm/core';

import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const fork = orm.em.fork();

  // TODO: fix bug with id
  const post = fork.create(Post, { title: 'My first Post', id: 3 });
  await fork.persistAndFlush(post);
};

main().catch((error) => console.log('[error in main]', error));

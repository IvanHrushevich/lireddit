import { MikroORM } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  // https://stackoverflow.com/questions/66959888/i-want-to-insert-with-mikro-orm-but-it-dont-find-my-table-c-tablenotfoundexce
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  const fork = orm.em.fork();
  const post = fork.create(Post, { title: 'My first Post', id: uuidv4() });
  await fork.persistAndFlush(post);
};

main().catch((error) => console.log('[error in main]', error));

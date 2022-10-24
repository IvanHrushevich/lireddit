import { MikroORM } from '@mikro-orm/core';
import express from 'express';

import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  // https://stackoverflow.com/questions/66959888/i-want-to-insert-with-mikro-orm-but-it-dont-find-my-table-c-tablenotfoundexce
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  const app = express();

  app.listen(4000, () => {
    console.log('server is started on port 4000');
  });
};

main().catch((error) => console.log('[error in main]', error));

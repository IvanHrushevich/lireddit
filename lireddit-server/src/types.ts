import { EntityManager, Connection, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';

export type MyContext = {
  emFork: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: any };
  res: Response;
};

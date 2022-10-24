import { Resolver, Query, Ctx } from 'type-graphql';

import { MyContext } from './../types';
import { Post } from '../entities/Post';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.emFork.find(Post, {});
  }
}

import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';

import { MyContext } from './../types';
import { Post } from '../entities/Post';
import { v4 as uuidv4 } from 'uuid';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.emFork.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id')
    id: string,
    @Ctx()
    ctx: MyContext
  ): Promise<Post | null> {
    return ctx.emFork.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title')
    title: string,
    @Ctx()
    ctx: MyContext
  ): Promise<Post> {
    const post = await ctx.emFork.create(Post, { title, id: uuidv4() });
    await ctx.emFork.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id')
    id: string,
    @Arg('title', { nullable: true })
    title: string,
    @Ctx()
    ctx: MyContext
  ): Promise<Post | null> {
    const post = await ctx.emFork.findOne(Post, { id });

    if (!post) {
      return null;
    }

    if (typeof title !== 'undefined') {
      post.title = title;
      await ctx.emFork.persistAndFlush(post);
    }

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id')
    id: string,
    @Ctx()
    ctx: MyContext
  ): Promise<boolean> {
    try {
      await ctx.emFork.nativeDelete(Post, { id });
      return true;
    } catch (_) {
      return false;
    }
  }
}

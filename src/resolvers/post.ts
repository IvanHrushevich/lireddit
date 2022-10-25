import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';

import { MyContext } from './../types';
import { Post } from '../entities/Post';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { emFork }: MyContext): Promise<Post[]> {
    return emFork.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id')
    id: string,
    @Ctx()
    { emFork }: MyContext
  ): Promise<Post | null> {
    return emFork.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title')
    title: string,
    @Ctx()
    { emFork }: MyContext
  ): Promise<Post> {
    const post = await emFork.create(Post, { title, id: uuidv4() });
    await emFork.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id')
    id: string,
    @Arg('title', { nullable: true })
    title: string,
    @Ctx()
    { emFork }: MyContext
  ): Promise<Post | null> {
    const post = await emFork.findOne(Post, { id });

    if (!post) {
      return null;
    }

    if (typeof title !== 'undefined') {
      post.title = title;
      await emFork.persistAndFlush(post);
    }

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id')
    id: string,
    @Ctx()
    { emFork }: MyContext
  ): Promise<boolean> {
    try {
      await emFork.nativeDelete(Post, { id });
      return true;
    } catch (_) {
      return false;
    }
  }
}

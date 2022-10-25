import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';

import { MyContext } from '../types';
import { User } from './../entities/User';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg('options') options: UsernamePasswordInput, @Ctx() { emFork }: MyContext) {
    const hashedPassword: string = await argon2.hash(options.password);
    const user = emFork.create(User, { username: options.username, id: uuidv4(), password: hashedPassword });
    await emFork.persistAndFlush(user);
    return user;
  }
}

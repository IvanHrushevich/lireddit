import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
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

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(@Arg('options') options: UsernamePasswordInput, @Ctx() { emFork }: MyContext): Promise<UserResponse> {
    //validation
    if (options.username.length <= 2) {
      return { errors: [{ field: 'username', message: 'length must be greater that 2' }] };
    }
    if (options.password.length <= 2) {
      return { errors: [{ field: 'password', message: 'length must be greater that 2' }] };
    }

    const hashedPassword: string = await argon2.hash(options.password);
    const user = emFork.create(User, { username: options.username, id: uuidv4(), password: hashedPassword });

    try {
      await emFork.persistAndFlush(user);
    } catch (error) {
      if (error.code === '23505') {
        return { errors: [{ field: 'username', message: 'username already taken' }] };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { emFork, req }: MyContext
  ): Promise<UserResponse> {
    const user = await emFork.findOne(User, { username: options.username });
    if (!user) {
      return { errors: [{ field: 'username', message: "username doesn't exist" }] };
    }

    const isPasswordValid: boolean = await argon2.verify(user.password, options.password);
    if (!isPasswordValid) {
      return { errors: [{ field: 'password', message: 'incorrect password' }] };
    }

    req.session.userId = user.id;

    return { user };
  }
}

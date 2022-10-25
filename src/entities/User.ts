import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt?: Date = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Field()
  @Property({ type: 'text', unique: true })
  username: string;

  // no @Field() --> "password" column would be in db, but it is not possible to select password
  @Property({ type: 'text' })
  password: string;
}

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveReference,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('name') name: string) {
    return this.usersService.create(name);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): User {
    console.log('resolve reference', reference.__typename);
    return this.usersService.findOne(reference.id);
  }
}

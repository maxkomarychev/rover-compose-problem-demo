import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('adds users', () => {
    const user = resolver.createUser('spiderman');
    expect(user.name).toEqual('spiderman');
    const users = resolver.findAll();
    expect(users).toHaveLength(1);
    expect(user).toEqual(users[0]);
  });

  it('finds user by id', () => {
    resolver.createUser('spiderman');
    const thor = resolver.createUser('thor');
    resolver.createUser('black widow');
    const user = resolver.findOne(thor.id);
    expect(thor).toEqual(user);
  });

  it('resolves reference', () => {
    resolver.createUser('spiderman');
    const thor = resolver.createUser('thor');
    resolver.createUser('black widow');
    const user = resolver.resolveReference({ __typename: 'User', id: thor.id });
    expect(thor).toEqual(user);
  });
});

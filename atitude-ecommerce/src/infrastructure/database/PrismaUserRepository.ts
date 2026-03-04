import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { prisma } from './prisma';

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return User.restore({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      stripeCustomerId: user.stripeCustomerId ?? undefined,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return User.restore({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      stripeCustomerId: user.stripeCustomerId ?? undefined,
    });
  }

  async save(user: User): Promise<User> {
    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      stripeCustomerId: user.stripeCustomerId,
    };

    let savedUser;

    if (user.id) {
      savedUser = await prisma.user.update({
        where: { id: user.id },
        data: { ...data }
      });
    } else {
      const { id, stripeCustomerId, ...createData } = data;
      savedUser = await prisma.user.create({
        data: createData
      });
    }

    return User.restore({
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      password: savedUser.password,
      stripeCustomerId: savedUser.stripeCustomerId ?? undefined,
    });
  }

  async update(user: User): Promise<User> {
    return this.save(user);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}

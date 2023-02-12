import { UserPersistence } from '../../src/infrastructure/persistence/UserPersistence';
import db from '../../src/infrastructure/utils/Connection';

describe('UserPersistence', () => {
  const userPersistence = new UserPersistence();
  const user = {cpf: '12345678901', createdAt: new Date()};

  afterEach(async () => {
    const query = 'DELETE FROM MaxMilhasDesafio.user WHERE cpf = ?';
    const values = [user.cpf];
    await db.execute(query, values);
  });

  it('should add cpf', async () => {
    const result = await userPersistence.addCpf(user);
    expect(result).toEqual(user);
  });

  it('should find by cpf', async () => {
    await userPersistence.addCpf(user);
    const result = await userPersistence.findByCpf(user);
    expect(result).toEqual({...user, id: expect.any(Number)});
  });

  it('should remove cpf', async () => {
    await userPersistence.addCpf(user);
    await userPersistence.removeCpf(user);
    const result = await userPersistence.findByCpf(user);
    expect(result).toBeNull();
  });

  it('should return all cpf', async () => {
    await userPersistence.addCpf(user);
    const result = await userPersistence.allCpf();
    expect(result).toEqual([{...user, id: expect.any(Number)}]);
  });
});

import './helpers/Mock.db';
import { UserPersistence } from '../../src/infrastructure/persistence/UserPersistence';
import db from '../../src/infrastructure/utils/Connection';

describe("UserPersistence", () => {

  const userPersistence = new UserPersistence();
  const date = new Date();
  const user = {cpf: "12345678901", createdAt: date};

  it("should add cpf", async () => {
    db.execute = jest.fn().mockResolvedValue({});

    const result = await userPersistence.addCpf(user);
    
    expect(result).toEqual({cpf: user.cpf});
  });

  it("should find by cpf", async () => {
    (db.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve([[{ ...user, id: 1 }]]));

    const result = await userPersistence.findByCpf(user);

    const expected = {...user, id: expect.any(Number), createdAt: expect.any(Date)};

    expect(result).toEqual(expected);
  });

  it("should remove cpf", async () => {
    const result = await userPersistence.removeCpf(user);

    expect(result).toEqual(undefined);
  });

  it("should return all cpf", async () => {
    (db.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve([[{ ...user, id: 1 }]]));

    const result = await userPersistence.allCpf();
    
    const expected = {...user, id: expect.any(Number), createdAt: expect.any(Date)};

    expect(result).toEqual([expected]);
  });
});

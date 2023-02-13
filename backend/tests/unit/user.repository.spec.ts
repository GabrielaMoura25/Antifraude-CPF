import { UserStorie } from '../../src/domain/repository/UserRepository';

describe("UserStorie", () => {
  let userStorie: UserStorie;
  let userPersistenceMock: any;

  beforeEach(() => {
    userPersistenceMock = {
      addCpf: jest.fn(),
      findByCpf: jest.fn(),
      removeCpf: jest.fn(),
      allCpf: jest.fn(),
    };

    userStorie = new UserStorie(userPersistenceMock);
  });

  describe("addCpf", () => {
    it("should call userPersistence.addCpf with the correct arguments", async () => {
      const entity = { cpf: "64852893055" };
      const expectedResult = { id: 1, cpf: "64852893055" };
      userPersistenceMock.addCpf.mockResolvedValue(expectedResult);
      
      const result = await userStorie.addCpf(entity);

      expect(result).toEqual(expectedResult);
      expect(userPersistenceMock.addCpf).toHaveBeenCalledWith(entity);
    });
  });

  describe("findByCpf", () => {
    it("should call userPersistence.findByCpf with the correct arguments", async () => {
      const entity = { cpf: "12345678901" };
      const expectedResult = { id: 1, cpf: "12345678901" };

      userPersistenceMock.findByCpf.mockResolvedValue(expectedResult);

      const result = await userStorie.findByCpf(entity);

      expect(result).toEqual(expectedResult);
      expect(userPersistenceMock.findByCpf).toHaveBeenCalledWith(entity);
    });
  });

  describe("removeCpf", () => {
    it("should call userPersistence.removeCpf with the correct arguments", async () => {
      const entity = { cpf: "12345678901" };

      userPersistenceMock.removeCpf(undefined);

      await userStorie.removeCpf(entity);

      expect(userPersistenceMock.removeCpf).toHaveBeenCalledWith(entity);
    });
  });

  describe("allCpf", () => {
    it("should call userPersistence.allCpf and return the correct result", async () => {
      const expectedResult = [{ id: 1, cpf: "12345678901" }, { id: 2, cpf: "10987654321" }];

      userPersistenceMock.allCpf.mockResolvedValue(expectedResult);

      const result = await userStorie.allCpf();

      expect(result).toEqual(expectedResult);
      expect(userPersistenceMock.allCpf).toHaveBeenCalled();
    });
  });
});

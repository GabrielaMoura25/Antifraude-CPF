// import chai from 'chai';
// import * as sinon from 'sinon';

// import chaiHttp from 'chai-http';
import { UserController } from '../../src/infrastructure/controllers/UserController';
import { UserService } from '../../src/domain/usecase/UserService';
import { UserStorie } from '../../src/domain/repository/UserRepository';
import App from '../../src/application/app';
import { User } from '../../src/domain/entities/User';
import { IUserPersistence } from '../../src/domain/repository/IUserPersistence';

// chai.use(chaiHttp);
// const { expect } = chai;

jest.mock("../repository/UserRepository", () => {
  return {
    UserStorie: jest.fn().mockImplementation(() => {
      return {
        addCpf: jest.fn().mockResolvedValue({ cpf: "12345678901" }),
        findByCpf: jest.fn().mockResolvedValue({ cpf: "12345678901", createdAt: new Date() }),
        removeCpf: jest.fn().mockResolvedValue(undefined),
        allCpf: jest.fn().mockResolvedValue([{ cpf: "12345678901", createdAt: new Date() }]),
      };
    }),
  };
});

describe("UserService", () => {
  
  let userStorie: UserStorie;
  let userService: UserService;

  beforeEach(() => {
    // userStorie = new UserStorie();
    userService = new UserService(userStorie);
  });

  describe("addCpf", () => {
    
    it("should return the added cpf", async () => {
      const entity = { cpf: "12345678901" };
      const result = await userService.addCpf(entity);
      expect(result).toEqual({ cpf: "12345678901" });
    });

    it("should throw an error if cpf is invalid", async () => {
      const entity = { cpf: "invalidcpf" };
      try {
        await userService.addCpf(entity);
      } catch (error) {
        expect(error.message).toEqual("InvalidCpfException");
      }
    });

    it("should throw an error if cpf already exists", async () => {
      const entity = { cpf: "12345678901" };
      try {
        await userService.addCpf(entity);
      } catch (error) {
        expect(error.message).toEqual("ExistsCpfException");
      }
    });

    it("should throw an error if cpf length is different than 11", async () => {
      const entity = { cpf: "123456789" };
      try {
        await userService.addCpf(entity);
      } catch (error) {
        expect(error.message).toEqual("InvalidCpfException");
      }
    });
  });

  describe("findByCpf", () => {
    
    it('should throw error when cpf is not found', async () => {
        const entity = {
          cpf: 'not found cpf',
          createdAt: new Date(),
        };
        await expect(userService.findByCpf(entity)).rejects.toThrow('NotFoundCpfException');
    });
  
    it('should throw error when cpf is invalid', async () => {
      const entity = {
        cpf: 'invalid cpf',
        createdAt: new Date(),
      };
      await expect(userService.findByCpf(entity)).rejects.toThrow('InvalidCpfException');
    });
  
    it('should find the cpf when it exists', async () => {
      const entity = {
        cpf: 'valid cpf',
        createdAt: new Date(),
      };
      await userStorie.findByCpf({
        cpf: entity.cpf,
        createdAt: entity.createdAt,
      });
      const result = await userService.findByCpf(entity);
      expect(result).toEqual({
        cpf: entity.cpf,
        createdAt: entity.createdAt,
        id: 1,
      });
    });
  });

  describe('removeCpf', () => {
    it('should remove the CPF from the database', async () => {
      const entity = { cpf: '12345678901' };
      await userService.removeCpf(entity);
      expect(userStorie.removeCpf).toHaveBeenCalledWith(entity);
    });

    it('should throw an error if the entity is not found', async () => {
      const entity = { cpf: '12345678901' };
      try {
        await userService.removeCpf(entity);
        fail();
      } catch (error) {
        expect(error.message).toBe('NotFoundCpfException');
      }
    });

    it('should throw an error if the CPF is invalid', async () => {
      try {
        const entity = { cpf: '123456789' };
        await userService.removeCpf(entity);
        fail();
      } catch (error) {
        expect(error.message).toBe('InvalidCpfException');
      }
    });
  });

  describe("UserService.allCpf", () => {
    let userService: UserService;
    let userStorie: UserStorie;
  
    it("Deve retornar uma lista de cpfs", async () => {
      const expectedResult = [{ cpf: "12345678901", createdAt: "2022-01-01" }, { cpf: "10987654321", createdAt: "2022-01-02" }];
  
      jest.spyOn(userStorie, "allCpf").mockResolvedValue(expectedResult as any);
  
      const result = await userService.allCpf();
      expect(result).toEqual(expectedResult);
    });
  
    it("Deve retornar uma lista vazia quando não houver cpfs", async () => {
      jest.spyOn(userStorie, "allCpf").mockResolvedValue([]);
  
      const result = await userService.allCpf();
      expect(result).toEqual([]);
    });
  });

  describe('isValidCPF', () => {
    it('should return true for a valid CPF number', async () => {
      const result = await userService.isValidCPF('12345678909');
      expect(result).toBe(true);
    });

    it('should return false for an invalid CPF number', async () => {
      const result = await userService.isValidCPF('11111111111');
      expect(result).toBe(false);
    });

    it('should return false for a non-string input', async () => {
      const result = await userService.isValidCPF(12345678909);
      expect(result).toBe(false);
    });
  });
});
     

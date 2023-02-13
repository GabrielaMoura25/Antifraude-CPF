import { UserService } from '../../src/domain/usecase/UserService';
import { UserStorie } from '../../src/domain/repository/UserRepository';
import { UserPersistence  } from '../../src/infrastructure/persistence/UserPersistence';

jest.mock("../../src/domain/repository/UserRepository", () => {
  return {
    UserStorie: jest.fn().mockImplementation(() => {
      return {
        addCpf: jest.fn().mockResolvedValue({ }),
        findByCpf: jest.fn().mockResolvedValue({ }),
        removeCpf: jest.fn().mockResolvedValue(undefined),
        allCpf: jest.fn().mockResolvedValue([]),
      };
    }),
  };
});

describe("UserService", () => {
  
  let userStorie: UserStorie;
  let userService: UserService;
  let userPersistence: UserPersistence;

  beforeEach(() => {

    userStorie = new UserStorie(userPersistence);
    userService = new UserService(userStorie);
  });

  describe("addCpf", () => {
    
    it("should return the added cpf", async () => {
      const entity = { cpf: "64852893055" };

      userService.addCpf = jest.fn().mockResolvedValue(entity);

      const result = await userService.addCpf(entity);
      
      expect(userService.addCpf).toHaveBeenCalledWith(entity);
      expect(result).toEqual({ cpf: "64852893055" });
    });

    it("should throw an error if cpf is invalid", async () => {
      const entity = { cpf: "123456789012" };
      
      try {
        await userService.addCpf(entity);
      } catch (error: any) {
        expect(error.message).toEqual("InvalidCpfException");
      }
    });

    it("should throw an error if cpf already exists", async () => {
      const entity = { cpf: "64852893055" };

      userStorie.findByCpf = jest.fn().mockResolvedValue(entity);

      try {
        await userService.addCpf(entity);
      } catch (error: any) {
        expect(error.message).toEqual("ExistsCpfException");
      }
    });

    it("should throw an error if cpf length is different than 11", async () => {
      const entity = { cpf: "123456789" };

      try {
        await userService.addCpf(entity);
      } catch (error: any) {
        expect(error.message).toEqual("InvalidCpfException");
      }
    });
  });

  describe("findByCpf", () => {
    
    it("should throw error when cpf is not found", async () => {
        const entity = { cpf: "" };

        try {
            await userService.findByCpf(entity);
            fail();
        } catch (error: any) {
            expect(error.message).toBe("NotFoundCpfException");
        }
    });
  
    it("should throw error when cpf is invalid", async () => {
      const entity = { cpf: "123456789012" };

      try {
          await userService.findByCpf(entity);
      } catch (error: any) {
          expect(error.message).toBe("InvalidCpfException");
      }
    });
  
    it("should find the cpf when it exists", async () => {
      const entity = { cpf: "64852893055" };
      
      const result = await userService.findByCpf(entity);

      expect(userStorie.findByCpf).toHaveBeenCalledWith({ cpf: entity.cpf });
      expect(result).toEqual({ });
    });
  });

  describe("removeCpf", () => {
    it("should remove the CPF from the database", async () => {
      const entity = { cpf: "64852893055" };

      await userService.removeCpf(entity);

      expect(userStorie.removeCpf).toHaveBeenCalledWith(entity);
    });

    it("should throw an error if the entity is not found", async () => {
      const entity = { cpf: "12345678901" };

      try {
        await userService.removeCpf(entity);
      } catch (error: any) {
        expect(error.message).toBe("NotFoundCpfException");
      }
    });

    it("should throw an error if the CPF is invalid", async () => {
      const entity = { cpf: "123456789" };
      
      try {
        await userService.removeCpf(entity);
      } catch (error: any) {
        expect(error.message).toBe("InvalidCpfException");
      }
    });
  });

  describe("allCpf", () => {
  
    it("should return an array of all cpfs", async () => {
      const expectedResult = [{ cpf: "64852893055", createdAt: "2022-01-01" }, { cpf: "10987654321", createdAt: "2022-01-02" }];
  
      userStorie.allCpf = jest.fn().mockResolvedValue(expectedResult as any);

      const result = await userService.allCpf();

      expect(result).toEqual(expectedResult);
    });
  
    it("should return an empty array if no cpfs are found", async () => {
      userStorie.allCpf = jest.fn().mockResolvedValue([]);
  
      const result = await userService.allCpf();

      expect(result).toEqual([]);
    });
  });

  describe("isValidCPF", () => {
    it("should return true for a valid CPF number", async () => {
      const result = await userService.isValidCPF("12345678909");

      expect(result).toBe(true);
    });

    it("should return false for an invalid CPF number", async () => {
      const result = await userService.isValidCPF("11111111111");

      expect(result).toBe(false);
    });

    it("should return false for a non-string input", async () => {
      const result = await userService.isValidCPF(12345678909);

      expect(result).toBe(false);
    });
  });
});
     

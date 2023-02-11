import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { UserStorie } from "../../src/domain/repository/UserRepository";
import { UserService } from "../../src/domain/usecase/UserService";
import { IUserPersistence } from "../../src/domain/repository/IUserPersistence";
import { User } from '../../src/domain/entities/User';

chai.use(sinonChai);
const { expect } = chai;

// describe('UserService', () => {
//   let userStorie: UserStorie;
//   let userService: UserService;

//   beforeEach(() => {
//     userStorie = {
//       addCpf: jest.fn().mockResolvedValue({}),
//       findByCpf: jest.fn().mockResolvedValue({}),
//       removeCpf: jest.fn().mockResolvedValue(undefined),
//       allCpf: jest.fn().mockResolvedValue([]),
//     };
//     userService = new UserService(userStorie);
//   });

//   describe('addCpf', () => {
//     it('should call userStorie.addCpf with the given entity', async () => {
//       const entity = { cpf: '12345678901' };
//       await userService.addCpf(entity);
//       expect(userStorie.addCpf).toHaveBeenCalledWith(entity);
//     });

//     it('should throw an error if cpf is invalid', async () => {
//       const entity = { cpf: '00000000000' };
//       await expect(userService.addCpf(entity)).rejects.toThrowError('InvalidCpfException');
//     });

//     it('should throw an error if cpf already exists', async () => {
//       userStorie.findByCpf.mockResolvedValue({ cpf: '12345678901' });
//       const entity = { cpf: '12345678901' };
//       await expect(userService.addCpf(entity)).rejects.toThrowError('ExistsCpfException');
//     });

//     it('should throw an error if cpf length is not 11', async () => {
//       const entity = { cpf: '123456' };
//       await expect(userService.addCpf(entity)).rejects.toThrowError('InvalidCpfException');
//     });
//   });
// });

describe("UserService", () => {
  let userStorie: UserStorie;
  let userService: UserService;
  let userPersistence: IUserPersistence;

  beforeEach(() => {
    userStorie = new UserStorie(userPersistence);
    userService = new UserService(userStorie);
  });

  describe("addCpf", () => {
    it("should add a valid CPF", async () => {
      sinon.stub(userStorie, "findByCpf").resolves({ cpf: "52489612363", createdAt: new Date() } as Omit<User, "">);
      const user = { cpf: "12345678901" };
      const result = await userService.addCpf(user);
      console.log(result);
      
      expect(result).equal(user);
    });

    it("should throw an error if CPF is invalid", async () => {
      const user = { cpf: "00000000000" };
      try {
        await userService.addCpf(user);
        fail("Should have thrown an error");
      } catch (e: any) {
        expect(e.message).equal("InvalidCpfException");
      }
    });

    it("should throw an error if CPF already exists", async () => {
      const user = { cpf: "12345678901" };
      await userService.addCpf(user);
      try {
        await userService.addCpf(user);
        fail("Should have thrown an error");
      } catch (e: any) {
        expect(e.message).equal("ExistsCpfException");
      }
    });

    it("should throw an error if CPF length is different from 11", async () => {
      const user = { cpf: "123456789" };
      try {
        await userService.addCpf(user);
        fail("Should have thrown an error");
      } catch (e: any) {
        expect(e.message).equal("InvalidCpfException");
      }
    });
  });
});

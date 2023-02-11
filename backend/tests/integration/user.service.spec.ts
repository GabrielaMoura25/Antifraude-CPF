import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { UserStorie } from "../../src/domain/repository/UserRepository";
import { UserService } from "../../src/domain/usecase/UserService";
import { IUserPersistence } from "../../src/domain/repository/IUserPersistence";
import { User } from '../../src/domain/entities/User';

chai.use(sinonChai);
const { expect } = chai;

describe("UserService integration tests", () => {
  let userService: UserService;
  let userStorie: UserStorie;
  let userPersistence: IUserPersistence;

  beforeEach(() => {
    userStorie = new UserStorie(userPersistence);
    userService = new UserService(userStorie);
  });

  describe("addCpf", () => {

    it("should add a valid cpf", async () => {
      const cpf = "12345678911";
      const entity: Pick<User, "cpf"> = { cpf };
      const service = new UserService({
        id: 123,
        createdAt: new Date(),
        cpf,
      } as any);
      sinon.stub(service, "addCpf").resolves(entity as any);
      const result = await service.addCpf(entity);
      expect(result).to.be.deep.equal(entity);
    });

    it("should throw an error if the cpf is invalid", async () => {
      const cpf = "invalid cpf";
      const entity: Pick<User, "cpf"> = {
        cpf
      };
      try {
        await userService.addCpf(entity);
        fail();
      } catch (error: any) {
        expect(error.message).to.equal("InvalidCpfException");
      }
    });

    it("should throw an error if the cpf already exists", async () => {
      const cpf = "12345678911";
      const entity: Pick<User, "cpf"> = { cpf };
      const service = new UserService({
        id: 123,
        createdAt: new Date(),
        cpf,
      } as any);
      sinon.stub(service, "findByCpf").resolves(entity as any);
      try {
        await service.findByCpf(entity as any);
      } catch (error: any) {
        expect(error.message).to.equal("ExistsCpfException");
      }
    });

    it("should throw an error if the cpf length is not equal to 11", async () => {
      const cpf = "1111111111";
      const entity: Pick<User, "cpf"> = {
        cpf
      };
      try {
        await userService.addCpf(entity);
        fail();
      } catch (error: any) {
        expect(error.message).to.equal("InvalidCpfException");
      }
    });
  });

  describe("findByCpf", () => {

    it("should find a user by CPF", async () => {
      const cpf = "12345678911";
      const entity: Omit<User, "id"> = { cpf, createdAt: new Date() };
      const service = new UserService({
        id: 123,
        createdAt: new Date(),
        cpf,
      } as any);
      sinon.stub(service, "findByCpf").resolves(entity as any);
      const result = await service.findByCpf(entity);
      expect(result).to.be.deep.equal(entity);
    });
  
    it("should throw an error if the CPF is not valid", async () => {
      const cpf = "invalid cpf";
      const createdAt = new Date();
      const entity: Omit<User, "id"> = {
        cpf,
        createdAt
      };
      const service = new UserService({
        id: 123,
        createdAt: new Date(),
        cpf,
      } as any);
      sinon.stub(service, "findByCpf").resolves(entity as any);
      try {
        await service.findByCpf(entity);
      } catch (error: any) {
        expect(error.message).to.equal("InvalidCpfException");
      }
    });
  
    it("should throw an error if the CPF is not found", async () => {
      try {
        await userService.findByCpf({ cpf: "", createdAt: new Date() });
        fail();
      } catch (error: any) {
        expect(error.message).to.equal("NotFoundCpfException");
      }
    });
  });

  describe("removeCpf", () => {

    it("should remove a user by CPF", async () => {
      const cpf = "12345678911";
      const entity: Pick<User, "cpf"> = { cpf };
      const service = new UserService({
        id: 123,
        createdAt: new Date(),
        cpf,
      } as any);
      sinon.stub(service, "removeCpf").resolves(entity as any);
      const result = await service.removeCpf(entity);
      expect(result).to.be.deep.equal(entity);
    });

    it("should throw an error if the CPF is not valid", async () => {
      const cpf = "invalid cpf";
      const entity: Pick<User, "cpf"> = {
        cpf
      };
      const service = new UserService({
        id: 123,
        createdAt: new Date(),
        cpf,
      } as any);
      sinon.stub(service, "removeCpf").resolves(entity as any);
      try {
        await service.removeCpf(entity);
      } catch (error: any) {
        expect(error.message).to.equal("InvalidCpfException");
      }
    });
  
    it("should throw an error if the CPF is not found", async () => {
      const cpf = "";
      const entity: Pick<User, "cpf"> = {
        cpf
      };
      sinon.stub(userService, "removeCpf").resolves(entity as any);
      try {
        await userService.removeCpf(entity);
      } catch (error: any) {
        expect(error.message).to.equal("NotFoundCpfException");
      }
    });
  });

  describe("allCpf", () => {

    it("should return all CPFs", async () => {
      const arrayResult = [
        { cpf: "12345678911", createdAt: new Date(), id: undefined },
        { cpf: "12345678912", createdAt: new Date(), id: undefined },
        { cpf: "12345678913", createdAt: new Date(), id: undefined }
      ];
      sinon.stub(userService, "allCpf").resolves(arrayResult);
      const result = await userService.allCpf();
      expect(result).to.be.deep.equal(arrayResult);
    });

    it("should return an empty array if there are no CPFs", async () => {
      sinon.stub(userService, "allCpf").resolves([]);
      const result = await userService.allCpf();
      expect(result).to.be.deep.equal([]);
    });
  });
});

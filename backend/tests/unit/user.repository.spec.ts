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

describe('UserStorie', () => {
  let userStorie: UserStorie;
  let userPersistenceMock: IUserPersistence;

  beforeEach(() => {
    userPersistenceMock = {
      addCpf: jest.fn(),
      findByCpf: jest.fn(),
      removeCpf: jest.fn(),
      allCpf: jest.fn(),
    };

    userStorie = new UserStorie(userPersistenceMock);
  });

  describe('addCpf', () => {
    it('should call userPersistence.addCpf with the correct arguments', async () => {
      const entity = { cpf: '12345678901' };
      const expectedResult = { id: 1, cpf: '12345678901' };

      await userPersistenceMock.addCpf(expectedResult);

      const result = await userStorie.addCpf(entity);

      expect(result).toEqual(expectedResult);
      expect(userPersistenceMock.addCpf).toHaveBeenCalledWith(entity);
    });
  });

  describe('findByCpf', () => {
    it('should call userPersistence.findByCpf with the correct arguments', async () => {
      const entity = { cpf: '12345678901', createdAt: new Date() };
      const expectedResult = { id: 1, cpf: '12345678901' };

      await userPersistenceMock.findByCpf(expectedResult);

      const result = await userStorie.findByCpf(entity);

      expect(result).toEqual(expectedResult);
      expect(userPersistenceMock.findByCpf).toHaveBeenCalledWith(entity);
    });
  });

  describe('removeCpf', () => {
    it('should call userPersistence.removeCpf with the correct arguments', async () => {
      const entity = { cpf: '12345678901' };

      userPersistenceMock.removeCpf(undefined);

      await userStorie.removeCpf(entity);

      expect(userPersistenceMock.removeCpf).toHaveBeenCalledWith(entity);
    });
  });

  describe('allCpf', () => {
    it('should call userPersistence.allCpf and return the correct result', async () => {
      const expectedResult = [{ id: 1, cpf: '12345678901' }, { id: 2, cpf: '10987654321' }];

      await userPersistenceMock.allCpf();

      const result = await userStorie.allCpf();

      expect(result).toEqual(expectedResult);
      expect(userPersistenceMock.allCpf).toHaveBeenCalled();
    });
  });
});

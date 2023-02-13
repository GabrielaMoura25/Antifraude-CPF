import { UserController } from '../../src/infrastructure/controllers/UserController';
import { UserService } from '../../src/domain/usecase/UserService';
import { UserStorie } from '../../src/domain/repository/UserRepository';
import express from 'express';
import { User } from '../../src/domain/entities/User';

jest.mock('../../src/domain/usecase/UserService');

describe('UserController', () => {

  let userController: UserController;
  let userService: UserService;
  let userStorie: UserStorie;

  beforeEach(() => {

    userService = new UserService(userStorie);
    userController = new UserController(userService);
  });

  describe('addCpf', () => {

    it('should add a cpf to a user', async () => {
      const cpf = { cpf: '12345678900' };
      const req = { body: cpf };
      const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };
      const next = jest.fn();

      userService.addCpf = jest.fn().mockResolvedValue(cpf);

      await userController.addCpf(req as any, res as any, next);

      expect(userService.addCpf).toHaveBeenCalledWith(cpf);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should call next with the error if addCpf throws', async () => {
      const cpf = { cpf: '12345678900' };
      const req = { body: cpf };
      const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };
      const next = jest.fn();

      const error = new Error('Error adding CPF');

      userService.addCpf = jest.fn().mockRejectedValue(error);

      await userController.addCpf(req as any, res as any, next);

      expect(userService.addCpf).toHaveBeenCalledWith(cpf);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("findByCpf", () => {

    it("should find the user by cpf and return the user information without the id", async () => {
      const cpf = { cpf: "12345678901" };
      const req = { params: cpf };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const expectedUser: User = {
        cpf: "12345678901",
        id: 123,
        createdAt: new Date(),
      };

      userService.findByCpf = jest.fn().mockResolvedValue(expectedUser);

      await userController.findByCpf(req as any, res as any, next);

      expect(userService.findByCpf).toHaveBeenCalledWith(cpf);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ...expectedUser, id: undefined });
    });

    it("should call next with the error if the find by cpf throws an error", async () => {
      const cpf = { cpf: "12345678901" };
      const req = { params: cpf };
      const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      } as any;
      const next = jest.fn();
    
      const error = new Error("Error finding the user by cpf");

      userService.findByCpf = jest.fn().mockRejectedValue(error);

      await userController.findByCpf(req as any, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("removeCpf", () => {

    it("should remove the CPF", async () => {
      const cpf = { cpf: "12345678901" };
      const req = { params: cpf };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue({}),
      };
      const next = jest.fn();

      userService.removeCpf = jest.fn().mockResolvedValue({});

      await userController.removeCpf(req as any, res as any, next);

      expect(userService.removeCpf).toHaveBeenCalledWith(cpf);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({});
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with the error if the remove cpf throws an error", async () => {
      const cpf = { cpf: "12345678901" };
      const req = { params: cpf };
      const res = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      } as any;
      const next = jest.fn();

      const error = new Error("Error removing the cpf");

      userService.removeCpf = jest.fn().mockRejectedValue(error);

      await userController.removeCpf(req as any, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("allCpf", () => {

    it("should return all cpfs", async () => {
      const cpfs: Omit<User, "id">[] = [
        { cpf: "12345678901", createdAt: new Date() },
        { cpf: "10987654321", createdAt: new Date() },
        { cpf: "09876543210", createdAt: new Date() },
      ];
      const req = {} as express.Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;
      const next = jest.fn();

      userService.allCpf = jest.fn().mockResolvedValue(cpfs);

      await userController.allCpf(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(cpfs);
    });

    it("should call next with the error", async () => {
      const req = {} as express.Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;
      const next = jest.fn();

      const error = new Error("Error fetching all cpfs");
      
      userService.allCpf = jest.fn().mockRejectedValue(error);

      await userController.allCpf(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

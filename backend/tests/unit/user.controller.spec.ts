import { UserController } from '../../src/infrastructure/controllers/UserController';
import { UserService } from '../../src/domain/usecase/UserService';
import { UserStorie } from '../../src/domain/repository/UserRepository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userStorie: UserStorie;
  let res: any;
  let req: any;
  let next: any;

  beforeEach(() => {
    userService = new UserService(userStorie);
    userController = new UserController(userService);
  });

  describe('addCpf', () => {
    it('should add a cpf to the user', async () => {
      const req = {
        body: {
          cpf: '12345678900',
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue({ cpf: '12345678900' })
      };
      const next = jest.fn();

      userService.addCpf = jest.fn().mockResolvedValue(req.body as any);


      await userController.addCpf(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ cpf: '12345678900' });
    });

    it('should call next with error if addCpf fails', async () => {
      const req = {
        body: {
          cpf: '12345678900',
          createdAt: '2022-01-01T00:00:00.000Z'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue({ cpf: '12345678900' })
      };
      const next = jest.fn();
      userService.addCpf = jest.fn().mockRejectedValue(new Error('Error adding cpf'));

      await userController.addCpf(req as any, res as any, next);

      expect(next).toEqual(new Error('Error adding cpf'));
    });
  });

  describe('findByCpf', () => {

    req = {
      params: {
        cpf: '12345678901'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    it('should find the user by cpf and return the user information without the id', async () => {
      const user = {
        cpf: '12345678901',
      };
      const expectedUser = {
        cpf: '12345678901',
       
      };
      (userService.findByCpf as jest.Mock).mockResolvedValue(user);
      await userController.findByCpf(req, res, next);
      expect(userService.findByCpf).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ...expectedUser, id: undefined });
    });

    it('should call next with the error if the find by cpf throws an error', async () => {
      const error = new Error('Error finding the user by cpf');
      (userService.findByCpf as jest.Mock).mockRejectedValue(error);
      await userController.findByCpf(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('removeCpf', () => {

    it('should remove the CPF', async () => {
      const req = {
        params: {
          cpf: '12345678901'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      userController.removeCpf(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('allCpf', () => {

    it('deve retornar status 200 e todos os cpfs cadastrados', async () => {
      const mockUserService = new UserService(userStorie);
      jest.spyOn(mockUserService, 'allCpf').mockResolvedValue([
        { cpf: '111.111.111-11', createdAt: new Date() },
        { cpf: '222.222.222-22', createdAt: new Date() }
      ]);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.allCpf(undefined as any, mockResponse as any, undefined as any);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([
        { cpf: '111.111.111-11', createdAt: expect.any(Date) },
        { cpf: '222.222.222-22', createdAt: expect.any(Date) }
      ]);
    });

    it('deve retornar status 500 em caso de erro', async () => {
      const mockUserService = new UserService(userStorie);
      jest.spyOn(mockUserService, 'allCpf').mockRejectedValue(new Error('Error ao buscar todos os cpfs'));

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNext = jest.fn();

      await userController.allCpf(undefined as any, mockResponse as any, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error('Error ao buscar todos os cpfs'));
    });
  });
});

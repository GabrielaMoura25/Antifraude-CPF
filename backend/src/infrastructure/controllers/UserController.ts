import { RequestHandler } from 'express';
import { User } from '../../domain/entities/User';
import { UserService } from '../../domain/usecase/UserService';

class UserController {
  constructor(private userService: UserService) {}

  public addCpf:RequestHandler = async (req, res, next) => {
    const cpf: Pick<User, "cpf" | "createdAt"> = {
      cpf: req.body.cpf,
      createdAt: req.body.createdAt
    }
    try {
      const result = await this.userService.addCpf(cpf);
      return res.status(201).json({ cpf: result.cpf });
    } catch (error) {
      next(error)
    }
  }

  public findByCpf:RequestHandler = async (req, res, next) => {
    const cpf: Omit<User, "id"> = {
      cpf: req.params.cpf,
      createdAt: req.body.createdAt
    }
    try {
      const result = await this.userService.findByCpf(cpf);
      return res.status(200).json({ ...result, id: undefined });
    } catch (error) {
      next(error)
    }
  }

  public removeCpf:RequestHandler = async (req, res, next) => {
    const cpf: Pick<User, "cpf"> = {
      cpf: req.params.cpf
    }
    try {
      const result = await this.userService.removeCpf(cpf);
      return res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  public allCpf:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.userService.allCpf();
      
      return res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }
}

export { UserController }
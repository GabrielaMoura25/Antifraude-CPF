import { IUserPersistence } from "../../domain/repository/IUserPersistence";
import { UserStorie } from '../../domain/repository/UserRepository';
import { UserService } from "../../domain/usecase/UserService";
import { UserController } from '../controllers/UserController';
import { UserPersistence } from "../persistence/UserPersistence";

const persistence: IUserPersistence = new UserPersistence();
const userStorie = new UserStorie(persistence);
const useCase = new UserService(userStorie);
const controller = new UserController(useCase);

export { controller };

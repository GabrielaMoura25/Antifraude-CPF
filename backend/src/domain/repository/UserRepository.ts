import { User } from "../entities/User";
import { IUserPersistence } from "./IUserPersistence";

class UserStorie {
    
  constructor(private userPersistence: IUserPersistence) { }
    
  public async addCpf(entity: Pick<User, "cpf">): Promise<User> {
    return await this.userPersistence.addCpf(entity);
  }
    
  public async findByCpf(entity: Omit<User, "id">): Promise<User> {
    return await this.userPersistence.findByCpf(entity);
  }
    
  public async removeCpf(entity: Pick<User, "cpf">): Promise<void> {
    return await this.userPersistence.removeCpf(entity);
  }
    
  public async allCpf(): Promise<User[]> {
    return await this.userPersistence.allCpf();
  }
}

export { UserStorie }
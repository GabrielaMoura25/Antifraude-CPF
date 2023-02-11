import { User } from "../../domain/entities/User";
import { IUserPersistence } from "../../domain/repository/IUserPersistence";
import db from '../utils/Connection';
import { ResultSetHeader } from "mysql2";

class UserPersistence implements IUserPersistence {
  public addCpf = async (entity: Pick<User, "cpf">) => {
    const query = 'INSERT INTO MaxMilhasDesafio.user (cpf) VALUES (?)';

    const values = [entity.cpf];

    await db.execute<ResultSetHeader>(query, values);
    const newUser: Pick<User, "cpf"> = {cpf: entity.cpf};

    return newUser || null;
  }

  public findByCpf = async (entity: Omit<User, "id">) => {
    const query = 'SELECT * FROM MaxMilhasDesafio.user WHERE cpf = ?';

    const values = [entity.cpf];

    const [data] = await db.execute(query, values);
    const [user] = data as User[];

    return user || null;
  }

  public removeCpf = async (entity: Pick<User, "cpf">) => {
    const query = 'DELETE FROM MaxMilhasDesafio.user WHERE cpf = ?';

    const values = [entity.cpf];
    
    await db.execute<ResultSetHeader>(query, values);
  }

  public allCpf = async () => {
    const query = 'SELECT * FROM MaxMilhasDesafio.user';

    const [data] = await db.execute(query);
    const user = data as User[];

    return user;
  }
}

export { UserPersistence }
import { User } from '../entities/User';
import { UserStorie } from '../repository/UserRepository';

class UserService {
  constructor(private userStorie: UserStorie) {}

  public addCpf = async (entity: Pick<User, "cpf">): Promise<User> => {
    const validCpf = await this.isValidCPF(entity.cpf);
    if (!validCpf) 
      throw new Error("InvalidCpfException");

    const cpfExist = await this.findByCpf(entity); 
    if (cpfExist) 
      throw new Error("ExistsCpfException");

    if (entity.cpf.length !== 11)
      throw new Error("InvalidCpfException");
   
    return await this.userStorie.addCpf(entity);
  }

  public findByCpf = async (entity: Pick<User, "cpf">): Promise<User> => {
    if (!entity.cpf)
      throw new Error("NotFoundCpfException");
    
    if (!this.isValidCPF(entity.cpf))
      throw new Error("InvalidCpfException");

    return await this.userStorie.findByCpf({ cpf:entity.cpf });
  }

  public removeCpf = async (entity: Pick<User, "cpf">): Promise<void> => {
    if (!entity)
      throw new Error("NotFoundCpfException");

    const cpfExist = await this.findByCpf(entity); 
    if (!cpfExist) 
      throw new Error("InvalidCpfException");

    if (!this.isValidCPF(entity.cpf))
      throw new Error("InvalidCpfException");

    return await this.userStorie.removeCpf(entity);
  }

  public allCpf = async (): Promise<Omit<User, "id">[]> => {
    const allCpf = await this.userStorie.allCpf();
    const all = allCpf.map((cpf) => {
      return {
        cpf: cpf.cpf,
        createdAt: cpf.createdAt,
        id: undefined
      }
    });    
    return all;
  }

  public isValidCPF = async (cpf: any) => {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('')
    const validator = cpf
        .filter((digit: any, index: any, array: any) => index >= array.length - 2 && digit)
        .map( (el: any) => +el )
    const toValidate = (pop: any) => cpf
        .filter((digit: any, index: any, array: any) => index < array.length - pop && digit)
        .map((el: any) => +el)
    const rest = (count: any, pop: any) => (toValidate(pop)
        .reduce((soma: any, el: any, i: any) => soma + el * (count - i), 0) * 10) % 11 % 10
    return !(rest(10,2) !== validator[0] || rest(11,1) !== validator[1])
  }
}

export { UserService }
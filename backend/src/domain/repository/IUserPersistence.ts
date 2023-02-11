interface IUserPersistence {
  addCpf(entity: any): Promise<any>
  findByCpf(entity: any): Promise<any>
  removeCpf(entity: any): void
  allCpf(): Promise<any>
}

export { IUserPersistence }
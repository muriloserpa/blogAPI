export default interface IRepository<T> {
  create(data: any): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
}

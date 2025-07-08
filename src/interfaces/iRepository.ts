export default interface IRepository<T> {
  create(data: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: number): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<T>;
}

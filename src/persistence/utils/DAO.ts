interface DAO<T, K> {
  save: (entity: T) => void;
  update: (entity: T) => void;
  saveOrUpdate: (entity: T) => void;
  saveOrUpdateWithReturnId: (entity: T) => Promise<K>;
  delete: (key: K) => void;
  select: (key: K) => Promise<T | null>;
  selectAll: () => Promise<Array<T>>;
  // selectBy: (field: string, value: Object) => Array<T>;
};

export default DAO;
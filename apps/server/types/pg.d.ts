declare module "pg" {
  export interface PoolConfig {
    connectionString?: string;
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
  }

  export class Pool {
    constructor(config?: PoolConfig);
    query(queryText: string, values?: unknown[]): Promise<any>;
    end(): Promise<void>;
  }

  export class Client {
    constructor(config?: PoolConfig);
    connect(): Promise<void>;
    query(queryText: string, values?: unknown[]): Promise<any>;
    end(): Promise<void>;
  }
}

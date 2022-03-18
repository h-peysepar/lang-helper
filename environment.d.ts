declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      MONGO_DB: string;
      MONGO_LOCAL: string;
      MONGO_USERNAME: string;
      MONGO_PASSWORD: string;
      MONGO_URI: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

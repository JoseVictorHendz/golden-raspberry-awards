require("dotenv").config();

export interface Env {
    PORT: number;
    DB_NAME: string;
    CSV_FILE_NAME: string;
}

const config: Env = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
    DB_NAME: process.env.DB_NAME || 'generic',
    CSV_FILE_NAME: process.env.CSV_FILE_NAME || 'generic',
};
  
export default config;
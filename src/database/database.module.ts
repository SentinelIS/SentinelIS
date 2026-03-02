import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import { DB_CONNECTION } from './constants';

const dbProvider = {
  provide: DB_CONNECTION,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const pool = mysql.createPool({
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('MYSQL_PORT', 3307),
      user: configService.get<string>('MYSQL_USER'),
      password: configService.get<string>('MYSQL_PASSWORD'),
      database: configService.get<string>('MYSQL_DATABASE'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    // Test the connection
    try {
      const connection = await pool.getConnection();
      console.log('Successfully connected to the database!');
      connection.release();
    } catch (error) {
      console.error('Error while connecting to the database:', error);
      throw error;
    }
    return pool;
  },
};

@Module({
  imports: [ConfigModule],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}

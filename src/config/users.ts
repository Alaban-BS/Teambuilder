import bcrypt from 'bcryptjs';
import { UserWithPassword } from '../types';

// These are pre-hashed passwords using bcrypt
// The original passwords are:
// admin: 463100
// antjanlaban@gmail.com: 036900
export const users: UserWithPassword[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    passwordHash: '$2a$10$3xRY/7zOSymCfXktkaO60OvyayktzWBFIbN.S7SpuMrpa0n9f9N9q', // 463100
    role: 'admin'
  },
  {
    id: '2',
    username: 'antjanlaban',
    email: 'antjanlaban@gmail.com',
    passwordHash: '$2a$10$awesNLA6qdpIplxxHEocnOZ8ekO3hYMQm4np8d7aCrEJviyOql5Cm', // 036900
    role: 'tc'
  }
];

// Function to verify a password against a hash
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Function to hash a new password (for future use)
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}; 
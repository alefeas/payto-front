import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthService {
    async login({ email, password }: LoginCredentials): Promise<User> {
        // Simulate API call
        await delay(500);

        // For development, accept any valid-looking email/password
        if (email && password.length >= 6) {
            const user: User = {
                id: '1',
                email,
                name: email.split('@')[0],
                role: 'user',
            };
            return user;
        }

        throw new Error('Invalid credentials');
    }

    async register({ name, email, password }: RegisterCredentials): Promise<User> {
        // Simulate API call
        await delay(500);

        // For development, accept any valid-looking registration
        if (name && email && password.length >= 6) {
            const user: User = {
                id: '1',
                email,
                name,
                role: 'user',
            };
            return user;
        }

        throw new Error('Invalid registration data');
    }

    async getCurrentUser(): Promise<User | null> {
        // Simulate API call to get current user
        await delay(200);
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            return JSON.parse(storedUser);
        }
        
        return null;
    }

    logout(): void {
        localStorage.removeItem('user');
    }
}

export const authService = new AuthService();
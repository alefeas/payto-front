import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthService {
    async login({ email, password }: LoginCredentials): Promise<User> {
        console.log('AuthService: Attempting login...', { email });
        
        try {
            // Simulate API call with delay for development
            await delay(500);

            // Mock validation: accept any valid email with password >= 6 chars
            if (!email || !email.includes('@')) {
                console.error('AuthService: Invalid email format');
                throw new Error('Invalid email format');
            }

            if (!password || password.length < 6) {
                console.error('AuthService: Password too short');
                throw new Error('Password must be at least 6 characters');
            }

            const user: User = {
                id: '1',
                email,
                name: email.split('@')[0],
                role: 'user',
            };

            console.log('AuthService: Login successful', { user });
            return user;
        } catch (error) {
            console.error('AuthService: Login failed', error);
            throw error;
        }
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
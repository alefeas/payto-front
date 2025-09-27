import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';

class AuthService {
    private API_URL = 'https://tu-api.com/api'; // Cambia esto por tu URL de backend

    async login({ email, password }: LoginCredentials): Promise<User> {
        const response = await fetch(`${this.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Para manejar cookies de sesión
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al iniciar sesión');
        }

        const data = await response.json();
        return data.user;
    }

    async register({ name, email, password }: RegisterCredentials): Promise<User> {
        const response = await fetch(`${this.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al registrar usuario');
        }

        const data = await response.json();
        return data.user;
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await fetch(`${this.API_URL}/auth/me`, {
                credentials: 'include',
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();
            return data.user;
        } catch {
            return null;
        }
    }

    async logout(): Promise<void> {
        await fetch(`${this.API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        
        // Limpia el almacenamiento local
        localStorage.removeItem('user');
    }

    // Función auxiliar para manejar tokens JWT si los usas
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Función para agregar el token a las cabeceras de las peticiones
    getAuthHeaders(): HeadersInit {
        const token = this.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }
}

export const authService = new AuthService();
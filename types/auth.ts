export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
    confirmPassword: string;
}
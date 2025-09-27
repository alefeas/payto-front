'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { authService } from '@/services/authService';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Check for stored auth token/user data
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setState({
                user: JSON.parse(storedUser),
                isAuthenticated: true,
                isLoading: false,
            });
        } else {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const user = await authService.login({ email, password });
            localStorage.setItem('user', JSON.stringify(user));
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const user = await authService.register({ name, email, password, confirmPassword: password });
            localStorage.setItem('user', JSON.stringify(user));
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    const logout = () => {
        authService.logout();
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
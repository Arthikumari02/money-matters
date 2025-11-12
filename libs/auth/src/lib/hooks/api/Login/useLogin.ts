import { useAuthStore } from '../../../contexts/AuthContext';
import { useState } from 'react';

interface UseLoginReturn {
    login: (email: string, password: string) => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
}

const useLogin = (): UseLoginReturn => {
    const authStore = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const isAdminUser = email === 'admin@gmail.com' && password === 'Admin@123';
            const users = [
                { email: 'jane.doe@gmail.com', password: 'janedoe@123', id: '1', isAdmin: false },
                { email: 'samsmith@gmail.com', password: 'samsmith@123', id: '2', isAdmin: false },
                { email: 'rahul@gmail.com', password: 'rahul@123', id: '4', isAdmin: false },
                { email: 'teja@gmail.com', password: 'teja@123', id: '5', isAdmin: false },
                { email: 'loki@gmail.com', password: 'loki@123', id: '6', isAdmin: false },
                { email: 'ramesh@gmail.com', password: 'ramesh@123', id: '7', isAdmin: false },
                { email: 'suresh@gmail.com', password: 'suresh@123', id: '8', isAdmin: false },
                { email: 'prem@gmail.com', password: 'prem@123', id: '9', isAdmin: false },
                { email: 'piyush@gmail.com', password: 'piyush@123', id: '10', isAdmin: false },
                { email: 'isha@gmail.com', password: 'isha@123', id: '12', isAdmin: false },
                { email: 'seema@gmail.com', password: 'seema@123', id: '14', isAdmin: false },
                { email: 'seema@123', password: 'arjun@123', id: '15', isAdmin: false },
                { email: 'radha@gmail.com', password: 'radha@123', id: '16', isAdmin: false },
                { email: 'phani@gmail.com', password: 'phani@123', id: '17', isAdmin: false },
            ];

            const user = isAdminUser
                ? { id: 'admin', isAdmin: true }
                : users.find(u => u.email === email && u.password === password);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            const userInfo = {
                id: user.id,
                email,
                isAdmin: user.isAdmin || false,
                fullName: email.split('@')[0],
                initials: email[0].toUpperCase(),
                username: email.split('@')[0],
                token: `token_${Date.now()}`,
                name: email.split('@')[0],
            };

            authStore.setUserInfo(userInfo);
            authStore.setToken(userInfo.token);

            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};

export default useLogin;
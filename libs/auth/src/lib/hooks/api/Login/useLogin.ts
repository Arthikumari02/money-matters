import { useAuthStore } from "../../../contexts/AuthContext";

const useLogin = () => {
    const loginStore = useAuthStore()
    const login = async (email: string, password: string) => {
        loginStore.isLoading = true;
        loginStore.error = null;
        try {
            const user = USERS.find(
                (u) => u.email === email && u.password === password
            );
            if (!user) throw new Error('Invalid email or password');

            const response = await axios.post(
                'https://bursting-gelding-24.hasura.app/api/rest/get-user-id',
                { email, password },
                {
                    headers: {
                        'x-hasura-admin-secret':
                            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                        'content-type': 'application/json',
                    },
                }
            ); ({ email, password });

            const userInfo: UserInfo = {
                id: user.id || response?.data?.id || '',
                email: user.email,
                isAdmin: user.isAdmin || false,
                fullName: user.email.split('@')[0],
                initials: user.email[0].toUpperCase(),
                username: user.email.split('@')[0],
                token: `token_${Date.now()}`,
                name: user.email.split('@')[0],
            };

            runInAction(() => {
                loginStore.userInfo = userInfo;
                loginStore.token = userInfo.token;
                loginStore.setLocalStorageItem('auth_token', userInfo.token);
                loginStore.setLocalStorageItem('user_info', JSON.stringify(userInfo));
            });

            return true;
        } catch (error) {
            this.error = error instanceof Error ? error.message : 'Login failed';
            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    return { login }

}

export default useLogin
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSession {
  id: string;
  name: string;
  type: 'admin' | 'user';
  loginTime: number;
}

export interface UserLog {
  id: string;
  name: string;
  type: 'admin' | 'user';
  loginTime: number;
  logoutTime?: number;
  ip?: string;
}

interface AuthState {
  currentUser: UserSession | null;
  isAuthenticated: boolean;
  userLogs: UserLog[];
  login: (name: string, password: string) => boolean;
  loginAsUser: (name?: string) => void;
  logout: () => void;
  addUserLog: (log: UserLog) => void;
}

const ADMIN_PASSWORD = 'rafael';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      userLogs: [],

      login: (name: string, password: string) => {
        if (name.toLowerCase() === 'admin' && password === ADMIN_PASSWORD) {
          const session: UserSession = {
            id: `admin-${Date.now()}`,
            name: 'Administrador',
            type: 'admin',
            loginTime: Date.now(),
          };

          const log: UserLog = {
            id: session.id,
            name: session.name,
            type: 'admin',
            loginTime: session.loginTime,
          };

          set({
            currentUser: session,
            isAuthenticated: true,
            userLogs: [...get().userLogs, log],
          });
          return true;
        }
        return false;
      },

      loginAsUser: (name?: string) => {
        const userName = name || `Usuario ${Math.floor(Math.random() * 1000)}`;
        const session: UserSession = {
          id: `user-${Date.now()}`,
          name: userName,
          type: 'user',
          loginTime: Date.now(),
        };

        const log: UserLog = {
          id: session.id,
          name: session.name,
          type: 'user',
          loginTime: session.loginTime,
        };

        set({
          currentUser: session,
          isAuthenticated: true,
          userLogs: [...get().userLogs, log],
        });
      },

      logout: () => {
        const currentUser = get().currentUser;
        if (currentUser) {
          // Actualizar log con tiempo de logout
          const updatedLogs = get().userLogs.map((log) =>
            log.id === currentUser.id
              ? { ...log, logoutTime: Date.now() }
              : log
          );
          
          set({
            userLogs: updatedLogs,
          });
        }

        set({
          currentUser: null,
          isAuthenticated: false,
        });
      },

      addUserLog: (log: UserLog) => {
        set((state) => ({
          userLogs: [...state.userLogs, log],
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        userLogs: state.userLogs,
        // No persistir currentUser ni isAuthenticated para que siempre pida login
      }),
    }
  )
);


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Logout } from "@/feature/auth/lib";
import type { TinitialState } from "@/feature/auth/types";

interface AuthState {
  user: TinitialState["user"];
  accessToken: TinitialState["accessToken"];
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: TinitialState) => void;
  logout: (navigate?: (path: string) => void) => Promise<void>;
  checkAuthStatus: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      checkAuthStatus: () => {
        if (!get().user) {
          set({ isLoading: true });

          setTimeout(() => {
            set({ isLoading: false });
          }, 3000);
        }
      },

      login: ({ user, accessToken }: TinitialState) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: async (navigate?: (path: string) => void) => {
        try {
          const res = await Logout();
          if (res.status === "done") {
            set({
              user: null,
              accessToken: null,
              isAuthenticated: false,
              isLoading: false,
            });
            if (navigate) navigate("/sign-in");
          } else {
            console.warn("Logout failed:", res);
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;

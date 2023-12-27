import { create } from 'zustand'
import { persist } from 'zustand/middleware'
interface TokenState {
  token: string
  setToken: (token: string) => void
  clearToken: () => void
}

export const useToken = create<TokenState>()(
  persist(
    (setState) => {
      return {
        token: '',
        setToken: (token: string) => {
          return setState({ token })
        },
        clearToken: () => {
          return setState({ token: '' })
        },
      }
    },
    {
      name: 'token-storage',
    },
  ),
)

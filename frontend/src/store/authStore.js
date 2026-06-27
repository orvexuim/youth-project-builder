import { create } from 'zustand';
import { api } from '../lib/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('ypb_token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.login({ email, password });
      localStorage.setItem('ypb_token', res.token);
      set({ user: res.user, token: res.token, loading: false });
      return res;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.register(data);
      localStorage.setItem('ypb_token', res.token);
      set({ user: res.user, token: res.token, loading: false });
      return res;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  fetchMe: async () => {
    try {
      const user = await api.me();
      set({ user });
    } catch {
      set({ user: null, token: null });
      localStorage.removeItem('ypb_token');
    }
  },

  logout: () => {
    localStorage.removeItem('ypb_token');
    set({ user: null, token: null });
  },
}));

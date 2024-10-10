import { create } from "zustand";

interface CategoryType {
  userData: any[];
  setUserData: (data: any) => void;
}

export const useUserAll = create<CategoryType>((set) => ({
  userData: [], 
  setUserData: (data) => set({ userData: data }),
}));

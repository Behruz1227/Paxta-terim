import { create } from "zustand";

interface CategoryType {
  userData: any[];
  setUserData: (data: any) => void;
}

export const useUserAll = create<CategoryType>((set) => ({
  userData: [], 
  setUserData: (data) => set({ userData: data }),
}));

interface Delete {
  id: any; 
  setId: (id: any) => void; 
}
export const useDeletes = create<Delete>((set) => ({
  id: null,
  setId: (id) => set({ id }),
}));

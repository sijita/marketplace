import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CategoriesState {
  categories: string[];
  setCategories: (categories: string[]) => void;
}

const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: 'categories-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCategoriesStore;

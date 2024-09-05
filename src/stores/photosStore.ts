import { create } from "zustand";

const state: Record<string, Array<any> | number> = {
  photos: [],
  page: 1,
  totalPages: 1,
};

export const usePhotoStore = create((set) => ({
  state,
  setPhotos: (data: Array<any>) => {
    set((prev: any) => ({ state: { ...prev?.state, photos: data } }));
  },
  setPage: (page: number) => {
    set((prev: any) => ({ state: { ...prev.state, page } }));
  },
  setTotalPages: (totalPages: number) => {
    set((prev: any) => ({ state: { ...prev.state, totalPages } }));
  },
}));

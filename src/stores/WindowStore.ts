import { create } from "zustand";

type Store = {
  zIndex: number;
  incZIndex: () => void;
};

// Stores the latest z-index value to place windows on top of each other
export default create<Store>((set) => ({
  zIndex: 0,
  incZIndex: () =>
    set((state: { zIndex: number }) => ({ zIndex: state.zIndex + 1 })),
}));

import { create } from "zustand";

type Store = {
  zIndices: { [key: string]: number };
  incZIndex: (appName: string) => void;
  getZIndex: (appName: string) => number;
};

// Stores the latest z-index values for each app to place windows on top of each other
export default create<Store>((set, get) => ({
  zIndices: {},
  incZIndex: (appName: string) =>
    set((state) => {
      const maxZIndex = Math.max(0, ...Object.values(state.zIndices));
      return {
        zIndices: { ...state.zIndices, [appName]: maxZIndex + 1 },
      };
    }),
  getZIndex: (appName: string) => get().zIndices[appName] || 0,
}));
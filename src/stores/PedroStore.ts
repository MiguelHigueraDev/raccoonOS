import { create } from 'zustand';

type Store = {
  pedroAudio: HTMLAudioElement;
  playPedroAudio: () => void;
  stopPedroAudio: () => void;
};

// This store handles the Pedro audio used in the konami code easter egg
export default create<Store>((set) => ({
  pedroAudio: new Audio('./songs/pedro.mp3'),
  playPedroAudio: () => {
    set((state) => {
      state.pedroAudio.play();
      return state;
    });
  },
  stopPedroAudio: () => {
    set((state) => {
      state.pedroAudio.pause();
      state.pedroAudio.currentTime = 0;
      return state;
    });
  },
}));

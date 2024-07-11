import { create } from 'zustand';

type Store = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

export interface Message {
  id?: string;
  content: string;
  sender: 'ai' | 'user';
}

export default create<Store>((set) => ({
  messages: [
    {
      id: '1',
      sender: 'ai',
      content: 'Hello! I\'m an AI clone of Miguel. Feel free to ask any questions, I\'ll try my best to answer them!',
    },
  ],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, id: Date.now().toString() }],
    })),
}));

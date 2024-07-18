import { create } from 'zustand';

type Store = {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeIsTypingMessage: () => void;
};

export interface Message {
  timestamp?: number;
  content: string;
  sender: 'ai' | 'user';
}

export default create<Store>((set) => ({
  messages: [
    {
      timestamp: Date.now(),
      sender: 'ai',
      content:
        "Hello! I'm an AI clone of Miguel. Feel free to ask any questions, I'll try my best to answer them!",
    },
  ],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, timestamp: Date.now() }],
    })),

  removeIsTypingMessage: () =>
    set((state) => ({
      messages: state.messages.filter(
        (message) => message.sender !== 'ai' || message.content !== 'Typing...'
      ),
    })),
}));

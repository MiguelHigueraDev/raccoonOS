import { create } from 'zustand';

type Store = {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (timestamp: number, content: string) => void;
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
      messages: [...state.messages, { ...message, timestamp: message.timestamp || Date.now() }],
    })),

  updateMessage: (timestamp, content) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.timestamp === timestamp ? { ...msg, content } : msg
      ),
    })),

  removeIsTypingMessage: () =>
    set((state) => ({
      messages: state.messages.filter(
        (message) => message.sender !== 'ai' || message.content !== 'Typing...'
      ),
    })),
}));

import { WindowProps } from '../../../shared/WindowProps';
import Window from '../../Window/Window';
import ChatStore from '../../../stores/ChatStore';
import ChatMessage from './ChatMessage';
import { useEffect, useRef, useState } from 'react';
import classes from './ChatApplication.module.css';
import NotificationStore from '../../../stores/NotificationStore';

const CHAT_URL = 'https://raccoonos-ai.vercel.app/chat';

interface AiResponse {
  output: string;
}

const ChatApplication = ({ winProps }: { winProps: WindowProps }) => {
  const { addNotification } = NotificationStore();
  const { messages, addMessage } = ChatStore();

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messagesDiv = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessages = async () => {
    if (input === '') return;

    addUserMessage(input);

    const response = await getOutput(input);

    if (!response.ok) {
      sendErrorNotification();
      setIsTyping(false);
      return;
    }

    const data: AiResponse = await response.json();
    addAiMessage(data);
  };

  const addUserMessage = (message: string) => {
    setInput('');
    setIsTyping(true);
    addMessage({
      content: message,
      sender: 'user',
    });
  }

  const getOutput = async (prompt: string) => {
    return await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  }

  const addAiMessage = async (data: AiResponse) => {
    setIsTyping(false);
    addMessage({
      content: data.output,
      sender: 'ai',
    });
  }

  const sendErrorNotification = () => {
    addNotification(
      Date.now().toString(),
      'Error sending message',
      <p>An error ocurred while sending the message.</p>
    );
  };

  // Scroll to the bottom after a new message is added
  useEffect(() => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  }, [messages]);

  return (
    winProps.isOpen && (
      <Window
        name="Chat"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={800}
        height={600}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div className={`window ${classes.chatUi}`}>
          <div className={classes.messages} ref={messagesDiv}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          <div className={classes.input}>
            <input
              className={`${classes.chatInput} ${isTyping && classes.typing}`}
              value={input}
              onChange={handleInput}
              disabled={isTyping}
              onKeyDown={(e) => e.key === 'Enter' && sendMessages()}
              placeholder="Enter your message here"
              autoFocus
            />
            <button onClick={sendMessages} disabled={(isTyping || input === '') ? true : false}>
              Send
            </button>
          </div>
        </div>
      </Window>
    )
  );
};

export default ChatApplication;

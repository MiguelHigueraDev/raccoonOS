import { WindowProps } from "../../../shared/WindowProps";
import Window from "../../Window/Window";
import ChatStore from "../../../stores/ChatStore";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState } from "react";
import classes from "./ChatApplication.module.css";
import NotificationStore from "../../../stores/NotificationStore";
import { LanyardDiscordCard } from "discord-card-react";

const CHAT_URL = "https://raccoonos-ai.vercel.app/chat";

interface AiResponse {
  output: string;
}

const ChatApplication = ({ winProps }: { winProps: WindowProps }) => {
  const { addNotification } = NotificationStore();
  const { messages, addMessage, removeIsTypingMessage } = ChatStore();

  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [discordMessage, setDiscordMessage] = useState<string>("");

  const messagesDiv = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessages = async () => {
    if (input === "") return;

    addUserMessage(input);
    await addIsTypingMessage();

    const response = await getOutput(input);

    if (!response.ok) {
      sendErrorNotification();
      setIsTyping(false);
      return;
    }

    const data: AiResponse = await response.json();
    removeIsTypingMessage();
    addAiMessage(data);
  };

  const addUserMessage = (message: string) => {
    setInput("");
    setIsTyping(true);
    addMessage({
      content: message,
      sender: "user",
    });
  };

  const addIsTypingMessage = async () => {
    // Wait a bit before adding the "Typing..." message
    // so it doesn't have same timestamp as the user message
    await new Promise((resolve) => setTimeout(resolve, 10));

    addMessage({
      content: "Typing...",
      sender: "ai",
    });
  };

  const getOutput = async (prompt: string) => {
    return await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
  };

  const addAiMessage = async (data: AiResponse) => {
    setIsTyping(false);
    addMessage({
      content: data.output,
      sender: "ai",
    });
  };

  const sendErrorNotification = () => {
    addNotification(
      Date.now().toString(),
      "Error sending message",
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
        width={1000}
        height={860}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div className={`window ${classes.chatUi}`}>
          <div className={classes.messages}>
            <div className={classes.messagesInner} ref={messagesDiv}>
              {messages.map((message) => (
                <ChatMessage key={message.timestamp} message={message} />
              ))}
            </div>

            <div className={classes.input}>
              <input
                className={`${classes.chatInput} ${isTyping && classes.typing}`}
                value={input}
                onChange={handleInput}
                disabled={isTyping}
                onKeyDown={(e) => e.key === "Enter" && sendMessages()}
                placeholder="Enter your message here (press ENTER to send)"
                autoFocus
              />
              <button
                onClick={sendMessages}
                disabled={isTyping || input === "" ? true : false}
              >
                Send
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignSelf: "flex-start" }}>
            <LanyardDiscordCard
              userId="205519765312241665"
              imageUrl="pfp.webp"
              bannerUrl="banner.webp"
              primaryColor="#007777"
              accentColor="#8500d3"
              basicInfo={{
                displayname: "Misfit",
                username: "misfitdude",
              }}
              badges={[
                { name: "Active Developer", iconUrl: "developer-badge.png" },
              ]}
              status={{
                status: "Tech nerd",
              }}
              aboutMe={{
                items: [
                  {
                    text: "Passionate about technology",
                  },
                  {
                    text: "and coding especially",
                  },
                  {
                    text: "INTP",
                    marginBottom: 8,
                  },
                  {
                    text: "👨‍💻🖥️",
                  },
                ],
              }}
              roles={{
                roles: [
                  { name: "JavaScript", color: "#f7df1e" },
                  { name: "TypeScript", color: "#007acc" },
                  { name: "Java", color: "#f89820" },
                  { name: "PHP", color: "#4f3e66" },
                  { name: "React", color: "#61DBFB" },
                  { name: "Vue", color: "#41B883" },
                ],
              }}
              priority="spotify"
              message={{
                handleInput: (e) => setDiscordMessage(e.target.value),
                message: discordMessage,
                accentColor: "#8500d3",
                placeholder: "Message @misfitdude",
              }}
            />
          </div>
        </div>
      </Window>
    )
  );
};

export default ChatApplication;

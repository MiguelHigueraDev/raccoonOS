import { WindowProps } from "../../../shared/WindowProps";
import Window from "../../Window/Window";
import ChatStore from "../../../stores/ChatStore";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState, useCallback } from "react";
import classes from "./ChatApplication.module.css";
import NotificationStore from "../../../stores/NotificationStore";

const CHAT_URL = "https://raccoonos-ai.vercel.app/chat";

const ChatApplication = ({ winProps }: { winProps: WindowProps }) => {
  const { addNotification } = NotificationStore();
  const { messages, addMessage, updateMessage, removeIsTypingMessage } =
    ChatStore();

  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(
    null
  );
  const [streamingContent, setStreamingContent] = useState<string>("");

  const messagesDiv = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const cancelStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const sendErrorNotification = useCallback(() => {
    addNotification(
      Date.now().toString(),
      "Error sending message",
      <p>An error occurred while sending the message.</p>
    );
  }, [addNotification]);

  const updateStreamingMessage = useCallback(
    (messageId: number, content: string) => {
      updateMessage(messageId, content);
    },
    [updateMessage]
  );

  const streamResponse = useCallback(
    async (prompt: string, messageId: number) => {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let accumulatedContent = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        setStreamingContent(accumulatedContent);

        // Update the message in the store as it's streaming
        updateStreamingMessage(messageId, accumulatedContent);
      }
    },
    [updateStreamingMessage]
  );

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setIsTyping(true);

    addMessage({
      content: userMessage,
      sender: "user",
    });

    abortControllerRef.current = new AbortController();

    try {
      const aiMessageId = Date.now() + 1;
      setStreamingMessageId(aiMessageId);
      setStreamingContent("");

      addMessage({
        content: "",
        sender: "ai",
        timestamp: aiMessageId,
      });

      await streamResponse(userMessage, aiMessageId);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Request was cancelled
        return;
      }

      sendErrorNotification();
      removeIsTypingMessage();
    } finally {
      setIsTyping(false);
      setStreamingMessageId(null);
      setStreamingContent("");
      abortControllerRef.current = null;
    }
  }, [
    input,
    isTyping,
    addMessage,
    removeIsTypingMessage,
    sendErrorNotification,
    streamResponse,
  ]);

  // Scroll to the bottom after a new message is added
  useEffect(() => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  // Cancel streaming when component unmounts or window closes
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
            {messages.map((message) => {
              // For streaming messages, show the streaming content
              const displayMessage =
                message.timestamp === streamingMessageId && streamingContent
                  ? { ...message, content: streamingContent }
                  : message;

              return (
                <ChatMessage key={message.timestamp} message={displayMessage} />
              );
            })}
          </div>

          <div className={classes.input}>
            <input
              className={`${classes.chatInput} ${
                isTyping ? classes.typing : ""
              }`}
              value={input}
              onChange={handleInputChange}
              disabled={isTyping}
              onKeyDown={handleKeyDown}
              placeholder="Enter your message here (press ENTER to send)"
              autoFocus
            />
            {isTyping && streamingMessageId ? (
              <button
                onClick={cancelStreaming}
                className={classes.cancelButton}
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={sendMessage}
                disabled={isTyping || !input.trim()}
              >
                Send
              </button>
            )}
          </div>
        </div>
      </Window>
    )
  );
};

export default ChatApplication;

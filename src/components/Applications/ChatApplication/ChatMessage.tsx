import { Message } from '../../../stores/ChatStore';
import classes from './ChatApplication.module.css';

const ChatMessage = ({ message }: { message: Message }) => {
  if (message.sender === 'user') {
    return (
      <div className={`${classes.selfMessage} ${classes.message}`}>
        <div className="flex items-center gap-2 mb-1">
          <img
            src="./user.svg"
            alt=""
            className="rounded-full object-cover"
          />
          <span>You</span>
        </div>
        <p>{message.content}</p>
      </div>
    );
  } else {
    return (
      <div className={`${classes.aiMessage} ${classes.message}`}>
        <div className="flex items-center gap-2 mb-1">
          <img
            src="./raccoonos-logo.webp"
            alt=""
            className="rounded-full object-cover"
          />
          <span>Miguel</span>
        </div>
        <p>{message.content}</p>
      </div>
    );
  }
};

export default ChatMessage;

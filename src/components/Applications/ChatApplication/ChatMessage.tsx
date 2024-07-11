import { Message } from '../../../stores/ChatStore';
import classes from './ChatApplication.module.css';

const ChatMessage = ({ message }: { message: Message }) => {
  if (message.sender === 'user') {
    return (
      <p>
        <span className={classes.selfMessage}>You:</span> {message.content}
      </p>
    );
  } else {
    return (
      <p>
        <span className={classes.aiMessage}>Miguel:</span> {message.content}
      </p>
    );
  }
};

export default ChatMessage;

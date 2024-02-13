import React, { useState, useEffect } from 'react';
import './chatbot.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import logo from '../../assets/icon.png';

const API_KEY = process.env.REACT_APP_API_KEY1;

const systemMessage = {
  role: 'system',
  content: "Explain things like you're talking to a software professional with 2 years of experience.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const userMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessages) => {
    const apiMessages = chatMessages.map(({ sender, message }) => ({
      role: sender === 'ChatGPT' ? 'assistant' : 'user',
      content: message,
    }));

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();

      setMessages((prevMessages) => [
  ...prevMessages,
  {
    message: data.choices && data.choices.length > 0 ? data.choices[0].message.content : 'No response from ChatGPT',
    sender: 'ChatGPT',
  },
]);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot" style={{ height: '100vh' }}>
      <div style={{ position: 'relative', height: '600px', width: '500px' }}>
        <MainContainer className="main-container" style={{ borderRadius: '3rem', marginTop: '2rem' }}>
          <img src={logo} alt="logo" className="logo" />
          <ChatContainer className="chat-container">
            <MessageList
              className="message-container"
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chatbot;

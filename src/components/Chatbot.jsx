import React, { useState, useRef, useEffect } from 'react';

const BOT_RESPONSES = {
  projects:
    "I've built several notable projects including EventEra (a full-stack event management platform) and this custom React portfolio. Check out the 'Featured Projects' section to see live demos!",
  skills:
    "My core stack includes React.js, JavaScript (ES6+), Python, HTML5, modern CSS3 layouts, Git/GitHub, and ML concepts. I'm actively expanding into AI-driven web architectures.",
  hire:
    "Araf is open to exciting internships, freelance contracts, and full-time opportunities! You can reach him directly via the contact form or at myselfaraf1457@gmail.com / WhatsApp (+8801887789984).",
  default:
    "Hello! I'm Araf's AI assistant. Feel free to ask about his background, projects, technical skills, or hiring availability!",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hi! I'm Araf's AI assistant. How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const streamBotReply = (queryKey) => {
    const fullText = BOT_RESPONSES[queryKey] || BOT_RESPONSES.default;
    const botMsgId = Date.now();

    setIsTyping(true);
    setMessages((prev) => [...prev, { id: botMsgId, sender: 'bot', text: '' }]);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId ? { ...msg, text: fullText.substring(0, charIndex) } : msg
        )
      );

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    const lower = query.toLowerCase();
    let key = 'default';
    if (lower.includes('project') || lower.includes('work') || lower.includes('eventera')) {
      key = 'projects';
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
      key = 'skills';
    } else if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('job')) {
      key = 'hire';
    }

    setTimeout(() => {
      streamBotReply(key);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container" id="chatbot">
      <button
        className="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        <i className="fa-solid fa-robot"></i>
        <span className="trigger-ping"></span>
      </button>

      <div className={`chat-window ${isOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h3>Araf's AI</h3>
              <span className="online-status">Online</span>
            </div>
          </div>
          <button className="chat-close" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`message ${m.sender}`}>
              <div className="message-content">{m.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="quick-replies">
            <button
              type="button"
              className="quick-reply-btn"
              onClick={() => handleSendMessage('Tell me about your projects')}
            >
              Projects
            </button>
            <button
              type="button"
              className="quick-reply-btn"
              onClick={() => handleSendMessage('What are your top skills?')}
            >
              Skills
            </button>
            <button
              type="button"
              className="quick-reply-btn"
              onClick={() => handleSendMessage('How can I hire you?')}
            >
              Hire Me
            </button>
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              id="chatInput"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button id="chatSend" type="button" onClick={() => handleSendMessage()}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

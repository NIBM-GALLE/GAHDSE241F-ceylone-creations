import React, { useState, useEffect, useRef } from "react";
import "./MessagingCenter.css";
import BotIcon from "../../assets/icons/bot-icon.png";
import ArtisanIcon from "../../assets/icons/artisan-icon.png";
import CustomerIcon from "../../assets/icons/customer-icon.png";
import AttachmentIcon from "../../assets/icons/attachment-icon.png";
import TypingIndicator from "./TypingIndicator";

const MessagingCenter = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Welcome to Ceylon Creations! I'm your AI assistant. Please select your role:", 
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [userType, setUserType] = useState(null);
  const [showRoleButtons, setShowRoleButtons] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Image recognition knowledge base
  const imageKnowledgeBase = {
    "wooden-mask": {
      artisan: "This appears to be a traditional Sri Lankan wooden mask. For artisans: Use jak wood for carving, apply natural dyes, and ensure proper drying to prevent cracking.",
      customer: "This is a traditional Sri Lankan wooden mask, hand-carved by skilled artisans. Used in rituals and dances, each piece tells a cultural story.",
      materials: "Typically made from jak wood, using natural pigments for coloring.",
      origin: "Originates from Ambalangoda region, with centuries-old traditions.",
      making: "Carved using traditional tools, then polished and painted with natural dyes."
    },
    "handloom-textile": {
      artisan: "This is handloom textile. Use traditional weaving techniques with cotton/silk blends. Consider natural dyes for authentic colors.",
      customer: "This handloom textile showcases Sri Lanka's weaving heritage. Each piece takes days to weeks to create using traditional methods.",
      materials: "Made from organic cotton or silk, often with natural dyes.",
      patterns: "Features traditional patterns like 'Dumbara' or 'Batik' designs.",
      making: "Woven on traditional looms, often taking weeks to complete complex patterns."
    },
    "brass-lamp": {
      artisan: "This brass oil lamp needs precise metal casting. Maintain traditional designs while ensuring functionality.",
      customer: "This traditional brass oil lamp is used in cultural ceremonies. Handcrafted using ancient metalworking techniques.",
      materials: "Made from brass alloy with intricate engravings.",
      usage: "Used in temples and homes for religious ceremonies.",
      making: "Created using lost-wax casting technique passed down through generations."
    },
    "basket": {
      artisan: "This is a handwoven basket. Use locally sourced materials like rattan or palm leaves for authentic craftsmanship.",
      customer: "This handwoven basket represents Sri Lanka's rural craftsmanship. Each piece is unique and sustainably made.",
      materials: "Woven from natural fibers like rattan, bamboo, or palm leaves.",
      usage: "Used for storage, decoration, and as cultural artifacts.",
      making: "Woven by hand using techniques passed down through generations."
    }
  };

  const knowledgeBase = {
    general: {
      "about": "Ceylon Creations is a Fair Trade Platform connecting Sri Lankan artisans with global customers. We preserve traditional craftsmanship while ensuring fair compensation.",
      "mission": "Our mission is to empower artisans through direct market access, skill development, and cultural preservation.",
      "contact": "You can reach us at support@ceyloncreations.lk or +94 76 123 4567.",
      "hours": "Our support team is available Monday-Friday, 9AM-5PM (IST)."
    },
    artisan: {
      "register": "Artisans can register by clicking 'Join as Artisan' on our homepage and submitting required documents.",
      "products": "You can list products through your dashboard. Include clear photos, detailed descriptions, and fair pricing.",
      "orders": "View and manage orders in your dashboard. Mark as shipped when dispatched.",
      "payments": "Payments are processed weekly with 90% going directly to you (10% platform fee).",
      "workshops": "List your workshops under 'Events' in your dashboard. Set dates, prices, and capacity."
    },
    customer: {
      "buy": "Browse products, add to cart, and checkout securely. We accept cards, PayPal, and bank transfers.",
      "returns": "Returns accepted within 14 days for unused items. Contact support for assistance.",
      "shipping": "Standard shipping takes 7-10 days locally, 14-21 days internationally. Tracking provided.",
      "authenticity": "All products are verified authentic handmade items with artisan profiles."
    },
    platform: {
      "features": "Key features: Artisan marketplace, Workshop bookings, Fundraising campaigns, Cultural stories.",
      "fundraising": "Artisans can create campaigns for projects. Supporters receive rewards based on contribution.",
      "tourism": "Book artisan workshop visits through our interactive map feature."
    }
  };

  const quickReplies = {
    artisan: [
      "How do I list products?",
      "When will I get paid?",
      "How to set up workshops?"
    ],
    customer: [
      "How to verify authenticity?",
      "What's the return policy?",
      "How long does shipping take?"
    ]
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text, options) => {
    setMessages(prev => [...prev, { 
      text, 
      isBot: true,
      timestamp: new Date(),
      options 
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { 
      text, 
      isBot: false,
      timestamp: new Date() 
    }]);
  };

  const handleRoleSelect = (role) => {
    setUserType(role);
    setShowRoleButtons(false);
    addUserMessage(`I am a ${role}`);
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage(
        `Welcome ${role === "artisan" ? "Artisan" : "Customer"}! How can I assist you today?`,
        quickReplies[role]
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addUserMessage(inputMessage);
    setIsTyping(true);
    handleBotResponse(inputMessage);
    setInputMessage("");
  };

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    setIsTyping(true);
    handleBotResponse(reply);
  };

  const handleBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let response = "";
    let foundMatch = false;
    let replyOptions = null;

    // First check image-related questions
    if (messages.some(m => m.isImage)) {
      const lastImageMsg = messages.filter(m => m.isImage).pop();
      if (lastImageMsg) {
        const recognizedAs = lastImageMsg.recognizedAs;
        if (recognizedAs && imageKnowledgeBase[recognizedAs]) {
          const details = imageKnowledgeBase[recognizedAs];
          
          if (lowerInput.includes("material")) {
            response = `The materials used are: ${details.materials}`;
            foundMatch = true;
          } else if (lowerInput.includes("origin")) {
            response = `The origin is: ${details.origin}`;
            foundMatch = true;
          } else if (lowerInput.includes("how") && (lowerInput.includes("make") || lowerInput.includes("create"))) {
            response = `The making process: ${details.making}`;
            foundMatch = true;
          }
        }
      }
    }

    // If not image-related, check regular knowledge base
    if (!foundMatch) {
      const searchCategories = [
        ...(userType ? Object.entries(knowledgeBase[userType]) : []),
        ...Object.entries(knowledgeBase.general),
        ...Object.entries(knowledgeBase.platform)
      ];

      for (const [key, value] of searchCategories) {
        if (lowerInput.includes(key)) {
          response = value;
          foundMatch = true;
          break;
        }
      }
    }

    if (!foundMatch) {
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        response = `Hello! How can I assist you ${userType || 'today'}?`;
      } else if (lowerInput.includes("thank")) {
        response = "You're welcome! Is there anything else I can help with?";
      } else {
        response = "I can help with information about Ceylon Creations. Try asking about: " + 
          (userType 
            ? (userType === "artisan" 
                ? "product listing, orders, payments" 
                : "products, shipping, returns") 
            : "artisans, products, workshops");
      }
    }

    if (userType && response.length < 150) {
      replyOptions = quickReplies[userType];
    }

    setTimeout(() => {
      addBotMessage(response, replyOptions);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const analyzeImage = (file) => {
    return new Promise((resolve) => {
      // Simulate image recognition with mock data
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const mockRecognitions = Object.keys(imageKnowledgeBase);
          const randomRecognition = mockRecognitions[
            Math.floor(Math.random() * mockRecognitions.length)
          ];
          
          resolve({
            imageUrl: e.target.result,
            recognizedAs: randomRecognition,
            details: imageKnowledgeBase[randomRecognition]
          });
        };
        reader.readAsDataURL(file);
      }, 1500);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      addBotMessage("Please upload an image file (JPEG, PNG)");
      return;
    }

    setIsTyping(true);
    addUserMessage("(Image attached)");
    
    try {
      const analysis = await analyzeImage(file);
      
      setMessages(prev => [...prev, {
        isBot: false,
        isImage: true,
        imageUrl: analysis.imageUrl,
        recognizedAs: analysis.recognizedAs,
        timestamp: new Date()
      }]);

      setTimeout(() => {
        addBotMessage(
          `I recognize this as ${analysis.recognizedAs.replace('-', ' ')}. ` +
          `${analysis.details[userType] || analysis.details.customer} ` +
          `Would you like to know more about the materials or origin?`,
          ["Tell me about materials", "What's the origin?", "How is this made?"]
        );
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      addBotMessage("Sorry, I couldn't analyze that image. Please try another or ask your question in text.");
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messaging-center">
      <div className="title-section">
        <h1>Messaging Center</h1>
        <p>AI-powered assistance for Ceylon Creations</p>
      </div>

      <div className="messaging-container">
        <div className="chat-box">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isBot ? "bot" : "user"}`}>
                <div className="message-header">
                  {message.isBot ? (
                    <img src={BotIcon} alt="AI Assistant" className="avatar" />
                  ) : (
                    <img 
                      src={userType === "artisan" ? ArtisanIcon : CustomerIcon} 
                      alt={userType || "User"} 
                      className="avatar" 
                    />
                  )}
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
                <div className="message-content">
                  {message.isImage ? (
                    <div className="attached-image">
                      <img src={message.imageUrl} alt="Uploaded content" />
                    </div>
                  ) : (
                    <p>{message.text}</p>
                  )}
                  {message.options && (
                    <div className="quick-replies">
                      {message.options.map((option, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleQuickReply(option)}
                          className="quick-reply"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {showRoleButtons && (
              <div className="role-buttons">
                <button onClick={() => handleRoleSelect("artisan")} className="role-btn artisan-btn">
                  <img src={ArtisanIcon} alt="Artisan" />
                  <span>I'm an Artisan</span>
                </button>
                <button onClick={() => handleRoleSelect("customer")} className="role-btn customer-btn">
                  <img src={CustomerIcon} alt="Customer" />
                  <span>I'm a Customer</span>
                </button>
              </div>
            )}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {userType && (
            <form onSubmit={handleSendMessage} className="message-input">
              <button 
                type="button" 
                className="attach-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <img src={AttachmentIcon} alt="Attach file" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask me anything about Ceylon Creations as a ${userType}...`}
              />
              <button type="submit" className="send-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          )}
        </div>

        {userType && (
          <div className="user-info">
            <img 
              src={userType === "artisan" ? ArtisanIcon : CustomerIcon} 
              alt={userType} 
              className="user-icon" 
            />
            <div className="user-details">
              <p className="user-role">{userType === "artisan" ? "Artisan" : "Customer"}</p>
              <p className="user-status">Active now</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingCenter;
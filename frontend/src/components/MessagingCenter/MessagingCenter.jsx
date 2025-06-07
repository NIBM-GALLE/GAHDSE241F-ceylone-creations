import React, { useState, useEffect, useRef } from "react";
import "./MessagingCenter.css";
import BotIcon from "../../assets/icons/bot-icon.png";
import ArtisanIcon from "../../assets/icons/artisan-icon.png";
import CustomerIcon from "../../assets/icons/customer-icon.png";
import AttachmentIcon from "../../assets/icons/attachment-icon.png";
import MicrophoneIcon from "../../assets/icons/microphone-icon.png";
import StopIcon from "../../assets/icons/stop-icon.png";
import SpeakerIcon from "../../assets/icons/speaker-icon.png";
import SpeakerMuteIcon from "../../assets/icons/speaker-mute-icon.png";
import TypingIndicator from "./TypingIndicator";

const MessagingCenter = () => {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Ceylon Creations! I'm your AI assistant. Please select your role:",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [userType, setUserType] = useState(null);
  const [showRoleButtons, setShowRoleButtons] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const speechRecognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

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
      "about_ceylon": {
        keywords: ["about", "ceylon creations", "who are you", "tell me about ceylon"],
        answer: "Ceylon Creations is a Fair Trade Platform connecting Sri Lankan artisans with global customers. We preserve traditional craftsmanship while ensuring fair compensation."
      },
      "mission_statement": {
        keywords: ["mission", "your goal", "purpose"],
        answer: "Our mission is to empower artisans through direct market access, skill development, and cultural preservation."
      },
      "contact_info": {
        keywords: ["contact", "reach you", "email", "phone number", "support"],
        answer: "You can reach us at support@ceyloncreations.lk or +94 76 123 4567."
      },
      "operating_hours": {
        keywords: ["hours", "open", "support hours", "when are you available"],
        answer: "Our support team is available Monday-Friday, 9AM-5PM (IST)."
      }
    },
    artisan: {
      "artisan_register": {
        keywords: ["register", "join as artisan", "sign up artisan"],
        answer: "Artisans can register by clicking 'Join as Artisan' on our homepage and submitting required documents."
      },
      "list_products": {
        keywords: ["products", "list items", "how to sell", "add product"],
        answer: "You can list products through your dashboard. Include clear photos, detailed descriptions, and fair pricing."
      },
      "manage_orders": {
        keywords: ["orders", "manage sales", "view orders"],
        answer: "View and manage orders in your dashboard. Mark as shipped when dispatched."
      },
      "artisan_payments": {
        keywords: ["payments", "get paid", "payment schedule", "platform fee"],
        answer: "Payments are processed weekly with 90% going directly to you (10% platform fee)."
      },
      "artisan_workshops": {
        keywords: ["workshops", "list workshop", "host event"],
        answer: "List your workshops under 'Events' in your dashboard. Set dates, prices, and capacity."
      }
    },
    customer: {
      "how_to_buy": {
        keywords: ["buy", "purchase", "checkout", "payment methods"],
        answer: "Browse products, add to cart, and checkout securely. We accept cards, PayPal, and bank transfers."
      },
      "return_policy": {
        keywords: ["returns", "return policy", "exchange", "refund"],
        answer: "Returns accepted within 14 days for unused items. Contact support for assistance."
      },
      "shipping_details": {
        keywords: ["shipping", "delivery", "shipping time", "how long does it take"],
        answer: "Standard shipping takes 7-10 days locally, 14-21 days internationally. Tracking provided."
      },
      "product_authenticity": {
        keywords: ["authenticity", "authentic", "handmade", "verify products"],
        answer: "All products are verified authentic handmade items with artisan profiles."
      }
    },
    platform: {
      "platform_features": {
        keywords: ["features", "what can platform do", "key features"],
        answer: "Key features: Artisan marketplace, Workshop bookings, Fundraising campaigns, Cultural stories."
      },
      "fundraising_info": {
        keywords: ["fundraising", "campaigns", "support project"],
        answer: "Artisans can create campaigns for projects. Supporters receive rewards based on contribution."
      },
      "tourism_booking": {
        keywords: ["tourism", "book workshop", "visit artisan", "interactive map"],
        answer: "Book artisan workshop visits through our interactive map feature."
      }
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

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("VOICE_INPUT (Raw Transcript):", transcript);
      setInputMessage(transcript);
      addUserMessage(transcript);
      setIsTyping(true);
      handleBotResponse(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      if (event.error === 'no-speech') {
        addBotMessage("I didn't hear anything. Please try again.");
      } else if (event.error === 'audio-capture') {
        addBotMessage("No microphone found. Ensure a microphone is connected and permissions are set.");
      } else if (event.error === 'not-allowed') {
        addBotMessage("Microphone access denied. Please enable it in your browser settings.");
      }
      setIsListening(false);
    };
    
    recognition.onend = () => {
      if (isListening) {
        setIsListening(false);
      }
    };

    speechRecognitionRef.current = recognition;
  }, []);

  const speak = (text) => {
    if (!isTTSEnabled || !text || !synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onerror = (event) => console.error('SpeechSynthesis Error', event);
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const startListening = () => {
    if (speechRecognitionRef.current) {
      setInputMessage('');
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch(e) {
        console.error("Error starting speech recognition:", e);
        setIsListening(false); 
        if (e.name === 'NotAllowedError' || e.message.includes('permission')) {
          addBotMessage("Microphone access was denied. Please enable it in your browser settings.");
        } else {
          addBotMessage("Could not start voice input. Please check microphone and browser permissions.");
        }
      }
    } else {
        addBotMessage("Voice input is not available or not initialized correctly.");
    }
  };

  const stopListening = () => {
    if (speechRecognitionRef.current && isListening) {
      speechRecognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const toggleTTS = () => {
    setIsTTSEnabled(prev => {
        const newTTSEnabledState = !prev;
        if (!newTTSEnabledState && synthRef.current) {
            synthRef.current.cancel();
        }
        return newTTSEnabledState;
    });
  };

  const addBotMessage = (text, options) => {
    setMessages(prev => [...prev, {
      text,
      isBot: true,
      timestamp: new Date(),
      options
    }]);
    speak(text);
  };

  const addUserMessage = (text, isImageUpload = false, imageUrl = null, recognizedAs = null) => {
    setMessages(prev => [...prev, {
      text: isImageUpload ? "(Image attached)" : text,
      isBot: false,
      timestamp: new Date(),
      isImage: isImageUpload,
      imageUrl: isImageUpload ? imageUrl : null,
      recognizedAs: isImageUpload ? recognizedAs : null
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
    const currentInput = inputMessage;

    addUserMessage(currentInput);
    setIsTyping(true);
    handleBotResponse(currentInput);
    setInputMessage("");
  };

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    setIsTyping(true);
    handleBotResponse(reply);
  };

  const handleBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    console.log("HANDLE_BOT_RESPONSE (Processed Input):", lowerInput);
    let response = "";
    let foundMatch = false;
    let replyOptions = null;

    if (messages.some(m => m.isImage)) {
      const lastImageMsg = messages.filter(m => m.isImage).pop();
      if (lastImageMsg) {
        const recognizedAs = lastImageMsg.recognizedAs;
        if (recognizedAs && imageKnowledgeBase[recognizedAs]) {
          const details = imageKnowledgeBase[recognizedAs];
          console.log("HANDLE_BOT_RESPONSE (Image Context): Checking for image details of", recognizedAs);
          if (lowerInput.includes("material")) {
            response = `The materials used are: ${details.materials}`;
            foundMatch = true;
            console.log("IMAGE_KB_MATCH: material");
          } else if (lowerInput.includes("origin")) {
            response = `The origin is: ${details.origin}`;
            foundMatch = true;
            console.log("IMAGE_KB_MATCH: origin");
          } else if (lowerInput.includes("how") && (lowerInput.includes("make") || lowerInput.includes("create"))) {
            response = `The making process: ${details.making}`;
            foundMatch = true;
            console.log("IMAGE_KB_MATCH: how make/create");
          }
        }
      }
    }

    if (!foundMatch) {
      console.log("HANDLE_BOT_RESPONSE (General KB): Searching general knowledge base.");
      const categoriesToSearch = [];
      if (userType) {
        categoriesToSearch.push(...Object.entries(knowledgeBase[userType]));
      }
      categoriesToSearch.push(...Object.entries(knowledgeBase.general));
      categoriesToSearch.push(...Object.entries(knowledgeBase.platform));

      for (const [_, topicData] of categoriesToSearch) { // Key (like "about_ceylon") is not directly used for matching now
        if (topicData && Array.isArray(topicData.keywords)) {
          if (topicData.keywords.some(kw => lowerInput.includes(kw))) {
            response = topicData.answer;
            foundMatch = true;
            console.log("GENERAL_KB_MATCH: Matched keywords:", topicData.keywords.filter(kw => lowerInput.includes(kw)).join(', '), "for answer:", topicData.answer);
            break;
          }
        }
      }
    }

    if (!foundMatch) {
      console.log("HANDLE_BOT_RESPONSE: No specific match found. Using fallback.");
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

    if (userType && response.length < 150 && !messages.slice(-1)[0]?.options) {
      replyOptions = quickReplies[userType];
    }

    setTimeout(() => {
      addBotMessage(response, replyOptions);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const analyzeImage = (file) => {
    return new Promise((resolve) => {
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

    try {
      const analysis = await analyzeImage(file);
      
      addUserMessage("(Image attached)", true, analysis.imageUrl, analysis.recognizedAs);

      setTimeout(() => {
        addBotMessage(
          `I recognize this as ${analysis.recognizedAs.replace('-', ' ')}. ` +
          `${analysis.details[userType] || analysis.details.customer} ` +
          `Would you like to know more about the materials or origin?`,
          ["Tell me about materials", "What's the origin?", "How is this made?"]
        );
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      addBotMessage("Sorry, I couldn't analyze that image. Please try another or ask your question in text.");
      setIsTyping(false);
    }
    e.target.value = null;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messaging-center">
      <div className="title-section">
        <h1>Messaging Center</h1>
        <p>AI-powered assistance for Ceylon Creations</p>
        {userType && (
            <div className="top-controls">
                <button onClick={toggleTTS} className="tts-toggle-btn icon-btn" title={isTTSEnabled ? "Mute Voice" : "Unmute Voice"}>
                    <img src={isTTSEnabled ? SpeakerIcon : SpeakerMuteIcon} alt={isTTSEnabled ? "Mute TTS" : "Unmute TTS"} />
                </button>
                {isTTSEnabled && synthRef.current?.speaking && (
                    <button onClick={stopSpeaking} className="stop-speak-btn icon-btn" title="Stop Speaking">
                        <img src={StopIcon} alt="Stop Speaking" />
                    </button>
                )}
            </div>
        )}
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
                      src={userType === "artisan" ? ArtisanIcon : (userType === "customer" ? CustomerIcon : BotIcon) }
                      alt={userType || "User"}
                      className="avatar"
                    />
                  )}
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
                <div className="message-content">
                  {message.isImage && message.imageUrl ? (
                    <div className="attached-image">
                      <img src={message.imageUrl} alt="Uploaded content" />
                       {message.recognizedAs && <span className="recognized-as-tag">Recognized: {message.recognizedAs.replace('-', ' ')}</span>}
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
                className="attach-btn icon-btn"
                onClick={() => fileInputRef.current.click()}
                title="Attach image"
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
                placeholder={isListening ? "Listening..." : `Ask or type as a ${userType}...`}
                disabled={isListening}
              />
              {speechRecognitionRef.current && (
                <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`mic-btn icon-btn ${isListening ? "listening" : ""}`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                >
                    <img src={MicrophoneIcon} alt="Voice input" />
                </button>
              )}
              <button type="submit" className="send-btn" disabled={!inputMessage.trim() && !isListening} title="Send message">
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
              <p className="user-role">{userType.charAt(0).toUpperCase() + userType.slice(1)}</p>
              <p className="user-status">Online</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingCenter;
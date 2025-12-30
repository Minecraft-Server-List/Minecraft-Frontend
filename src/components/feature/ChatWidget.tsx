import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  username: string;
  avatar: string;
  timestamp: string;
}

interface ChatRoom {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  online: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: 1,
      name: 'General Chat',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20community%20chat%20icon%20with%20colorful%20blocks%20simple%20clean%20background%20game%20style%20illustration&width=100&height=100&seq=chat1&orientation=squarish',
      lastMessage: 'Anyone want to join our server?',
      unread: 3,
      online: true
    },
    {
      id: 2,
      name: 'Server Owners',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20server%20admin%20crown%20icon%20with%20golden%20elements%20simple%20clean%20background%20game%20style%20illustration&width=100&height=100&seq=chat2&orientation=squarish',
      lastMessage: 'New plugin recommendations?',
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Trading Hub',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20trading%20chest%20icon%20with%20emeralds%20simple%20clean%20background%20game%20style%20illustration&width=100&height=100&seq=chat3&orientation=squarish',
      lastMessage: 'Selling diamond armor set',
      unread: 1,
      online: false
    },
    {
      id: 4,
      name: 'PvP Arena',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20pvp%20sword%20and%20shield%20icon%20with%20red%20elements%20simple%20clean%20background%20game%20style%20illustration&width=100&height=100&seq=chat4&orientation=squarish',
      lastMessage: 'Tournament starts in 10 mins!',
      unread: 5,
      online: true
    },
    {
      id: 5,
      name: 'Creative Builders',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20building%20blocks%20icon%20with%20colorful%20elements%20simple%20clean%20background%20game%20style%20illustration&width=100&height=100&seq=chat5&orientation=squarish',
      lastMessage: 'Check out my new build!',
      unread: 0,
      online: true
    },
    {
      id: 6,
      name: 'Redstone Engineers',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20redstone%20circuit%20icon%20with%20red%20elements%20simple%20clean%20background%20game%20style%20illustration&width=100&height=100&seq=chat6&orientation=squarish',
      lastMessage: 'Need help with piston door',
      unread: 0,
      online: false
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hey everyone! Welcome to the chat!',
      sender: 'other',
      username: 'CraftMaster',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20player%20avatar%20with%20blue%20shirt%20simple%20clean%20background%20game%20style%20illustration&width=80&height=80&seq=user1&orientation=squarish',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      text: 'Anyone want to join our survival server?',
      sender: 'other',
      username: 'BuilderPro',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20player%20avatar%20with%20green%20shirt%20simple%20clean%20background%20game%20style%20illustration&width=80&height=80&seq=user2&orientation=squarish',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      text: 'Sure! What\'s the IP address?',
      sender: 'user',
      username: 'You',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20player%20avatar%20with%20red%20shirt%20simple%20clean%20background%20game%20style%20illustration&width=80&height=80&seq=user3&orientation=squarish',
      timestamp: '10:33 AM'
    },
    {
      id: 4,
      text: 'It\'s mc.survival.net - we have custom plugins and events every weekend!',
      sender: 'other',
      username: 'BuilderPro',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20player%20avatar%20with%20green%20shirt%20simple%20clean%20background%20game%20style%20illustration&width=80&height=80&seq=user2&orientation=squarish',
      timestamp: '10:34 AM'
    },
    {
      id: 5,
      text: 'Awesome! I\'ll join tonight 🎮',
      sender: 'user',
      username: 'You',
      avatar: 'https://readdy.ai/api/search-image?query=minecraft%20player%20avatar%20with%20red%20shirt%20simple%20clean%20background%20game%20style%20illustration&width=80&height=80&seq=user3&orientation=squarish',
      timestamp: '10:35 AM'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageInput,
        sender: 'user',
        username: 'You',
        avatar: 'https://readdy.ai/api/search-image?query=minecraft%20player%20avatar%20with%20red%20shirt%20simple%20clean%20background%20game%20style%20illustration&width=80&height=80&seq=user3&orientation=squarish',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openChatRoom = (room: ChatRoom) => {
    setSelectedRoom(room);
    setIsChatOpen(true);
    setIsOpen(false);
  };

  const backToRooms = () => {
    setIsChatOpen(false);
    setIsOpen(true);
    setSelectedRoom(null);
  };

  const totalUnread = chatRooms.reduce((sum, room) => sum + room.unread, 0);
  const onlineUsers = chatRooms.filter(room => room.online);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          if (isChatOpen) {
            setIsChatOpen(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
      >
        {isOpen || isChatOpen ? (
          <i className="ri-close-line text-2xl"></i>
        ) : (
          <>
            <i className="ri-messenger-line text-2xl"></i>
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                {totalUnread > 9 ? '9+' : totalUnread}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Rooms List */}
      {isOpen && !isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Messages</h3>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <i className="ri-settings-3-line text-gray-700 text-xl"></i>
              </button>
            </div>

            {/* Online Users */}
            {onlineUsers.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {onlineUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => openChatRoom(user)}
                    className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-0.5 bg-white">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-3 border-white rounded-full"></span>
                    </div>
                    <span className="text-xs text-gray-700 font-medium max-w-[70px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="px-6 py-3 border-b border-gray-200">
            <div className="relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-full text-sm text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-200 transition-colors"
              />
            </div>
          </div>

          {/* Chat Rooms */}
          <div className="max-h-[450px] overflow-y-auto">
            {chatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => openChatRoom(room)}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img
                      src={room.avatar}
                      alt={room.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {room.online && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-3 border-white rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-base truncate">
                      {room.name}
                    </h4>
                    {room.unread > 0 && (
                      <span className="flex-shrink-0 ml-2 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {room.unread}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm truncate ${room.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {room.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isChatOpen && selectedRoom && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slideUp border border-gray-200">
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3 bg-white">
            <button
              onClick={backToRooms}
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-gray-900 text-xl"></i>
            </button>

            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img
                  src={selectedRoom.avatar}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {selectedRoom.online && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base truncate">{selectedRoom.name}</h3>
              <p className="text-xs text-gray-500">
                {selectedRoom.online ? 'Active now' : 'Offline'}
              </p>
            </div>

            <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <i className="ri-phone-line text-gray-700 text-xl"></i>
            </button>

            <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <i className="ri-vidicon-line text-gray-700 text-xl"></i>
            </button>

            <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <i className="ri-information-line text-gray-700 text-xl"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
            {messages.map((message, index) => {
              const showAvatar = message.sender === 'other' && 
                (index === messages.length - 1 || messages[index + 1]?.sender !== 'other' || messages[index + 1]?.username !== message.username);
              
              const isFirstInGroup = index === 0 || 
                messages[index - 1]?.sender !== message.sender || 
                messages[index - 1]?.username !== message.username;

              return (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} ${isFirstInGroup ? 'mt-3' : 'mt-0.5'}`}
                >
                  {message.sender === 'other' ? (
                    showAvatar ? (
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={message.avatar}
                          alt={message.username}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-7 flex-shrink-0"></div>
                    )
                  ) : null}

                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    <div
                      className={`px-4 py-2.5 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white rounded-3xl rounded-tr-md'
                          : 'bg-gray-100 text-gray-900 rounded-3xl rounded-tl-md'
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed break-words">{message.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="px-5 py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex-shrink-0">
                <i className="ri-add-circle-line text-2xl"></i>
              </button>

              <button className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex-shrink-0">
                <i className="ri-image-line text-xl"></i>
              </button>

              <button className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex-shrink-0">
                <i className="ri-mic-line text-xl"></i>
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message..."
                  className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-[15px] text-gray-900 placeholder-gray-500 outline-none focus:bg-gray-200 transition-colors"
                />
              </div>

              {messageInput.trim() ? (
                <button
                  onClick={handleSendMessage}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-[15px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Send
                </button>
              ) : (
                <button className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex-shrink-0">
                  <i className="ri-thumb-up-line text-xl"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

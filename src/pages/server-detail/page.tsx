import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/api/axios'; // 절대 경로 API 인스턴스
import Navbar from '../servers/components/Navbar';
import Footer from '../servers/components/Footer';

// 백엔드 엔티티 구조에 맞춘 인터페이스 정의
interface GameMode {
  name: string;
  players: number;
  description: string;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Staff {
  name: string;
  role: string;
  avatar: string;
}

interface ServerDetail {
  id: number;
  name: string;
  description: string;
  domain: string;
  port: string;
  currentPlayers: number;
  maxPlayers: number;
  version: string;
  status: 'online' | 'offline';
  
  longDescription?: string;
  bannerImage?: string;
  logoImage?: string;
  website?: string;
  discord?: string;
  uptime?: string;
  location?: string;
  openDate?: string;
  tags?: string[];
  gameModes?: GameMode[];
  screenshots?: string[];
  staff?: Staff[];
  rules?: string[];
  reviews?: Review[];
}

export default function ServerDetailPage() {
  const { id } = useParams(); // URL에서 서버 ID 추출
  const [server, setServer] = useState<ServerDetail | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 백엔드 데이터 불러오기
  useEffect(() => {
    const fetchServerDetail = async () => {
      try {
        setIsLoading(true);
        // 백엔드 API 호출: 예) GET /api/servers/1
        const response = await api.get(`/api/servers/${id}`);
        setServer(response.data);
      } catch (error) {
        console.error("서버 상세 정보를 가져오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchServerDetail();
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 로딩 중 화면
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">서버 정보를 야미하게 가져오는 중...</p>
      </div>
    );
  }

  // 데이터가 없을 경우
  if (!server) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">존재하지 않는 서버입니다.</p>
      </div>
    );
  }

  const playerPercentage = (server.currentPlayers / server.maxPlayers) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Banner */}
      <div className="relative w-full h-96 overflow-hidden mt-20">
        <img
          src={server.bannerImage?.startsWith('http') 
            ? server.bannerImage 
            : server.bannerImage 
              ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${server.bannerImage}`
              : 'https://via.placeholder.com/1200x400?text=No+Banner'} // 데이터가 아예 없을 때 기본 이미지
          alt={server.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-2xl flex-shrink-0">
                <img
                  src={server.logoImage?.startsWith('http')
                    ? server.logoImage
                    : server.logoImage
                      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${server.logoImage}`
                      : 'https://via.placeholder.com/100x100?text=No+Logo'}
                  alt={server.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">{server.name}</h1>
                  <span className={`px-3 py-1.5 text-sm font-bold rounded-full ${
                    server.status === 'online' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    <i className="ri-circle-fill text-xs mr-1"></i>
                    {server.status === 'online' ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
                <p className="text-lg text-gray-200 mb-3">{server.description}</p>
                <div className="flex flex-wrap gap-2">
                  {server.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'overview', label: '개요', icon: 'ri-information-line' },
                  { id: 'gamemodes', label: '게임 모드', icon: 'ri-gamepad-line' },
                  { id: 'screenshots', label: '스크린샷', icon: 'ri-image-line' },
                  { id: 'reviews', label: '리뷰', icon: 'ri-star-line' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <i className={`${tab.icon} text-lg`}></i>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">서버 소개</h3>
                      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {server.description}
                      </div>
                    </div>

                    {server.rules && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">서버 규칙</h3>
                        <ul className="space-y-2">
                          {server.rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700">
                              <i className="ri-checkbox-circle-fill text-emerald-600 text-lg mt-0.5"></i>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {server.staff && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">운영진</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {server.staff.map((member, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 text-sm">{member.name}</div>
                                <div className="text-xs text-gray-600">{member.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Game Modes Tab */}
                {activeTab === 'gamemodes' && (
                  <div className="space-y-4">
                    {server.gameModes?.map((mode, index) => (
                      <div key={index} className="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{mode.name}</h4>
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-user-line"></i>
                            {mode.players} 플레이어
                          </span>
                        </div>
                        <p className="text-gray-700">{mode.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Screenshots Tab */}
                {activeTab === 'screenshots' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {server.screenshots?.map((screenshot, index) => (
                      <div key={index} className="relative w-full h-64 rounded-xl overflow-hidden group cursor-pointer">
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <i className="ri-zoom-in-line text-4xl text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {server.reviews?.map((review, index) => (
                      <div key={index} className="p-5 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{review.user}</div>
                              <div className="text-xs text-gray-500">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`${
                                  i < review.rating ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'
                                } text-lg`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}

                    <button className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer">
                      리뷰 작성하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">서버 정보</h3>

              {/* IP Address */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-600 mb-2 block">서버 주소</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg font-mono text-sm text-gray-900 border border-gray-200">
                    {server.domain}
                  </div>
                  <button
                    onClick={() => copyToClipboard(server.ip)}
                    className="w-11 h-11 flex items-center justify-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex-shrink-0"
                    title="복사"
                  >
                    <i className={`${copied ? 'ri-check-line' : 'ri-file-copy-line'} text-lg`}></i>
                  </button>
                </div>
              </div>

              {/* Players Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">플레이어</span>
                  <span className="text-sm font-bold text-gray-900">
                    {(server.currentPlayers || 0).toLocaleString()} / {(server.maxPlayers || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(playerPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Server Stats Table */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">버전</span>
                  <span className="text-sm font-bold text-gray-900">{server.version}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">카테고리</span>
                  <span className="text-sm font-bold text-gray-900">{server.category}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">위치</span>
                  <span className="text-sm font-bold text-gray-900">{server.location}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">가동률</span>
                  <span className="text-sm font-bold text-green-600">{server.uptime}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">오픈일</span>
                  <span className="text-sm font-bold text-gray-900">{server.openDate}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">총 투표</span>
                  <span className="text-sm font-bold text-gray-900">{(server.votes || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                  <i className="ri-heart-line text-lg"></i>
                  투표하기
                </button>
                
                {server.website && (
                  <a href={server.website} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 text-center">
                    <i className="ri-global-line text-lg mr-2"></i>
                    웹사이트 방문
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
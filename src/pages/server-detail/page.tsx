import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/api/axios'; 
import Navbar from '../servers/components/Navbar';
import Footer from '../servers/components/Footer';

// 인터페이스는 SQL 필드명에 맞춰 유지합니다.
interface ServerDetail {
  serverId: number;
  name: string;
  description: string;
  domain: string;
  port: string;
  currentPlayers: number;
  maxPlayers: number;
  version: string;
  status: string;
  fileName?: string; // server_image 테이블 연동
  likeCount?: number; // likes_count 테이블 연동
  categories?: string[];
  website?: string;
  discord?: string;
  uptime?: string;
  location?: string;
  openDate?: string;
  tags?: string[];
}

export default function ServerDetailPage() {
  const { id } = useParams();
  const [server, setServer] = useState<ServerDetail | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServerDetail = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/servers/${id}`);
        setServer(response.data);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchServerDetail();
  }, [id]);

  const copyToClipboard = (text: string) => {
    if(!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  if (!server) return <div className="min-h-screen flex items-center justify-center">서버 정보가 없습니다.</div>;

  const playerPercentage = ((server.currentPlayers || 0) / (server.maxPlayers || 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Banner - 기존 스타일 복구 */}
      <div className="relative w-full h-96 overflow-hidden mt-20">
        <img
          src={server.fileName 
            ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${server.fileName}` 
            : 'https://via.placeholder.com/1200x400'}
          alt={server.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-2xl flex-shrink-0">
                <img
                  src={server.fileName 
                    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${server.fileName}` 
                    : 'https://public.readdy.ai/ai/img_res/e131358c-8d1e-4f3d-ab52-30b4e08151d5.png'}
                  alt={server.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">{server.name}</h1>
                  <span className={`px-3 py-1.5 text-sm font-bold rounded-full ${
                    server.status?.toLowerCase() === 'online' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    <i className="ri-circle-fill text-xs mr-1"></i>
                    {(server.status || 'OFFLINE').toUpperCase()}
                  </span>
                </div>
                <p className="text-lg text-gray-200 mb-3">{server.description?.slice(0, 100)}...</p>
                <div className="flex flex-wrap gap-2">
                  {(server.tags || ['Minecraft']).map((tag, index) => (
                    <span key={index} className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
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
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">서버 소개</h3>
                      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {server.description}
                      </div>
                    </div>
                  </div>
                )}
                {/* 다른 탭 데이터는 백엔드 확장에 따라 추가 가능 */}
              </div>
            </div>
          </div>

          {/* Sidebar - 기존 스타일 복구 */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">서버 정보</h3>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-600 mb-2 block">서버 주소</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg font-mono text-sm text-gray-900 border border-gray-200">
                    {server.domain}
                  </div>
                  <button
                    onClick={() => copyToClipboard(server.domain)}
                    className="w-11 h-11 flex items-center justify-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex-shrink-0"
                  >
                    <i className={`${copied ? 'ri-check-line' : 'ri-file-copy-line'} text-lg`}></i>
                  </button>
                </div>
              </div>

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

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">버전</span>
                  <span className="text-sm font-bold text-gray-900">{server.version}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">총 투표</span>
                  <span className="text-sm font-bold text-gray-900">{(server.likeCount || 0).toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                투표하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
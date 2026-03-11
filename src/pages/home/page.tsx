import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/axios'; 
import LoginModal from '@/components/feature/LoginModal';
import AddServerModal from '@/components/feature/AddServerModal';
import Footer from '../../components/layout/Footer';

interface MinecraftServer {
  serverId: number;
  name: string;
  imageUrl?: string;
  currentPlayers: number;
  maxPlayers: number;
  version: string;
  status: 'ONLINE' | 'OFFLINE';
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddServerModal, setShowAddServerModal] = useState(false);
  
  const [featuredServers, setFeaturedServers] = useState<MinecraftServer[]>([]);
  const [topServers, setTopServers] = useState<MinecraftServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/servers');
        const data = response.data;
        setFeaturedServers(data.slice(0, 3)); 
        setTopServers(data.slice(0, 5));     
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/servers?search=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = '/servers';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://public.readdy.ai/ai/img_res/e131358c-8d1e-4f3d-ab52-30b4e08151d5.png" 
                alt="CraftConnect Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-gray-900">마인허브</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/servers" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">서버</Link>
              <Link to="/servers" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">커뮤니티</Link>
              <a href="#news" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">뉴스</a>
              <a href="#support" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">지원</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="hidden md:block px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                로그인
              </button>
              <button 
                onClick={() => setShowAddServerModal(true)}
                className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                서버 등록
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            완벽한 마인크래프트 서버를 찾아보세요
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            수천 개의 마인크래프트 서버를 탐색하고 전 세계 플레이어들과 연결하세요.
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="서버 검색 (예: 생존, 전투, 창조)"
                className="flex-1 px-4 py-3 text-base text-gray-900 placeholder-gray-500 outline-none"
              />
              <button 
                onClick={handleSearch}
                className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                검색
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Servers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">추천 서버</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-3 py-10">데이터 로딩 중...</div>
            ) : (
              featuredServers.map((server) => (
                <Link key={server.serverId} to={`/servers/${server.serverId}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative w-full h-56 overflow-hidden">
                      <img 
                        src={server.imageUrl ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${server.imageUrl}` : 'https://placehold.co/400x300/22c55e/ffffff?text=Minecraft+Server'} 
                        alt={server.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600">{server.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">{server.currentPlayers.toLocaleString()}명 접속</span>
                        <span className="text-gray-600 font-medium">{server.version}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Top Ranked Servers */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">인기 순위 서버</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {topServers.map((server, index) => (
              <div key={server.serverId} className="flex items-center gap-6 p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{server.name}</h3>
                  <div className="text-sm text-gray-600">{server.currentPlayers} / {server.maxPlayers} 접속중</div>
                </div>
                <Link to={`/servers/${server.serverId}`} className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">자세히 보기</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
        
      {/* Footer */}
      <Footer/>

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <AddServerModal isOpen={showAddServerModal} onClose={() => setShowAddServerModal(false)} />
    </div>
  );
}
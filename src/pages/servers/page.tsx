import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '@/api/axios'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServerCard from './components/ServerCard';
import FilterSidebar from './components/FilterSidebar';

interface MinecraftServer {
  serverId: number;
  name: string;
  description: string;
  status: 'ONLINE' | 'OFFLINE';
  version: string;
  domain: string;
  currentPlayers: number;
  maxPlayers: number;
  votes: number;
  fileName?: string;
  categories?: string[]; // DTO의 List<String> 대응
}

export default function ServersPage() {
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  const [allServers, setAllServers] = useState<MinecraftServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/servers');
        const data = response.data;
        if (Array.isArray(data)) {
          // normalize server objects to ensure categories is string[] and serverId exists
          const normalized = (data as any[]).map((s) => ({
            ...s,
            serverId: s.serverId ?? s.id ?? s.server_id ?? s.serverId,
            categories: (s.categories || s.tags || s.categoryList || []).map((c: any) =>
              typeof c === 'string' ? c : (c.name ?? String(c.category_id ?? c.id ?? c.categoryId ?? ''))
            ),
          }));
          setAllServers(normalized as MinecraftServer[]);
        } else if (Array.isArray(data?.content)) {
          const normalized = (data.content as any[]).map((s) => ({
            ...s,
            serverId: s.serverId ?? s.id ?? s.server_id,
            categories: (s.categories || s.tags || s.categoryList || []).map((c: any) =>
              typeof c === 'string' ? c : (c.name ?? String(c.category_id ?? c.id ?? c.categoryId ?? ''))
            ),
          }));
          setAllServers(normalized as MinecraftServer[]);
        } else if (Array.isArray(data?.data)) {
          const normalized = (data.data as any[]).map((s) => ({
            ...s,
            serverId: s.serverId ?? s.id ?? s.server_id,
            categories: (s.categories || s.tags || s.categoryList || []).map((c: any) =>
              typeof c === 'string' ? c : (c.name ?? String(c.category_id ?? c.id ?? c.categoryId ?? ''))
            ),
          }));
          setAllServers(normalized as MinecraftServer[]);
        } else if (Array.isArray(data?.servers)) {
          const normalized = (data.servers as any[]).map((s) => ({
            ...s,
            serverId: s.serverId ?? s.id ?? s.server_id,
            categories: (s.categories || s.tags || s.categoryList || []).map((c: any) =>
              typeof c === 'string' ? c : (c.name ?? String(c.category_id ?? c.id ?? c.categoryId ?? ''))
            ),
          }));
          setAllServers(normalized as MinecraftServer[]);
        } else {
          console.error('서버 목록 응답이 배열이 아닙니다:', data);
          setAllServers([]);
        }
      } catch (error) {
        console.error("서버 목록 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServers();
  }, []);

  const filteredServers = allServers.filter(server => {
  const matchesSearch = (server.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (server.description || '').toLowerCase().includes(searchQuery.toLowerCase());
  
  const matchesCategory = 
    selectedCategory === 'all' ||
    (server.categories || []).some(cat => 
      cat.toLowerCase() === selectedCategory.toLowerCase()
    );
  
  
  return matchesSearch && matchesCategory;
});

  const sortedServers = [...filteredServers].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.currentPlayers || 0) - (a.currentPlayers || 0);
      case 'votes':
        return (b.votes || 0) - (a.votes || 0);
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            마인크래프트 서버 목록
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            {isLoading ? '서버를 찾는 중...' : `${filteredServers.length}개의 서버를 찾았습니다`}
          </p>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-xl">
              <i className="ri-search-line text-xl text-gray-400 ml-3"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="서버 이름이나 설명으로 검색..."
                className="flex-1 px-2 py-3 text-base text-gray-900 placeholder-gray-500 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-500"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              serverCount={allServers.length}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="ri-filter-line text-lg"></i>
                <span className="text-sm font-medium">필터</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">정렬:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 outline-none hover:border-gray-400 cursor-pointer"
                >
                  <option value="popular">인기순</option>
                  <option value="votes">투표순</option>
                  <option value="name">이름순</option>
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="lg:hidden mb-6 p-6 bg-white rounded-xl shadow-lg">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  serverCount={allServers.length}
                />
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-20 text-gray-500">데이터를 불러오는 중...</div>
            ) : sortedServers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedServers.map((server) => (
                  <ServerCard key={server.serverId} server={server} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600">다른 검색어나 필터를 시도해보세요</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServerCard from './components/ServerCard';
import FilterSidebar from './components/FilterSidebar';

export default function ServersPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedVersion, setSelectedVersion] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const servers = [
    {
      id: 1,
      name: 'HyperCraft Network',
      description: '최고의 미니게임과 서바이벌 경험을 제공하는 대형 네트워크 서버입니다. 매일 수천 명의 플레이어가 접속합니다.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20modern%20network%20server%20hub%20with%20colorful%20portals%20and%20futuristic%20buildings%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server1&orientation=landscape',
      players: 5234,
      maxPlayers: 10000,
      version: '1.20.4',
      category: 'Network',
      votes: 12847,
      status: 'online',
      tags: ['Minigames', 'Survival', 'Economy'],
      uptime: '99.9%'
    },
    {
      id: 2,
      name: 'PixelMine Server',
      description: '픽셀몬과 서바이벌이 결합된 독특한 서버. 포켓몬을 잡고 키우면서 마인크래프트를 즐기세요.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20pixelmon%20server%20with%20pokemon%20creatures%20and%20colorful%20landscape%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server2&orientation=landscape',
      players: 4891,
      maxPlayers: 8000,
      version: '1.20.4',
      category: 'Modded',
      votes: 11203,
      status: 'online',
      tags: ['Pixelmon', 'Adventure', 'Custom'],
      uptime: '99.5%'
    },
    {
      id: 3,
      name: 'SkyBlock Legends',
      description: '전통적인 스카이블록에 RPG 요소를 더한 혁신적인 서버. 섬을 발전시키고 보스를 처치하세요.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20skyblock%20floating%20islands%20in%20the%20sky%20with%20trees%20and%20buildings%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server3&orientation=landscape',
      players: 4567,
      maxPlayers: 7000,
      version: '1.20.4',
      category: 'Skyblock',
      votes: 10892,
      status: 'online',
      tags: ['Skyblock', 'RPG', 'Custom Items'],
      uptime: '99.8%'
    },
    {
      id: 4,
      name: 'PvP Arena Pro',
      description: '최고의 PvP 경험을 원한다면 이곳! 다양한 킷과 맵에서 실력을 겨루세요.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20pvp%20arena%20battle%20ground%20with%20weapons%20and%20combat%20area%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server4&orientation=landscape',
      players: 3982,
      maxPlayers: 5000,
      version: '1.20.4',
      category: 'PvP',
      votes: 9654,
      status: 'online',
      tags: ['PvP', 'KitPvP', 'Duels'],
      uptime: '99.7%'
    },
    {
      id: 5,
      name: 'Faction Wars',
      description: '팩션을 만들고 영토를 확장하세요. 전략과 협동이 필요한 대규모 전쟁 서버입니다.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20faction%20war%20server%20with%20castles%20and%20battle%20flags%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server5&orientation=landscape',
      players: 3745,
      maxPlayers: 6000,
      version: '1.20.4',
      category: 'Faction',
      votes: 8932,
      status: 'online',
      tags: ['Factions', 'Raiding', 'PvP'],
      uptime: '99.6%'
    },
    {
      id: 6,
      name: 'Creative Paradise',
      description: '무제한 블록과 월드에딧으로 상상력을 마음껏 펼치세요. 건축가들의 천국입니다.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20creative%20building%20world%20with%20amazing%20colorful%20structures%20and%20architecture%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server6&orientation=landscape',
      players: 2156,
      maxPlayers: 4000,
      version: '1.20.4',
      category: 'Creative',
      votes: 7821,
      status: 'online',
      tags: ['Creative', 'Building', 'WorldEdit'],
      uptime: '99.9%'
    },
    {
      id: 7,
      name: 'Prison Escape',
      description: '광산을 파고 랭크를 올려 자유를 얻으세요. 중독성 강한 프리즌 서버입니다.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20prison%20server%20with%20cells%20and%20mining%20areas%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server7&orientation=landscape',
      players: 2847,
      maxPlayers: 5000,
      version: '1.20.4',
      category: 'Prison',
      votes: 6543,
      status: 'online',
      tags: ['Prison', 'Mining', 'Rankup'],
      uptime: '99.4%'
    },
    {
      id: 8,
      name: 'Survival Plus',
      description: '바닐라 서바이벌에 커스텀 인챈트와 보스를 추가한 향상된 서바이벌 경험.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20enhanced%20survival%20server%20with%20villages%20and%20nature%20landscape%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server8&orientation=landscape',
      players: 3421,
      maxPlayers: 6000,
      version: '1.20.4',
      category: 'Survival',
      votes: 8765,
      status: 'online',
      tags: ['Survival', 'Custom Enchants', 'Bosses'],
      uptime: '99.8%'
    },
    {
      id: 9,
      name: 'Roleplay City',
      description: '현실적인 도시에서 직업을 가지고 생활하세요. 경찰, 의사, 사업가 등 다양한 역할 체험.',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20modern%20city%20roleplay%20server%20with%20buildings%20and%20streets%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=server9&orientation=landscape',
      players: 1923,
      maxPlayers: 3000,
      version: '1.20.4',
      category: 'Roleplay',
      votes: 5432,
      status: 'online',
      tags: ['Roleplay', 'Jobs', 'Economy'],
      uptime: '99.3%'
    }
  ];

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         server.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || server.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesVersion = selectedVersion === 'all' || server.version === selectedVersion;
    
    return matchesSearch && matchesCategory && matchesVersion;
  });

  const sortedServers = [...filteredServers].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.players - a.players;
      case 'votes':
        return b.votes - a.votes;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            마인크래프트 서버 목록
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            {filteredServers.length}개의 서버를 찾았습니다
          </p>

          {/* Search Bar */}
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
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedVersion={selectedVersion}
              setSelectedVersion={setSelectedVersion}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-filter-line text-lg"></i>
                <span className="text-sm font-medium">필터</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">정렬:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 cursor-pointer outline-none hover:border-gray-400 transition-colors"
                >
                  <option value="popular">인기순</option>
                  <option value="votes">투표순</option>
                  <option value="name">이름순</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-6 bg-white rounded-xl shadow-lg">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedVersion={selectedVersion}
                  setSelectedVersion={setSelectedVersion}
                />
              </div>
            )}

            {/* Server Grid */}
            {sortedServers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedServers.map((server) => (
                  <ServerCard key={server.id} server={server} />
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

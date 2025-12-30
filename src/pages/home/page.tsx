import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../../components/feature/LoginModal';
import AddServerModal from '../../components/feature/AddServerModal';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddServerModal, setShowAddServerModal] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.REACT_APP_NAVIGATE(`/servers?search=${encodeURIComponent(searchQuery)}`);
    } else {
      window.REACT_APP_NAVIGATE('/servers');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const featuredServers = [
    {
      id: 1,
      name: 'SurvivalCraft',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20survival%20server%20landscape%20with%20wooden%20houses%20and%20green%20forests%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=survival1&orientation=landscape',
      players: '2,847',
      version: '1.20.4',
      type: 'Survival',
      color: 'bg-emerald-100'
    },
    {
      id: 2,
      name: 'CreativeBuild',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20creative%20building%20server%20with%20colorful%20modern%20structures%20and%20blue%20sky%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=creative1&orientation=landscape',
      players: '1,523',
      version: '1.20.4',
      type: 'Creative',
      color: 'bg-sky-100'
    },
    {
      id: 3,
      name: 'AdventureQuest',
      image: 'https://readdy.ai/api/search-image?query=minecraft%20adventure%20quest%20server%20with%20medieval%20castle%20and%20mountains%20simple%20clean%20background%20game%20style%20illustration&width=400&height=300&seq=adventure1&orientation=landscape',
      players: '3,192',
      version: '1.20.4',
      type: 'Adventure',
      color: 'bg-amber-100'
    }
  ];

  const topServers = [
    { rank: 1, name: 'HyperCraft Network', players: '5,234', votes: '12,847' },
    { rank: 2, name: 'PixelMine Server', players: '4,891', votes: '11,203' },
    { rank: 3, name: 'SkyBlock Legends', players: '4,567', votes: '10,892' },
    { rank: 4, name: 'PvP Arena Pro', players: '3,982', votes: '9,654' },
    { rank: 5, name: 'Faction Wars', players: '3,745', votes: '8,932' }
  ];

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
              <span className="text-2xl font-bold text-gray-900">CraftConnect</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/servers" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">Servers</Link>
              <Link to="/servers" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">Community</Link>
              <a href="#news" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">News</a>
              <a href="#support" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">Support</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="hidden md:block px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Login
              </button>
              <button 
                onClick={() => setShowAddServerModal(true)}
                className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Add Server
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect Minecraft Server
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of Minecraft servers and connect with players worldwide. Discover new adventures and build your legacy.
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for servers (e.g., survival, pvp, creative)"
                className="flex-1 px-4 py-3 text-base text-gray-900 placeholder-gray-500 outline-none"
              />
              <button 
                onClick={handleSearch}
                className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <i className="ri-server-line text-2xl text-emerald-400"></i>
              <span className="text-base"><strong className="font-semibold">15,000+</strong> Servers</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <i className="ri-user-line text-2xl text-emerald-400"></i>
              <span className="text-base"><strong className="font-semibold">2M+</strong> Players</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <i className="ri-global-line text-2xl text-emerald-400"></i>
              <span className="text-base"><strong className="font-semibold">150+</strong> Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Servers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Servers</h2>
            <p className="text-lg text-gray-600">Handpicked servers with the best gameplay experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServers.map((server) => (
              <Link 
                key={server.id}
                to={`/servers/${server.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative w-full h-56 overflow-hidden">
                    <img 
                      src={server.image}
                      alt={server.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-sm font-medium text-gray-900 rounded-full">
                        {server.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                      {server.name}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <i className="ri-user-line text-lg"></i>
                        <span className="font-medium">{server.players} players</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <i className="ri-gamepad-line text-lg"></i>
                        <span className="font-medium">{server.version}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/servers"
              className="inline-block px-8 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              View All Servers
            </Link>
          </div>
        </div>
      </section>

      {/* Top Ranked Servers */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Ranked Servers</h2>
            <p className="text-lg text-gray-600">Most popular servers voted by the community</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {topServers.map((server, index) => (
              <Link
                key={server.rank}
                to={`/servers/${server.rank}`}
                className="flex items-center gap-6 p-6 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg ${
                  server.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                  server.rank === 2 ? 'bg-gray-200 text-gray-700' :
                  server.rank === 3 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  #{server.rank}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{server.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <i className="ri-user-line"></i>
                      {server.players} online
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-heart-line"></i>
                      {server.votes} votes
                    </span>
                  </div>
                </div>

                <button className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap">
                  Vote
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find servers that match your playstyle</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Survival', icon: 'ri-sword-line', color: 'emerald' },
              { name: 'Creative', icon: 'ri-brush-line', color: 'blue' },
              { name: 'PvP', icon: 'ri-shield-line', color: 'red' },
              { name: 'Skyblock', icon: 'ri-cloud-line', color: 'cyan' },
              { name: 'Prison', icon: 'ri-lock-line', color: 'orange' },
              { name: 'Faction', icon: 'ri-team-line', color: 'purple' },
              { name: 'Minigames', icon: 'ri-gamepad-line', color: 'pink' },
              { name: 'Roleplay', icon: 'ri-user-star-line', color: 'indigo' }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/servers?category=${category.name.toLowerCase()}`}
                className={`group p-8 bg-${category.color}-50 rounded-2xl hover:bg-${category.color}-100 transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-1`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-${category.color}-100 group-hover:bg-${category.color}-200 rounded-xl transition-colors`}>
                  <i className={`${category.icon} text-3xl text-${category.color}-600`}></i>
                </div>
                <h3 className={`text-lg font-bold text-gray-900 group-hover:text-${category.color}-600 transition-colors`}>
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Own a Minecraft Server?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
            List your server on CraftConnect and reach thousands of potential players. Boost your community and grow your server today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setShowAddServerModal(true)}
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer text-base"
            >
              Add Your Server
            </button>
            <button className="px-8 py-4 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap cursor-pointer text-base">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://public.readdy.ai/ai/img_res/e131358c-8d1e-4f3d-ab52-30b4e08151d5.png" 
                  alt="CraftConnect" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold text-white">CraftConnect</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                The ultimate platform to discover and connect with the best Minecraft servers worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-4">Servers</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Browse All</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Top Ranked</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">New Servers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Add Server</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-4">Community</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Forums</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Discord</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">News</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2025 CraftConnect. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                Powered by Readdy
              </a>
              <div className="flex items-center gap-4">
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-twitter-x-line text-lg"></i>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-discord-line text-lg"></i>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-youtube-line text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <AddServerModal isOpen={showAddServerModal} onClose={() => setShowAddServerModal(false)} />
    </div>
  );
}

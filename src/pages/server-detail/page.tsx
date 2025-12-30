
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../servers/components/Navbar';
import Footer from '../servers/components/Footer';

export default function ServerDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  // Mock data - 실제로는 API에서 가져올 데이터
  const server = {
    id: Number(id),
    name: 'HyperCraft Network',
    description: '최고의 미니게임과 서바이벌 경험을 제공하는 대형 네트워크 서버입니다. 매일 수천 명의 플레이어가 접속하며, 다양한 게임 모드와 이벤트를 즐길 수 있습니다.',
    longDescription: `HyperCraft Network는 2018년부터 운영되어 온 한국 최대 규모의 마인크래프트 네트워크 서버입니다. 

우리는 플레이어들에게 최상의 게임 경험을 제공하기 위해 끊임없이 노력하고 있으며, 전문 개발팀과 운영진이 24시간 서버를 관리하고 있습니다.

주요 특징:
• 안정적인 서버 운영 (99.9% 가동률)
• 정기적인 업데이트와 새로운 콘텐츠
• 친절한 커뮤니티와 활발한 이벤트
• 공정한 게임 환경 (안티치트 시스템)
• 빠른 고객 지원`,
    bannerImage: 'https://readdy.ai/api/search-image?query=minecraft%20epic%20server%20banner%20with%20modern%20hub%20lobby%20colorful%20portals%20and%20futuristic%20buildings%20wide%20panoramic%20view%20game%20style%20illustration&width=1200&height=400&seq=banner1&orientation=landscape',
    logoImage: 'https://public.readdy.ai/ai/img_res/e131358c-8d1e-4f3d-ab52-30b4e08151d5.png',
    ip: 'play.hypercraft.net',
    port: '25565',
    website: 'https://hypercraft.net',
    discord: 'https://discord.gg/hypercraft',
    players: 5234,
    maxPlayers: 10000,
    version: '1.20.4',
    category: 'Network',
    votes: 12847,
    status: 'online',
    uptime: '99.9%',
    location: '대한민국 (서울)',
    openDate: '2018년 3월',
    tags: ['Minigames', 'Survival', 'Economy', 'PvP', 'Custom'],
    gameModes: [
      { name: 'Survival', players: 1234, description: '바닐라 서바이벌에 커스텀 요소를 더한 모드' },
      { name: 'SkyBlock', players: 892, description: '섬을 발전시키고 보스를 처치하는 RPG 스카이블록' },
      { name: 'BedWars', players: 1567, description: '팀을 이루어 상대 침대를 파괴하는 PvP 게임' },
      { name: 'SkyWars', players: 743, description: '하늘 섬에서 펼쳐지는 생존 배틀' },
      { name: 'BuildBattle', players: 298, description: '주제에 맞춰 건축물을 만드는 창의력 게임' }
    ],
    screenshots: [
      'https://readdy.ai/api/search-image?query=minecraft%20server%20spawn%20lobby%20with%20modern%20architecture%20and%20colorful%20lights%20game%20style%20illustration&width=600&height=400&seq=screen1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=minecraft%20survival%20world%20with%20player%20builds%20and%20nature%20landscape%20game%20style%20illustration&width=600&height=400&seq=screen2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=minecraft%20bedwars%20arena%20with%20islands%20and%20bridges%20game%20style%20illustration&width=600&height=400&seq=screen3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=minecraft%20skywars%20floating%20islands%20battle%20arena%20game%20style%20illustration&width=600&height=400&seq=screen4&orientation=landscape'
    ],
    staff: [
      { name: 'Admin_Steve', role: '서버 관리자', avatar: 'https://readdy.ai/api/search-image?query=minecraft%20steve%20character%20head%20icon%20simple%20clean&width=100&height=100&seq=staff1&orientation=squarish' },
      { name: 'Mod_Alex', role: '운영진', avatar: 'https://readdy.ai/api/search-image?query=minecraft%20alex%20character%20head%20icon%20simple%20clean&width=100&height=100&seq=staff2&orientation=squarish' },
      { name: 'Helper_John', role: '헬퍼', avatar: 'https://readdy.ai/api/search-image?query=minecraft%20player%20character%20head%20icon%20simple%20clean&width=100&height=100&seq=staff3&orientation=squarish' }
    ],
    rules: [
      '해킹 및 치트 프로그램 사용 금지',
      '욕설 및 비방 금지',
      '광고 및 스팸 금지',
      '타인의 건축물 파괴 금지 (서바이벌 제외)',
      '버그 악용 금지',
      '운영진의 지시에 따를 것'
    ],
    reviews: [
      { user: 'Player123', rating: 5, comment: '정말 재미있는 서버예요! 미니게임이 다양하고 커뮤니티도 좋아요.', date: '2025-01-15' },
      { user: 'MinecraftFan', rating: 5, comment: '서버 안정성이 뛰어나고 렉이 거의 없어요. 강력 추천!', date: '2025-01-14' },
      { user: 'GamerKR', rating: 4, comment: '전반적으로 좋지만 가끔 사람이 너무 많아서 대기해야 해요.', date: '2025-01-13' }
    ]
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playerPercentage = (server.players / server.maxPlayers) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Banner */}
      <div className="relative w-full h-96 overflow-hidden mt-20">
        <img
          src={server.bannerImage}
          alt={server.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-2xl flex-shrink-0">
                <img
                  src={server.logoImage}
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
                  {server.tags.map((tag, index) => (
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
                        {server.longDescription}
                      </div>
                    </div>

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
                  </div>
                )}

                {/* Game Modes Tab */}
                {activeTab === 'gamemodes' && (
                  <div className="space-y-4">
                    {server.gameModes.map((mode, index) => (
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
                    {server.screenshots.map((screenshot, index) => (
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
                    {server.reviews.map((review, index) => (
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
            {/* Server Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">서버 정보</h3>

              {/* IP Address */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-600 mb-2 block">서버 주소</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg font-mono text-sm text-gray-900 border border-gray-200">
                    {server.ip}
                  </div>
                  <button
                    onClick={() => copyToClipboard(server.ip)}
                    className="w-11 h-11 flex items-center justify-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer flex-shrink-0"
                    title="복사"
                  >
                    <i className={`${copied ? 'ri-check-line' : 'ri-file-copy-line'} text-lg`}></i>
                  </button>
                </div>
              </div>

              {/* Players */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">플레이어</span>
                  <span className="text-sm font-bold text-gray-900">
                    {server.players.toLocaleString()} / {server.maxPlayers.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(playerPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
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
                  <span className="text-sm font-bold text-gray-900">{server.votes.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                  <i className="ri-heart-line text-lg"></i>
                  투표하기
                </button>
                
                {server.website && (
                  <a
                    href={server.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer text-center"
                  >
                    <i className="ri-global-line text-lg mr-2"></i>
                    웹사이트 방문
                  </a>
                )}
                
                {server.discord && (
                  <a
                    href={server.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer text-center"
                  >
                    <i className="ri-discord-line text-lg mr-2"></i>
                    디스코드 참여
                  </a>
                )}
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">공유하기</h3>
              <div className="flex items-center gap-3">
                <button className="flex-1 w-11 h-11 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-xl"></i>
                </button>
                <button className="flex-1 w-11 h-11 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  <i className="ri-twitter-x-fill text-xl"></i>
                </button>
                <button className="flex-1 w-11 h-11 flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                  <i className="ri-kakao-talk-fill text-xl"></i>
                </button>
                <button className="flex-1 w-11 h-11 flex items-center justify-center bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                  <i className="ri-link text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Servers */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">비슷한 서버</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link
                key={i}
                to={`/servers/${i + 10}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={`https://readdy.ai/api/search-image?query=minecraft%20server%20gameplay%20screenshot%20with%20players%20and%20builds%20game%20style%20illustration&width=400&height=300&seq=similar${i}&orientation=landscape`}
                    alt={`Similar Server ${i}`}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    Server Name {i}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <i className="ri-user-line"></i>
                      {(1000 + i * 100).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="ri-heart-line"></i>
                      {(5000 + i * 500).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

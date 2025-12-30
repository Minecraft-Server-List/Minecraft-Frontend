
interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedVersion: string;
  setSelectedVersion: (version: string) => void;
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedVersion,
  setSelectedVersion
}: FilterSidebarProps) {
  const categories = [
    { id: 'all', name: '전체', icon: 'ri-apps-line' },
    { id: 'survival', name: 'Survival', icon: 'ri-sword-line' },
    { id: 'creative', name: 'Creative', icon: 'ri-brush-line' },
    { id: 'pvp', name: 'PvP', icon: 'ri-shield-line' },
    { id: 'skyblock', name: 'Skyblock', icon: 'ri-cloud-line' },
    { id: 'prison', name: 'Prison', icon: 'ri-lock-line' },
    { id: 'faction', name: 'Faction', icon: 'ri-team-line' },
    { id: 'network', name: 'Network', icon: 'ri-server-line' },
    { id: 'modded', name: 'Modded', icon: 'ri-tools-line' },
    { id: 'roleplay', name: 'Roleplay', icon: 'ri-user-star-line' }
  ];

  const versions = [
    { id: 'all', name: '모든 버전' },
    { id: '1.20.4', name: '1.20.4' },
    { id: '1.20.3', name: '1.20.3' },
    { id: '1.20.2', name: '1.20.2' },
    { id: '1.19.4', name: '1.19.4' },
    { id: '1.18.2', name: '1.18.2' }
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl p-5 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">카테고리</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className={`${category.icon} text-lg`}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Versions */}
      <div className="bg-white rounded-xl p-5 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">버전</h3>
        <div className="space-y-1">
          {versions.map((version) => (
            <button
              key={version.id}
              onClick={() => setSelectedVersion(version.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedVersion === version.id
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{version.name}</span>
              {selectedVersion === version.id && (
                <i className="ri-check-line text-lg"></i>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 text-white">
        <h3 className="text-lg font-bold mb-4">통계</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-emerald-100">총 서버</span>
            <span className="font-bold">15,234</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-emerald-100">온라인 플레이어</span>
            <span className="font-bold">2.1M</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-emerald-100">오늘 투표</span>
            <span className="font-bold">45,678</span>
          </div>
        </div>
      </div>
    </div>
  );
}

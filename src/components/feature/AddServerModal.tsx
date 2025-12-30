import { useState } from 'react';

interface AddServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddServerModal({ isOpen, onClose }: AddServerModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serverName: '',
    serverIP: '',
    serverPort: '25565',
    version: '1.20.4',
    category: '',
    description: '',
    website: '',
    discord: '',
    bannerImage: '',
    logoImage: '',
    tags: [] as string[],
  });

  if (!isOpen) return null;

  const categories = [
    'Survival', 'Creative', 'PvP', 'Skyblock', 'Prison', 
    'Faction', 'Minigames', 'Roleplay', 'Network', 'Modded'
  ];

  const availableTags = [
    'Economy', 'Custom Items', 'RPG', 'Adventure', 'Building',
    'Raiding', 'KitPvP', 'Duels', 'Jobs', 'Quests'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Submit server:', formData);
      onClose();
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
        >
          <i className="ri-close-line text-2xl text-gray-600"></i>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 px-8 pt-12 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
              <i className="ri-server-line text-3xl text-white"></i>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">서버 등록하기</h2>
              <p className="text-emerald-100 text-sm mt-1">수천 명의 플레이어에게 서버를 홍보하세요</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all ${
                    currentStep >= step
                      ? 'bg-white text-emerald-600'
                      : 'bg-white/20 text-white'
                  }`}>
                    {step}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                    currentStep >= step ? 'text-white' : 'text-emerald-200'
                  }`}>
                    {step === 1 ? '기본 정보' : step === 2 ? '상세 정보' : '이미지 & 태그'}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                    currentStep > step ? 'bg-white' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  서버 이름 *
                </label>
                <input
                  type="text"
                  value={formData.serverName}
                  onChange={(e) => setFormData({ ...formData, serverName: e.target.value })}
                  placeholder="예: HyperCraft Network"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    서버 IP 주소 *
                  </label>
                  <input
                    type="text"
                    value={formData.serverIP}
                    onChange={(e) => setFormData({ ...formData, serverIP: e.target.value })}
                    placeholder="예: play.example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    포트
                  </label>
                  <input
                    type="text"
                    value={formData.serverPort}
                    onChange={(e) => setFormData({ ...formData, serverPort: e.target.value })}
                    placeholder="25565"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    마인크래프트 버전 *
                  </label>
                  <select
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
                    required
                  >
                    <option value="1.20.4">1.20.4</option>
                    <option value="1.20.3">1.20.3</option>
                    <option value="1.20.2">1.20.2</option>
                    <option value="1.20.1">1.20.1</option>
                    <option value="1.19.4">1.19.4</option>
                    <option value="1.8.9">1.8.9</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    카테고리 *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
                    required
                  >
                    <option value="">카테고리 선택</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  서버 설명 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="서버의 특징과 게임 모드를 자세히 설명해주세요..."
                  rows={6}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                  required
                ></textarea>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.description.length}/500
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  웹사이트 URL
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-global-line text-lg text-gray-400"></i>
                  </div>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discord 초대 링크
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-discord-line text-lg text-gray-400"></i>
                  </div>
                  <input
                    type="url"
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                    placeholder="https://discord.gg/..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Images & Tags */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  배너 이미지 URL
                </label>
                <input
                  type="url"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  placeholder="https://example.com/banner.png (권장: 1200x400)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">권장 크기: 1200x400 픽셀</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  로고 이미지 URL
                </label>
                <input
                  type="url"
                  value={formData.logoImage}
                  onChange={(e) => setFormData({ ...formData, logoImage: e.target.value })}
                  placeholder="https://example.com/logo.png (권장: 200x200)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">권장 크기: 200x200 픽셀</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  태그 선택 (최대 5개)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      disabled={!formData.tags.includes(tag) && formData.tags.length >= 5}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        formData.tags.includes(tag)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${!formData.tags.includes(tag) && formData.tags.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  선택된 태그: {formData.tags.length}/5
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                이전
              </button>
            ) : (
              <div></div>
            )}

            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              {currentStep === 3 ? '서버 등록하기' : '다음'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

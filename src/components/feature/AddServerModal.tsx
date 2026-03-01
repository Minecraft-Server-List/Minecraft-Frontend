import { useState, useRef, useEffect } from 'react';
import api from '@/api/axios';

interface AddServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddServerModal({ isOpen, onClose }: AddServerModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serverName: '',
    serverIP: '',
    version: '1.20.4',
    categories: [] as number[],
    description: '',
    website: '',
    discord: '',
    bannerImage: null as File | null,
    logoImage: null as File | null,
    bannerPreview: '',
    logoPreview: '',
  });

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [availableCategories, setAvailableCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories');
        const raw = response.data;
        let arr: any[] = [];
        if (Array.isArray(raw)) arr = raw;
        else if (Array.isArray(raw?.data)) arr = raw.data;
        else if (Array.isArray(raw?.content)) arr = raw.content;
        else if (Array.isArray(raw?.categories)) arr = raw.categories;

        const formatted = arr.map((cat: any) => ({
          id: Number(cat.category_id ?? cat.id ?? cat.categoryId ?? cat),
          name: String(cat.name ?? cat.label ?? cat.title ?? cat),
        }));

        setAvailableCategories(formatted.filter(c => !Number.isNaN(c.id)));
      } catch (error) {
        console.error('카테고리 로드 실패 (AddServerModal):', error);
        setAvailableCategories([
          { id: 1, name: 'Survival' },
          { id: 2, name: 'Creative' },
          { id: 3, name: 'PvP' },
        ]);
      }
    };
    fetchCategories();
  }, []);

  if (!isOpen) return null;

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'banner' | 'logo'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === 'banner') {
      setFormData(prev => ({ ...prev, bannerImage: file, bannerPreview: previewUrl }));
    } else {
      setFormData(prev => ({ ...prev, logoImage: file, logoPreview: previewUrl }));
    }
  };

  const removeImage = (type: 'banner' | 'logo') => {
    if (type === 'banner') {
      if (formData.bannerPreview) URL.revokeObjectURL(formData.bannerPreview);
      setFormData(prev => ({ ...prev, bannerImage: null, bannerPreview: '' }));
      if (bannerInputRef.current) bannerInputRef.current.value = '';
    } else {
      if (formData.logoPreview) URL.revokeObjectURL(formData.logoPreview);
      setFormData(prev => ({ ...prev, logoImage: null, logoPreview: '' }));
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Submit server:', formData);
      onClose();
    }
  };

  const toggleCategory = (catId: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter(c => c !== catId)
        : [...prev.categories, catId]
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

              <div>
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
                  마인크래프트 버전 *
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="예: 1.20.4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">예: 1.20.4, 1.19.4, 1.8.9</p>
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
              {/* Banner Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  배너 이미지
                  <span className="text-xs font-normal text-gray-500 ml-2">권장 크기: 1200×400</span>
                </label>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'banner')}
                />
                {formData.bannerPreview ? (
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 group">
                    <img
                      src={formData.bannerPreview}
                      alt="배너 미리보기"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => bannerInputRef.current?.click()}
                        className="px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-refresh-line mr-1"></i>변경
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage('banner')}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>삭제
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => bannerInputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 group-hover:bg-emerald-100 rounded-full transition-colors">
                      <i className="ri-image-add-line text-2xl text-gray-400 group-hover:text-emerald-500"></i>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600 group-hover:text-emerald-600">클릭하여 배너 이미지 업로드</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF 지원</p>
                    </div>
                  </button>
                )}
              </div>

              {/* Logo Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  로고 이미지
                  <span className="text-xs font-normal text-gray-500 ml-2">권장 크기: 200×200</span>
                </label>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'logo')}
                />
                <div className="flex items-center gap-5">
                  {formData.logoPreview ? (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 group">
                      <img
                        src={formData.logoPreview}
                        alt="로고 미리보기"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage('logo')}
                          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50">
                      <i className="ri-image-line text-3xl text-gray-300"></i>
                    </div>
                  )}
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-upload-2-line mr-2"></i>
                      {formData.logoPreview ? '로고 변경' : '로고 업로드'}
                    </button>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG 지원 · 정사각형 권장</p>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  카테고리 *
                </label>
                <p className="text-xs text-gray-500 mb-3">해당하는 카테고리를 모두 선택해주세요</p>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
                        formData.categories.includes(cat.id)
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400 hover:text-emerald-600'
                      }`}
                    >
                      {formData.categories.includes(cat.id) && (
                        <i className="ri-check-line mr-1 text-xs"></i>
                      )}
                      {cat.name}
                    </button>
                  ))}
                </div>
                {formData.categories.length === 0 && (
                  <p className="text-xs text-red-400 mt-2">카테고리를 1개 이상 선택해주세요</p>
                )}
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
              disabled={currentStep === 3 && formData.categories.length === 0}
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 3 ? '서버 등록하기' : '다음'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

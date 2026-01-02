import { useState } from 'react';
import api from '@/api/axios';

interface AddServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddServerModal({ isOpen, onClose }: AddServerModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    version: '1.20.4',
    category: '',
    description: '',
  });

  if (!isOpen) return null;

  const categories = ['RPG', '생존', 'PVP', '미니게임', '모드'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        // 1. 서버 정보 JSON 등록 (POST /api/servers)
        const serverData = {
          name: formData.name,
          domain: formData.domain,
          version: formData.version,
          description: formData.description,
          categoryName: formData.category,
          status: 'OFFLINE',
          currentPlayers: 0,
          maxPlayers: 0
        };

        // @RequestBody 구조이므로 순수 JSON으로 보냅니다.
        const response = await api.post('/api/servers', serverData);
        const createdServerId = response.data.serverId;

        // 2. 이미지가 있다면 추가 업로드 (POST /api/servers/{id}/images)
        if (imageFile && createdServerId) {
          const imageData = new FormData();
          // 백엔드 컨트롤러의 @RequestParam("files") 이름과 일치시켜야 합니다.
          imageData.append('files', imageFile);

          await api.post(`/api/servers/${createdServerId}/images`, imageData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }

        alert('서버와 이미지가 야미하게 등록되었습니다!');
        onClose();
        window.location.reload(); 
      } catch (error) {
        console.error('등록 실패:', error);
        alert('서버 등록 중 오류가 발생했습니다.');
      }
    }
  };  

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-8">
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full z-10">
          <i className="ri-close-line text-2xl text-gray-600"></i>
        </button>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 px-8 pt-12 pb-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
              <i className="ri-server-line text-3xl"></i>
            </div>
            <div>
              <h2 className="text-3xl font-bold">서버 등록하기</h2>
              <p className="text-emerald-100 text-sm">도메인만 입력하면 인원수는 자동으로 수집됩니다!</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm ${currentStep >= step ? 'bg-white text-emerald-600' : 'bg-white/20 text-white'}`}>
                    {step}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${currentStep >= step ? 'text-white' : 'text-emerald-200'}`}>
                    {step === 1 ? '기본 정보' : step === 2 ? '상세 설명' : '이미지 업로드'}
                  </span>
                </div>
                {step < 3 && <div className={`flex-1 h-1 mx-4 rounded-full ${currentStep > step ? 'bg-white' : 'bg-white/20'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">서버 이름 *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-100" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">서버 주소 (Domain) *</label>
                <input type="text" value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-100" placeholder="play.example.com" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">마인크래프트 버전 *</label>
                  <select value={formData.version} onChange={(e) => setFormData({ ...formData, version: e.target.value })} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer">
                    <option value="1.20.4">1.20.4</option>
                    <option value="1.20.1">1.20.1</option>
                    <option value="1.19.4">1.19.4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">카테고리 *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer" required>
                    <option value="">카테고리 선택</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">서버 설명 *</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={6} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-100 resize-none" required></textarea>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-emerald-500 transition-colors">
                <i className="ri-image-add-line text-5xl text-gray-400 mb-4 block"></i>
                <label className="bg-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-emerald-700 transition-all">
                  서버 이미지 선택
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </label>
                <p className="mt-4 text-sm text-gray-500">{imageFile ? `선택된 파일: ${imageFile.name}` : '배너 이미지를 업로드해주세요'}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg">이전</button>
            )}
            <button type="submit" className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 ml-auto">
              {currentStep === 3 ? '서버 등록하기' : '다음'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
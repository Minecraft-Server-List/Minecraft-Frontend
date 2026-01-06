import { useState, useEffect } from 'react';
import api from '@/api/axios';

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedVersion: string;
  setSelectedVersion: (version: string) => void;
  serverCount?: number; // 부모로부터 받은 현재 서버 수
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedVersion,
  setSelectedVersion,
  serverCount
}: FilterSidebarProps) {
  const [dbCategories, setDbCategories] = useState<{id: string, name: string}[]>([]);

  // 1. DB에서 실제 카테고리 목록 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories');
        // [{categoryId: 1, name: 'RPG'}] -> [{id: 'RPG', name: 'RPG'}] 변환
        const formatted = response.data.map((cat: any) => ({
          id: cat.name, 
          name: cat.name
        }));
        setDbCategories([{ id: 'all', name: '전체' }, ...formatted]);
      } catch (error) {
        console.error("카테고리 로드 실패:", error);
      }
    };
    fetchCategories();
  }, []);

  const versions = [
    { id: 'all', name: '모든 버전' },
    { id: '1.20.4', name: '1.20.4' },
    { id: '1.20.1', name: '1.20.1' },
    { id: '1.19.4', name: '1.19.4' },
    { id: '1.18.2', name: '1.18.2' }
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl p-5 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">카테고리</h3>
        <div className="space-y-1">
          {dbCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ri-hashtag text-lg"></i>
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

      {/* Stats - 몫데이터 대신 실제 정보 반영 */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 text-white">
        <h3 className="text-lg font-bold mb-4">현재 현황</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-emerald-100">등록된 서버</span>
            <span className="font-bold">{(serverCount || 0).toLocaleString()}개</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-emerald-100">상태</span>
            <span className="font-bold">실시간 업데이트 중</span>
          </div>
        </div>
      </div>
    </div>
  );
}
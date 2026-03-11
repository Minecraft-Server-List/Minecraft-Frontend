import { useState, useEffect } from 'react';
import api from '@/api/axios';

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  serverCount?: number; // 부모로부터 받은 현재 서버 수
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  serverCount
}: FilterSidebarProps) {
  const [dbCategories, setDbCategories] = useState<{id: string, name: string}[]>([]);

  // 1. DB에서 실제 카테고리 목록 가져오기
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
          id: String(cat.name ?? cat.id ?? cat.category_id ?? cat.categoryId ?? cat.categoryId ?? cat.categoryId ?? cat.categoryId ?? cat),
          name: String(cat.name ?? cat.label ?? cat.title ?? cat.id ?? cat.category_id ?? cat),
        }));
        setDbCategories([{ id: 'all', name: '전체' }, ...formatted]);
      } catch (error) {
        console.error("카테고리 로드 실패:", error);
      }
    };
    fetchCategories();
  }, []);

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
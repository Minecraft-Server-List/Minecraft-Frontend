import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../../../components/feature/LoginModal';
import AddServerModal from '../../../components/feature/AddServerModal';

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddServerModal, setShowAddServerModal] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://public.readdy.ai/ai/img_res/e131358c-8d1e-4f3d-ab52-30b4e08151d5.png" 
                alt="CraftConnect Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-gray-900">마인허브</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/servers" className="text-base text-emerald-600 font-medium hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer">서버</Link>
              <Link to="/servers" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">커뮤니티</Link>
              <a href="#news" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">뉴스</a>
              <a href="#support" className="text-base text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer">지원</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="hidden md:block px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                로그인
              </button>
              <button 
                onClick={() => setShowAddServerModal(true)}
                className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                서버 등록
              </button>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <AddServerModal isOpen={showAddServerModal} onClose={() => setShowAddServerModal(false)} />
    </>
  );
}


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://public.readdy.ai/ai/img_res/e131358c-8d1e-4f3d-ab52-30b4e08151d5.png" 
                alt="CraftConnect" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold text-white">마인허브</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              최고의 마인크래프트 서버를 발견하고 전 세계 플레이어들과 연결하세요.
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold text-white mb-4">서버</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">전체 보기</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">인기 순위</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">신규 서버</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">서버 추가</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-white mb-4">커뮤니티</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">포럼</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">디스코드</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">뉴스</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">이벤트</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-white mb-4">지원</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">고객센터</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">문의하기</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">이용약관</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2025 마인허브. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
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
  );
}

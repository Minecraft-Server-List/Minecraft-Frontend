import { Link } from 'react-router-dom';

interface Server {
  serverId: number;
  name: string;
  description: string;
  imageUrl: string;
  currentPlayers: number;
  maxPlayers: number;
  version: string;
  category: string;
  votes: number;
  status: string;
  tags: string[];
  uptime: string;
}

interface ServerCardProps {
  server: Server;
}

export default function ServerCard({ server }: ServerCardProps) {
  // 1. 숫자 연산 전 방어 코드 (0으로 나누기 방지 및 undefined 대응)
  const currentPlayers = server.currentPlayers || 0;
  const maxPlayers = server.maxPlayers || 1; // 0으로 나누기 방지
  const playerPercentage = (currentPlayers / maxPlayers) * 100;

  return (
    <Link
      to={`/servers/${server.serverId}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-200">
        <img
          src={server.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={server.name || 'Server Image'}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-full">
            {server.category || '일반'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${
            server.status?.toLowerCase() === 'online' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <i className="ri-circle-fill text-xs mr-1"></i>
            {(server.status || 'OFFLINE').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {server.name || '이름 없는 서버'}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed h-10">
          {server.description || '서버 설명이 없습니다.'}
        </p>

        {/* Tags - slice 에러 해결 포인트 */}
        <div className="flex flex-wrap gap-2 mb-4 h-7 overflow-hidden">
          {(server.tags || []).slice(0, 3).map((tag, index) => (
            <span
              key={`${server.serverId}-tag-${index}`}
              className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">플레이어</span>
            <span className="font-bold text-gray-900">
              {/* toLocaleString 에러 해결 포인트 */}
              {(currentPlayers).toLocaleString()} / {(maxPlayers).toLocaleString()}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(playerPercentage, 100)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <i className="ri-gamepad-line"></i>
              <span>{server.version || '버전 정보 없음'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="ri-heart-line"></i>
              <span>{(server.votes || 0).toLocaleString()} votes</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap">
          서버 정보 보기
        </button>
      </div>
    </Link>
  );
}
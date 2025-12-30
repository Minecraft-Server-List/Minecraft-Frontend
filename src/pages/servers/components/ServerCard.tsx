
import { Link } from 'react-router-dom';

interface Server {
  id: number;
  name: string;
  description: string;
  image: string;
  players: number;
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
  const playerPercentage = (server.players / server.maxPlayers) * 100;

  return (
    <Link
      to={`/servers/${server.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={server.image}
          alt={server.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-full">
            {server.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${
            server.status === 'online' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <i className="ri-circle-fill text-xs mr-1"></i>
            {server.status === 'online' ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {server.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {server.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {server.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
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
              {server.players.toLocaleString()} / {server.maxPlayers.toLocaleString()}
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
              <span>{server.version}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="ri-heart-line"></i>
              <span>{server.votes.toLocaleString()} votes</span>
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

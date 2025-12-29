import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './types/user'; // 위에서 만든 타입 가져오기

const App: React.FC = () => {
  // 상태값에 User 배열 타입 지정
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 백엔드 API 호출 
    axios.get<User[]>('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data); // 서버에서 받은 JSON 데이터 저장
        setLoading(false);
      })
      .catch(error => {
        console.error("연동 에러:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>마인크래프트 유저 목록 (TS 연동 테스트)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            <strong>{user.name}</strong> ({user.email}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
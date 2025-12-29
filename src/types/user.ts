export interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  createdAt: string; // 날짜는 보통 문자열로 넘어옵니다.
}
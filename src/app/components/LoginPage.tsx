import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { LogIn, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleAdminLogin = () => {
    setEmail('admin@muhantrading.com');
    setPassword('admin123');
    // 자동으로 로그인 실행
    setTimeout(() => {
      onLogin('admin@muhantrading.com', 'admin123');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">로그인</CardTitle>
          <CardDescription className="text-center">
            무한상사 계정으로 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              로그인
            </Button>
          </form>
          
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAdminLogin}
              className="text-xs"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              관리자 로그인
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">계정이 없으신가요? </span>
            <button
              onClick={() => onNavigate('signup')}
              className="text-blue-600 hover:underline"
            >
              회원가입
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
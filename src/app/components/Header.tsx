import { Building2, LogOut, User, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  currentUser: { email: string; isAdmin: boolean } | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ currentUser, onLogout, onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('main')}
        >
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">무한상사</h1>
        </div>

        <nav className="flex items-center gap-4">
          <Button
            variant={currentPage === 'board' ? 'default' : 'ghost'}
            onClick={() => onNavigate('board')}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            게시판
          </Button>
          
          {currentUser ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{currentUser.email}</span>
              </div>
              {currentUser.isAdmin && (
                <Button
                  variant={currentPage === 'admin' ? 'default' : 'outline'}
                  onClick={() => onNavigate('admin')}
                >
                  관리자 페이지
                </Button>
              )}
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={currentPage === 'login' ? 'default' : 'outline'}
                onClick={() => onNavigate('login')}
              >
                로그인
              </Button>
              <Button
                variant={currentPage === 'signup' ? 'default' : 'outline'}
                onClick={() => onNavigate('signup')}
              >
                회원가입
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
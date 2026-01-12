import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AdminPage } from './components/AdminPage';
import { BoardPage, Post } from './components/BoardPage';
import { Employee } from './components/EmployeeManagement';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  isAdmin: boolean;
  department?: string;
  position?: string;
  rank?: string;
}

interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  timestamp: string;
}

type Page = 'main' | 'login' | 'signup' | 'admin' | 'board';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedLogs = localStorage.getItem('activityLogs');
    const storedCurrentUser = localStorage.getItem('currentUser');
    const storedPosts = localStorage.getItem('posts');

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // 기본 관리자 계정 생성
      const adminUser: User = {
        id: '1',
        email: 'admin@muhantrading.com',
        name: '관리자',
        password: 'admin123',
        createdAt: new Date().toISOString(),
        isAdmin: true,
        department: '경영지원팀',
        position: '대표이사',
        rank: '임원',
      };
      setUsers([adminUser]);
      localStorage.setItem('users', JSON.stringify([adminUser]));
    }

    if (storedLogs) {
      setActivityLogs(JSON.parse(storedLogs));
    }

    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }

    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // 활동 로그 추가
  const addActivityLog = (userId: string, userEmail: string, action: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      userId,
      userEmail,
      action,
      timestamp: new Date().toISOString(),
    };
    const updatedLogs = [...activityLogs, newLog];
    setActivityLogs(updatedLogs);
    localStorage.setItem('activityLogs', JSON.stringify(updatedLogs));
  };

  const handleLogin = (email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      addActivityLog(user.id, user.email, '로그인');
      toast.success(`환영합니다, ${user.name}님!`);
      setCurrentPage('main');
    } else {
      toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSignup = (email: string, password: string, name: string) => {
    // 이메일 중복 체크
    if (users.some((u) => u.email === email)) {
      toast.error('이미 등록된 이메일입니다.');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      password,
      createdAt: new Date().toISOString(),
      isAdmin: false,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    addActivityLog(newUser.id, newUser.email, '회원가입');
    toast.success('회원가입이 완료되었습니다! 로그인해주세요.');
    setCurrentPage('login');
  };

  const handleLogout = () => {
    if (currentUser) {
      addActivityLog(currentUser.id, currentUser.email, '로그아웃');
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      toast.success('로그아웃되었습니다.');
      setCurrentPage('main');
    }
  };

  const handleNavigate = (page: string) => {
    if (page === 'admin' && (!currentUser || !currentUser.isAdmin)) {
      toast.error('관리자 권한이 필요합니다.');
      return;
    }
    setCurrentPage(page as Page);
  };

  // 게시글 관리 함수들
  const handleCreatePost = (title: string, content: string) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorEmail: currentUser.email,
      createdAt: new Date().toISOString(),
      views: 0,
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    addActivityLog(currentUser.id, currentUser.email, '게시글 작성');
    toast.success('게시글이 작성되었습니다.');
  };

  const handleUpdatePost = (postId: string, title: string, content: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, title, content } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    if (currentUser) {
      addActivityLog(currentUser.id, currentUser.email, '게시글 수정');
    }
    toast.success('게시글이 수정되었습니다.');
  };

  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    if (currentUser) {
      addActivityLog(currentUser.id, currentUser.email, '게시글 삭제');
    }
    toast.success('게시글이 삭제되었습니다.');
  };

  const handleViewPost = (postId: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, views: post.views + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  // 사원 정보 업데이트
  const handleUpdateEmployee = (id: string, department: string, position: string, rank: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, department, position, rank } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // 현재 로그인한 사용자의 정보도 업데이트
    if (currentUser && currentUser.id === id) {
      const updatedCurrentUser = { ...currentUser, department, position, rank };
      setCurrentUser(updatedCurrentUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }
    
    if (currentUser) {
      addActivityLog(currentUser.id, currentUser.email, '사원 정보 수정');
    }
    toast.success('사원 정보가 업데이트되었습니다.');
  };

  // users를 Employee 타입으로 변환
  const employees: Employee[] = users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    department: user.department || '',
    position: user.position || '',
    rank: user.rank || '',
    createdAt: user.createdAt,
    isAdmin: user.isAdmin,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {currentPage === 'main' && <MainPage />}
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />
      )}
      {currentPage === 'signup' && (
        <SignupPage onSignup={handleSignup} onNavigate={handleNavigate} />
      )}
      {currentPage === 'board' && (
        <BoardPage
          posts={posts}
          currentUser={currentUser}
          onCreatePost={handleCreatePost}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
          onViewPost={handleViewPost}
        />
      )}
      {currentPage === 'admin' && currentUser?.isAdmin && (
        <AdminPage
          users={users}
          activityLogs={activityLogs}
          posts={posts}
          employees={employees}
          onDeletePost={handleDeletePost}
          onUpdateEmployee={handleUpdateEmployee}
        />
      )}

      <Toaster />
    </div>
  );
}
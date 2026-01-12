import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Activity, MessageSquare, Trash2, Eye, UserCog } from 'lucide-react';
import { Post } from './BoardPage';
import { Employee, EmployeeManagement } from './EmployeeManagement';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isAdmin: boolean;
}

interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  timestamp: string;
}

interface AdminPageProps {
  users: User[];
  activityLogs: ActivityLog[];
  posts: Post[];
  employees: Employee[];
  onDeletePost: (postId: string) => void;
  onUpdateEmployee: (id: string, department: string, position: string, rank: string) => void;
}

export function AdminPage({ users, activityLogs, posts, employees, onDeletePost, onUpdateEmployee }: AdminPageProps) {
  const handleDeletePost = (postId: string, postTitle: string) => {
    if (confirm(`"${postTitle}" 게시글을 삭제하시겠습니까?`)) {
      onDeletePost(postId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">관리자 대시보드</h2>
          <p className="text-gray-600">시스템 사용자 및 활동 내역을 관리합니다</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>전체 회원</CardDescription>
              <CardTitle className="text-3xl">{users.length}명</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>전체 게시글</CardDescription>
              <CardTitle className="text-3xl">{posts.length}개</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>활동 로그</CardDescription>
              <CardTitle className="text-3xl">{activityLogs.length}개</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              회원 목록
            </TabsTrigger>
            <TabsTrigger value="employees">
              <UserCog className="w-4 h-4 mr-2" />
              사원 관리
            </TabsTrigger>
            <TabsTrigger value="posts">
              <MessageSquare className="w-4 h-4 mr-2" />
              게시판 관리
            </TabsTrigger>
            <TabsTrigger value="logs">
              <Activity className="w-4 h-4 mr-2" />
              활동 로그
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>등록된 회원</CardTitle>
                <CardDescription>
                  총 {users.length}명의 회원이 등록되어 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>이메일</TableHead>
                      <TableHead>가입일</TableHead>
                      <TableHead>권한</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                        </TableCell>
                        <TableCell>
                          {user.isAdmin ? (
                            <Badge variant="default">관리자</Badge>
                          ) : (
                            <Badge variant="secondary">일반 사용자</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <EmployeeManagement
              employees={employees}
              onUpdateEmployee={onUpdateEmployee}
            />
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>게시판 관리</CardTitle>
                <CardDescription>
                  총 {posts.length}개의 게시글이 등록되어 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">번호</TableHead>
                      <TableHead>제목</TableHead>
                      <TableHead className="w-32">작성자</TableHead>
                      <TableHead className="w-32">작성일</TableHead>
                      <TableHead className="w-20 text-center">조회</TableHead>
                      <TableHead className="w-24 text-center">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.slice().reverse().map((post, index) => (
                      <TableRow key={post.id}>
                        <TableCell>{posts.length - index}</TableCell>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.authorName}</TableCell>
                        <TableCell>
                          {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePost(post.id, post.title)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>활동 로그</CardTitle>
                <CardDescription>
                  최근 {activityLogs.length}개의 활동 내역이 기록되어 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>사용자</TableHead>
                      <TableHead>활동</TableHead>
                      <TableHead>시간</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs.slice().reverse().map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.userEmail}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(log.timestamp).toLocaleString('ko-KR')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
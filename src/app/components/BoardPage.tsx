import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { PenSquare, Eye, Edit, Trash2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: string;
  views: number;
}

interface BoardPageProps {
  posts: Post[];
  currentUser: { id: string; email: string; name: string; isAdmin: boolean } | null;
  onCreatePost: (title: string, content: string) => void;
  onUpdatePost: (postId: string, title: string, content: string) => void;
  onDeletePost: (postId: string) => void;
  onViewPost: (postId: string) => void;
}

export function BoardPage({ posts, currentUser, onCreatePost, onUpdatePost, onDeletePost, onViewPost }: BoardPageProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    if (!currentUser) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    if (!title.trim() || !content.trim()) {
      toast.error('제목과 내용을 입력해주세요.');
      return;
    }
    onCreatePost(title, content);
    setTitle('');
    setContent('');
    setIsCreateDialogOpen(false);
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setIsViewDialogOpen(true);
    onViewPost(post.id);
  };

  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setContent(post.content);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePost = () => {
    if (!selectedPost) return;
    if (!title.trim() || !content.trim()) {
      toast.error('제목과 내용을 입력해주세요.');
      return;
    }
    onUpdatePost(selectedPost.id, title, content);
    setTitle('');
    setContent('');
    setSelectedPost(null);
    setIsEditDialogOpen(false);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      onDeletePost(postId);
      setIsViewDialogOpen(false);
    }
  };

  const canEdit = (post: Post) => {
    if (!currentUser) return false;
    return currentUser.isAdmin || currentUser.id === post.authorId;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">게시판</h2>
            <p className="text-gray-600">자유롭게 소통하는 공간입니다</p>
          </div>
          {currentUser && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PenSquare className="w-4 h-4 mr-2" />
                  글쓰기
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 게시글 작성</DialogTitle>
                  <DialogDescription>
                    게시글의 제목과 내용을 작성해주세요
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      placeholder="제목을 입력하세요"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                      id="content"
                      placeholder="내용을 입력하세요"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={10}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleCreatePost}>
                      작성하기
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              전체 게시글 ({posts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                아직 작성된 게시글이 없습니다.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">번호</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead className="w-32">작성자</TableHead>
                    <TableHead className="w-32">작성일</TableHead>
                    <TableHead className="w-20 text-center">조회</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.slice().reverse().map((post, index) => (
                    <TableRow
                      key={post.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewPost(post)}
                    >
                      <TableCell>{posts.length - index}</TableCell>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.authorName}</TableCell>
                      <TableCell>
                        {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                      </TableCell>
                      <TableCell className="text-center">{post.views}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* 게시글 보기 Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            {selectedPost && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
                  <DialogDescription className="flex items-center gap-4 text-sm">
                    <span>작성자: {selectedPost.authorName}</span>
                    <span>작성일: {new Date(selectedPost.createdAt).toLocaleString('ko-KR')}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {selectedPost.views}
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <div className="border-t pt-4">
                  <div className="whitespace-pre-wrap min-h-[200px] text-gray-700">
                    {selectedPost.content}
                  </div>
                </div>
                {canEdit(selectedPost) && (
                  <div className="flex justify-end gap-2 border-t pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsViewDialogOpen(false);
                        handleEditClick(selectedPost);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      수정
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeletePost(selectedPost.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* 게시글 수정 Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>게시글 수정</DialogTitle>
              <DialogDescription>
                게시글의 제목과 내용을 수정해주세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">제목</Label>
                <Input
                  id="edit-title"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">내용</Label>
                <Textarea
                  id="edit-content"
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleUpdatePost}>
                  수정하기
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Edit, UserCog } from 'lucide-react';
import { toast } from 'sonner';

export interface Employee {
  id: string;
  email: string;
  name: string;
  department: string;
  position: string;
  rank: string;
  createdAt: string;
  isAdmin: boolean;
}

interface EmployeeManagementProps {
  employees: Employee[];
  onUpdateEmployee: (id: string, department: string, position: string, rank: string) => void;
}

export function EmployeeManagement({ employees, onUpdateEmployee }: EmployeeManagementProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [rank, setRank] = useState('');

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDepartment(employee.department);
    setPosition(employee.position);
    setRank(employee.rank);
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedEmployee) return;
    
    if (!department.trim()) {
      toast.error('부서를 입력해주세요.');
      return;
    }
    if (!position.trim()) {
      toast.error('직책을 입력해주세요.');
      return;
    }
    if (!rank) {
      toast.error('직급을 선택해주세요.');
      return;
    }

    onUpdateEmployee(selectedEmployee.id, department, position, rank);
    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  const getRankBadgeVariant = (rank: string) => {
    switch (rank) {
      case '임원':
        return 'default';
      case '부장':
      case '차장':
        return 'secondary';
      case '과장':
      case '대리':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5" />
            사원 관리
          </CardTitle>
          <CardDescription>
            총 {employees.length}명의 사원이 등록되어 있습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>부서</TableHead>
                <TableHead>직책</TableHead>
                <TableHead>직급</TableHead>
                <TableHead>입사일</TableHead>
                <TableHead className="text-center">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    {employee.department || (
                      <span className="text-gray-400">미지정</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {employee.position || (
                      <span className="text-gray-400">미지정</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {employee.rank ? (
                      <Badge variant={getRankBadgeVariant(employee.rank)}>
                        {employee.rank}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">미지정</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(employee.createdAt).toLocaleDateString('ko-KR')}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(employee)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 사원 정보 수정 Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>사원 정보 수정</DialogTitle>
            <DialogDescription>
              {selectedEmployee?.name}님의 부서, 직책, 직급을 수정합니다
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="department">부서</Label>
              <Input
                id="department"
                placeholder="예: 영업팀, 개발팀, 기획팀"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">직책</Label>
              <Input
                id="position"
                placeholder="예: 팀장, 팀원, 매니저"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rank">직급</Label>
              <Select value={rank} onValueChange={setRank}>
                <SelectTrigger id="rank">
                  <SelectValue placeholder="직급을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="임원">임원</SelectItem>
                  <SelectItem value="부장">부장</SelectItem>
                  <SelectItem value="차장">차장</SelectItem>
                  <SelectItem value="과장">과장</SelectItem>
                  <SelectItem value="대리">대리</SelectItem>
                  <SelectItem value="주임">주임</SelectItem>
                  <SelectItem value="사원">사원</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                취소
              </Button>
              <Button onClick={handleSave}>
                저장
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { Package, Users, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            무한상사에 오신 것을 환영합니다
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            신뢰와 혁신으로 고객과 함께 성장하는 기업
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Package className="w-12 h-12 text-blue-600 mb-2" />
              <CardTitle>제품 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                최고의 품질을 자랑하는 다양한 제품을 공급합니다
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-green-600 mb-2" />
              <CardTitle>고객 지원</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                24시간 고객 상담 서비스를 제공합니다
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="w-12 h-12 text-purple-600 mb-2" />
              <CardTitle>품질 보증</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                업계 최고 수준의 품질 관리 시스템을 운영합니다
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-orange-600 mb-2" />
              <CardTitle>성장</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                지속적인 혁신으로 함께 성장합니다
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">회사 소개</h3>
          <p className="text-gray-600 mb-4">
            무한상사는 고객 만족을 최우선으로 하는 기업입니다. 
            우리는 최고의 제품과 서비스를 통해 고객의 비즈니스 성공을 돕고 있습니다.
          </p>
          <p className="text-gray-600">
            전문성과 신뢰를 바탕으로 고객과 함께 성장하며, 
            지속 가능한 미래를 만들어가고 있습니다.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-blue-100">거래 고객사</div>
          </div>
          <div className="bg-green-600 text-white rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">1,000+</div>
            <div className="text-green-100">제품 라인업</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">20년+</div>
            <div className="text-purple-100">업계 경험</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  ArrowLeft,
  Camera,
  Edit,
  Award,
  Calendar,
  Activity,
  Settings,
  Bell,
  Shield,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  const dogProfile = {
    name: "뽀삐",
    breed: "골든리트리버",
    age: "3살",
    weight: "28kg",
    gender: "암컷",
    personality: ["친화적", "활발함", "똑똑함"],
    healthInfo: {
      vaccinated: true,
      neutered: true,
      allergies: ["닭고기"],
      medications: [],
    },
    image: "/placeholder.svg?height=120&width=120",
  }

  const walkStats = {
    totalWalks: 156,
    totalDistance: "234.5km",
    totalTime: "78시간 30분",
    averageDaily: "45분",
    longestWalk: "2시간 15분",
    favoriteSpot: "한강공원",
  }

  const achievements = [
    { id: 1, title: "첫 산책", description: "첫 번째 산책을 완료했어요", icon: "🐾", earned: true },
    { id: 2, title: "주간 챌린지", description: "일주일 연속 산책 달성", icon: "🏆", earned: true },
    { id: 3, title: "거리 마스터", description: "총 100km 산책 달성", icon: "🚶", earned: true },
    { id: 4, title: "소셜 버터플라이", description: "10명의 댕댕친구 만들기", icon: "🦋", earned: false },
    { id: 5, title: "완벽주의자", description: "체크리스트 100% 완료 10회", icon: "✅", earned: true },
    { id: 6, title: "날씨 정복자", description: "비오는 날에도 산책하기", icon: "🌧️", earned: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">내 댕댕이</h1>
              <p className="text-sm text-gray-500">프로필 & 건강관리</p>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              편집
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="stats">통계</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>

          {/* 프로필 탭 */}
          <TabsContent value="profile" className="space-y-4">
            {/* 강아지 프로필 카드 */}
            <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                      <img
                        src={dogProfile.image || "/placeholder.svg"}
                        alt={dogProfile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button size="sm" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{dogProfile.name}</h2>
                    <p className="text-gray-600 mb-2">
                      {dogProfile.breed} • {dogProfile.age}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {dogProfile.personality.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{dogProfile.weight}</div>
                    <div className="text-sm text-gray-600">몸무게</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{dogProfile.gender}</div>
                    <div className="text-sm text-gray-600">성별</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 건강 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  건강 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${dogProfile.healthInfo.vaccinated ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span className="text-sm">예방접종</span>
                    <Badge
                      variant={dogProfile.healthInfo.vaccinated ? "secondary" : "destructive"}
                      className="text-xs ml-auto"
                    >
                      {dogProfile.healthInfo.vaccinated ? "완료" : "미완료"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${dogProfile.healthInfo.neutered ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span className="text-sm">중성화</span>
                    <Badge
                      variant={dogProfile.healthInfo.neutered ? "secondary" : "destructive"}
                      className="text-xs ml-auto"
                    >
                      {dogProfile.healthInfo.neutered ? "완료" : "미완료"}
                    </Badge>
                  </div>
                </div>

                {dogProfile.healthInfo.allergies.length > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <div className="text-sm font-medium text-yellow-800 mb-1">알레르기</div>
                    <div className="flex flex-wrap gap-1">
                      {dogProfile.healthInfo.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  건강 기록 관리
                </Button>
              </CardContent>
            </Card>

            {/* 업적 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  업적 ({achievements.filter((a) => a.earned).length}/{achievements.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg border text-center ${
                        achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-sm font-medium">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 통계 탭 */}
          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  산책 통계
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{walkStats.totalWalks}</div>
                    <div className="text-sm text-gray-600">총 산책 횟수</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{walkStats.totalDistance}</div>
                    <div className="text-sm text-gray-600">총 거리</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{walkStats.totalTime}</div>
                    <div className="text-sm text-gray-600">총 시간</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{walkStats.averageDaily}</div>
                    <div className="text-sm text-gray-600">일평균</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">최장 산책 기록</span>
                    <span className="text-sm text-blue-600 font-semibold">{walkStats.longestWalk}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">즐겨찾는 장소</span>
                    <span className="text-sm text-green-600 font-semibold">{walkStats.favoriteSpot}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 월별 통계 차트 (시뮬레이션) */}
            <Card>
              <CardHeader>
                <CardTitle>이번 달 산책 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-end justify-around p-4">
                  {[65, 80, 45, 90, 75, 85, 70].map((height, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-6 bg-blue-500 rounded-t" style={{ height: `${height}%` }}></div>
                      <div className="text-xs text-gray-600 mt-1">{index + 1}주</div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <p className="text-sm text-gray-600">이번 달 평균 산책 시간: 52분</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 설정 탭 */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />앱 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium">알림 설정</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <span className="text-sm text-blue-600">설정</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium">개인정보 보호</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <span className="text-sm text-blue-600">설정</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium">도움말 & 지원</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <span className="text-sm text-blue-600">보기</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>계정 관리</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  데이터 내보내기
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  계정 연동 관리
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  계정 삭제
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20"></div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, Users, CheckCircle2, Star, Heart, Trophy, Timer, PawPrint } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [walkProgress, setWalkProgress] = useState(65)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const todayWalks = [
    { time: "08:00", duration: "30분", status: "completed", location: "한강공원" },
    { time: "14:00", duration: "20분", status: "current", location: "동네 산책로" },
    { time: "19:00", duration: "40분", status: "pending", location: "보라매공원" },
  ]

  const weeklyStats = {
    totalWalks: 12,
    totalTime: "6시간 30분",
    level: 5,
    points: 1250,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">댕댕로드</h1>
                <p className="text-sm text-gray-500">안녕하세요, 김댕댕님!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Trophy className="w-3 h-3 mr-1" />
                Lv.{weeklyStats.level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* AI 추천 산책 플래너 */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              오늘의 맞춤 산책 플래너
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">진행률</span>
                <span className="text-sm text-blue-600 font-semibold">{walkProgress}%</span>
              </div>
              <Progress value={walkProgress} className="h-2 mb-3" />
              <p className="text-sm text-gray-700">
                🐕 <strong>뽀삐</strong>는 중형견이라 하루 3번, 총 90분 산책이 필요해요!
              </p>
            </div>

            <div className="flex gap-2">
              <Link href="/walk-timer">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">산책 시작</Button>
              </Link>
              <Link href="/map">
                <Button variant="outline" className="flex-1">주변 산책로 현황 확인하기</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 주요 기능 버튼들 */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/map">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">실시간 산책지도</h3>
                <p className="text-xs text-gray-600 mt-1">근처 산책로 & 댕댕이 현황</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">산책 커뮤니티</h3>
                <p className="text-xs text-gray-600 mt-1">댕댕친구 만나기</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/checklist">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">산책 체크리스트</h3>
                <p className="text-xs text-gray-600 mt-1">잊지 말아야 할 것들</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">내 댕댕이</h3>
                <p className="text-xs text-gray-600 mt-1">프로필 & 건강관리</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* 이번 주 통계 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              이번 주 산책 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalWalks}</div>
                <div className="text-sm text-gray-600">총 산책 횟수</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{weeklyStats.totalTime}</div>
                <div className="text-sm text-gray-600">총 산책 시간</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
              <div className="text-lg font-bold text-yellow-600">{weeklyStats.points} 포인트</div>
              <div className="text-sm text-gray-600">다음 레벨까지 250 포인트 남음!</div>
            </div>
          </CardContent>
        </Card>

        {/* 오늘의 팁 */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-lg">💡 오늘의 산책 꿀팁</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              <strong>겨울철 산책 시 주의사항:</strong> 강아지 발가락 사이에 눈이 끼지 않도록 산책 후 따뜻한 물로 발을
              깨끗이 닦아주세요. 특히 염화칼슘이 뿌려진 길을 걸었다면 더욱 꼼꼼히!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-blue-600">
              <PawPrint className="w-5 h-5" />
              <span className="text-xs">홈</span>
            </Button>
            <Link href="/map">
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <MapPin className="w-5 h-5" />
                <span className="text-xs">지도</span>
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <Users className="w-5 h-5" />
                <span className="text-xs">커뮤니티</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <Heart className="w-5 h-5" />
                <span className="text-xs">프로필</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

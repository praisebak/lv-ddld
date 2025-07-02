"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, Users, CheckCircle2, Star, Heart, Trophy, Timer, PawPrint, Calendar, Play } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [walkProgress, setWalkProgress] = useState(65)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const weeklyStats = {
    totalWalks: 12,
    totalTime: "6시간 30분",
    level: 5,
    points: 1250,
    streak: 7,
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
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🔥 {weeklyStats.streak}일
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 메인 산책 시작 카드 - 지도로 바로 이동 */}
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Play className="w-5 h-5 text-orange-600" />
              산책 시작하기
            </CardTitle>
            <p className="text-sm text-gray-600">지도에서 실시간으로 모든 정보를 확인하세요</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">오늘 진행률</span>
                <span className="text-sm text-orange-600 font-semibold">{walkProgress}%</span>
              </div>
              <Progress value={walkProgress} className="h-2 mb-3" />
              <p className="text-sm text-gray-700">
                🐕 <strong>뽀삐</strong>는 중형견이라 하루 3번, 총 90분 산책이 필요해요!
              </p>
            </div>

            {/* 메인 CTA - 지도로 이동 */}
            <Link href="/map" className="block">
              <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4">
                <MapPin className="w-5 h-5 mr-2" />
                지도에서 산책 시작하기
              </Button>
            </Link>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                지도에서 주변 산책로, 댕댕이 현황, 타이머, 체크리스트를 모두 확인할 수 있어요!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 퀵 스탯 카드 */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalWalks}</div>
            <div className="text-xs text-gray-600">이번 주 산책</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">{weeklyStats.streak}</div>
            <div className="text-xs text-gray-600">연속 산책일</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-yellow-600">{weeklyStats.points}</div>
            <div className="text-xs text-gray-600">보유 포인트</div>
          </Card>
        </div>

        {/* 보조 기능 - 빠른 접근 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">빠른 접근</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Link href="/calendar">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                산책 기록
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                커뮤니티
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-2" />
                내 댕댕이
              </Button>
            </Link>
            <Link href="/checklist">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                체크리스트
              </Button>
            </Link>
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

      {/* Bottom Navigation - 지도 중심으로 재구성 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-blue-600">
              <PawPrint className="w-5 h-5" />
              <span className="text-xs">홈</span>
            </Button>
            <Link href="/map">
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2 relative">
                <div className="relative">
                  <MapPin className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs font-medium">산책지도</span>
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

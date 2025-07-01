"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar as CalendarIcon, Timer, Footprints, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // 산책 기록 데이터 (실제로는 API에서 가져올 데이터)
  const walkRecords = [
    { 
      date: '2024-07-01', 
      duration: 1200, // 20분 (초 단위)
      distance: 1.5, 
      steps: 2100,
      mood: 'great',
      weather: '맑음',
      notes: '한강공원에서 즐거운 산책'
    },
    { 
      date: '2024-06-30', 
      duration: 900, // 15분
      distance: 1.2, 
      steps: 1800,
      mood: 'good',
      weather: '흐림',
      notes: '동네 산책로에서 가벼운 산책'
    },
    { 
      date: '2024-06-29', 
      duration: 1500, // 25분
      distance: 2.0, 
      steps: 2800,
      mood: 'excellent',
      weather: '맑음',
      notes: '보라매공원에서 긴 산책'
    },
    { 
      date: '2024-06-28', 
      duration: 600, // 10분
      distance: 0.8, 
      steps: 1200,
      mood: 'okay',
      weather: '비',
      notes: '짧은 산책'
    }
  ]

  // 선택된 날짜의 산책 기록 찾기
  const getSelectedDateRecord = () => {
    if (!selectedDate) return null
    const dateString = selectedDate.toISOString().split('T')[0]
    return walkRecords.find(record => record.date === dateString)
  }

  // 산책한 날짜들 배열로 변환
  const walkDates = walkRecords.map(record => new Date(record.date))

  // 시간 포맷팅 함수
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    return `${mins}분`
  }

  // 기분 이모지 매핑
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excellent': return '🤩'
      case 'great': return '😊'
      case 'good': return '🙂'
      case 'okay': return '😐'
      default: return '🙂'
    }
  }

  // 월별 통계 계산
  const currentMonth = selectedDate?.getMonth() || new Date().getMonth()
  const currentYear = selectedDate?.getFullYear() || new Date().getFullYear()
  const monthlyRecords = walkRecords.filter(record => {
    const recordDate = new Date(record.date)
    return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear
  })

  const monthlyStats = {
    totalWalks: monthlyRecords.length,
    totalDuration: monthlyRecords.reduce((sum, record) => sum + record.duration, 0),
    totalDistance: monthlyRecords.reduce((sum, record) => sum + record.distance, 0),
    totalSteps: monthlyRecords.reduce((sum, record) => sum + record.steps, 0)
  }

  const selectedRecord = getSelectedDateRecord()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
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
              <h1 className="text-lg font-bold text-gray-900">산책 달력</h1>
              <p className="text-sm text-gray-500">뽀삐와의 산책 기록</p>
            </div>
            <CalendarIcon className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 월별 통계 */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              이번 달 통계
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{monthlyStats.totalWalks}</div>
                <div className="text-sm text-gray-600">총 산책 횟수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatDuration(monthlyStats.totalDuration)}</div>
                <div className="text-sm text-gray-600">총 산책 시간</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{monthlyStats.totalDistance.toFixed(1)}km</div>
                <div className="text-sm text-gray-600">총 거리</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{monthlyStats.totalSteps.toLocaleString()}</div>
                <div className="text-sm text-gray-600">총 걸음 수</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 달력 */}
        <Card>
          <CardHeader>
            <CardTitle>산책 달력</CardTitle>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-200 rounded"></div>
                <span>산책한 날</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
              modifiers={{
                walked: walkDates
              }}
              modifiersStyles={{
                walked: { 
                  backgroundColor: '#e9d5ff', 
                  color: '#7c3aed',
                  fontWeight: 'bold'
                }
              }}
            />
          </CardContent>
        </Card>

        {/* 선택된 날짜의 상세 정보 */}
        {selectedRecord ? (
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                {selectedDate?.toLocaleDateString('ko-KR', { 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'short'
                })} 산책 기록
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Timer className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <div className="font-semibold">{formatDuration(selectedRecord.duration)}</div>
                  <div className="text-xs text-gray-500">시간</div>
                </div>
                <div>
                  <Footprints className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <div className="font-semibold">{selectedRecord.distance}km</div>
                  <div className="text-xs text-gray-500">거리</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">{getMoodEmoji(selectedRecord.mood)}</div>
                  <div className="font-semibold capitalize">{selectedRecord.mood}</div>
                  <div className="text-xs text-gray-500">기분</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">걸음 수:</span>
                  <span className="font-medium">{selectedRecord.steps.toLocaleString()} 걸음</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">날씨:</span>
                  <span className="font-medium">{selectedRecord.weather}</span>
                </div>
                {selectedRecord.notes && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">메모:</div>
                    <div className="text-sm bg-white p-2 rounded border">
                      {selectedRecord.notes}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : selectedDate && (
          <Card className="border-2 border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="text-gray-400 mb-2">📅</div>
              <div className="text-gray-600">
                {selectedDate.toLocaleDateString('ko-KR', { 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'short'
                })}에는 산책 기록이 없어요
              </div>
              <div className="text-sm text-gray-500 mt-1">
                뽀삐와 함께 산책을 떠나보세요!
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  )
} 
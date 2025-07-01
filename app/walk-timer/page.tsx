"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, ArrowLeft, MapPin, Timer, Footprints, Heart, Droplets, Thermometer, ListChecks, X, Activity } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

export default function WalkTimerPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [steps, setSteps] = useState(0)
  const [checklist, setChecklist] = useState([
    { id: 1, text: "목줄 챙기기", checked: false },
    { id: 2, text: "물병 준비", checked: false },
  ])
  const [newItem, setNewItem] = useState("")
  const [isWalking, setIsWalking] = useState(false)

  const targetTime = 20 * 60 // 20분 목표
  const targetDistance = 1.5 // 1.5km 목표

  // 강아지 건강 상태 체크 팁 슬라이드
  const healthTips = [
    "산책 전 물 충분히 챙기기",
    "발바닥 상처 확인",
    "더운 날씨엔 짧게 산책",
    "목줄, 인식표 꼭 착용"
  ];
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(idx => (idx + 1) % healthTips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [healthTips.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
        // 시뮬레이션: 거리와 걸음수 증가
        if (time % 10 === 0) {
          setDistance((prev) => prev + 0.01)
          setSteps((prev) => prev + 15)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, time])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const timeProgress = (time / targetTime) * 100
  const distanceProgress = (distance / targetDistance) * 100

  const handleStart = () => {
    setIsRunning(true)
    setIsWalking(true)
  }
  const handlePause = () => setIsRunning(false)
  const handleStop = () => {
    setIsRunning(false)
    // 여기서 산책 기록을 저장하는 로직 추가
  }

  const handleCheck = (id: number) => {
    setChecklist(list => list.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }
  const handleDelete = (id: number) => {
    setChecklist(list => list.filter(item => item.id !== id))
  }
  const handleAdd = () => {
    if (newItem.trim() === "") return
    setChecklist(list => [...list, { id: Date.now(), text: newItem.trim(), checked: false }])
    setNewItem("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
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
              <h1 className="text-lg font-bold text-gray-900">산책 타이머</h1>
              <p className="text-sm text-gray-500">뽀삐와 함께하는 오후 산책</p>
            </div>
            <Badge variant={isRunning ? "default" : "secondary"} className="bg-green-100 text-green-800">
              {isRunning ? "진행중" : "대기중"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      
 {/* 산책 체크리스트 카드 추가 */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-blue-600" />
              산책 체크리스트
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklist.map(item => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox checked={item.checked} onCheckedChange={() => handleCheck(item.id)} />
                <span className={item.checked ? "line-through text-gray-400" : ""}>{item.text}</span>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <Input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="새 항목 입력" onKeyDown={e => { if (e.key === 'Enter') handleAdd() }} />
              <Button onClick={handleAdd}>추가</Button>
            </div>
          </CardContent>
        </Card>


        {/* 메인 타이머 */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">{formatTime(time)}</div>
              <div className="text-sm text-gray-600">목표: {formatTime(targetTime)}</div>
              <Progress value={timeProgress} className="h-3 mt-2" />
              {/* 건강 팁 슬라이드: 산책 전/후에만 노출 */}
              {!isWalking && (
                <div className="transition-opacity duration-500 text-center text-base font-semibold text-green-700 mt-4 h-6 flex items-center justify-center">
                  {healthTips[tipIndex]}
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <Button size="lg" onClick={handleStart} className="bg-green-600 hover:bg-green-700 px-8">
                  <Play className="w-6 h-6 mr-2" />
                  시작
                </Button>
              ) : (
                <Button size="lg" onClick={handlePause} className="bg-yellow-600 hover:bg-yellow-700 px-8">
                  <Pause className="w-6 h-6 mr-2" />
                  일시정지
                </Button>
              )}

              <Button size="lg" variant="outline" onClick={handleStop} className="px-8 bg-transparent">
                <Square className="w-6 h-6 mr-2" />
                종료
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 실시간 통계 */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Footprints className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{distance.toFixed(2)}</div>
              <div className="text-sm text-gray-600">km</div>
              <Progress value={distanceProgress} className="h-2 mt-2" />
              <div className="text-xs text-gray-500 mt-1">목표: {targetDistance}km</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Timer className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{steps}</div>
              <div className="text-sm text-gray-600">걸음</div>
              <div className="text-xs text-gray-500 mt-3">평균 속도</div>
              <div className="text-sm font-medium text-green-600">
                {time > 0 ? (distance / (time / 3600)).toFixed(1) : "0.0"} km/h
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 상태에 따라 카드 분기 */}
        {!isWalking ? null : (
          <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-600" />
                달리기 중 체크 팁
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-lg">🫁</span>
                <div>
                  <div className="font-medium">호흡 상태 관찰</div>
                  <div className="text-sm text-gray-600">과도한 헥헥거림, 침 흘림 주의</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🐾</span>
                <div>
                  <div className="font-medium">발바닥 확인</div>
                  <div className="text-sm text-gray-600">상처, 뜨거운 아스팔트 주의</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🦴</span>
                <div>
                  <div className="font-medium">무리한 점프/급정지 방지</div>
                  <div className="text-sm text-gray-600">관절 부상 예방</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">💧</span>
                <div>
                  <div className="font-medium">수분 보충</div>
                  <div className="text-sm text-gray-600">중간중간 물 마시기</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 현재 위치 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              현재 위치
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="font-medium">동네 산책로</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">조용하고 안전한 주택가 산책로를 걷고 있어요</p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  #조용한
                </Badge>
                <Badge variant="outline" className="text-xs">
                  #안전함
                </Badge>
                <Badge variant="outline" className="text-xs">
                ㄴ
                  #단거리
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 산책 완료 시 표시될 요약 */}
        {time > 0 && !isRunning && (
          <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🎉 산책 완료!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{formatTime(time)}</div>
                  <div className="text-sm text-gray-600">총 시간</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-green-600">{distance.toFixed(2)}km</div>
                  <div className="text-sm text-gray-600">총 거리</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">+{Math.floor((time / 60) * 10)} 포인트</div>
                <div className="text-sm text-gray-600">산책 완료 보상!</div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">기록 저장</Button>
                <Button variant="outline">공유하기</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  )
}

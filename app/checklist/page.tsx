"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, ArrowLeft, Clock, AlertTriangle, Lightbulb, Award } from "lucide-react"
import Link from "next/link"

export default function ChecklistPage() {
  const [preWalkChecks, setPreWalkChecks] = useState({
    leash: false,
    water: false,
    bags: false,
    treats: false,
    weather: false,
  })

  const [postWalkChecks, setPostWalkChecks] = useState({
    paws: false,
    water: false,
    ticks: false,
    exercise: false,
    rest: false,
  })

  const preWalkItems = [
    { id: "leash", label: "목줄과 하네스 착용 확인", icon: "🦮", priority: "high" },
    { id: "water", label: "물병 챙기기", icon: "💧", priority: "medium" },
    { id: "bags", label: "배변봉투 준비", icon: "🗑️", priority: "high" },
    { id: "treats", label: "간식 준비 (훈련용)", icon: "🦴", priority: "low" },
    { id: "weather", label: "날씨 확인 (우산/옷)", icon: "🌤️", priority: "medium" },
  ]

  const postWalkItems = [
    { id: "paws", label: "발가락 사이 청소", icon: "🐾", priority: "high" },
    { id: "water", label: "충분한 물 제공", icon: "🥤", priority: "high" },
    { id: "ticks", label: "진드기/이물질 확인", icon: "🔍", priority: "medium" },
    { id: "exercise", label: "운동량 기록하기", icon: "📊", priority: "low" },
    { id: "rest", label: "휴식 공간 제공", icon: "😴", priority: "medium" },
  ]

  const handlePreWalkCheck = (id: string) => {
    setPreWalkChecks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handlePostWalkCheck = (id: string) => {
    setPostWalkChecks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const preWalkProgress = (Object.values(preWalkChecks).filter(Boolean).length / preWalkItems.length) * 100
  const postWalkProgress = (Object.values(postWalkChecks).filter(Boolean).length / postWalkItems.length) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const tips = [
    {
      title: "겨울철 발 관리",
      content: "염화칼슘이 뿌려진 길을 걸었다면 미지근한 물로 발을 깨끗이 씻어주세요.",
      icon: "❄️",
    },
    {
      title: "진드기 예방",
      content: "풀숲을 지났다면 귀, 목, 겨드랑이 부분을 꼼꼼히 확인해주세요.",
      icon: "🌿",
    },
    {
      title: "수분 보충",
      content: "산책 후 15-20분 후에 물을 주면 급하게 마시지 않아 좋습니다.",
      icon: "💧",
    },
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
              <h1 className="text-lg font-bold text-gray-900">산책 체크리스트</h1>
              <p className="text-sm text-gray-500">잊지 말아야 할 것들</p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              초보자 가이드
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 산책 전 체크리스트 */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              산책 전 준비사항
            </CardTitle>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">완료율</span>
                <span className="text-sm font-semibold text-blue-600">{Math.round(preWalkProgress)}%</span>
              </div>
              <Progress value={preWalkProgress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {preWalkItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getPriorityColor(item.priority)}`}
              >
                <Checkbox
                  id={item.id}
                  checked={preWalkChecks[item.id]}
                  onCheckedChange={() => handlePreWalkCheck(item.id)}
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{item.icon}</span>
                  <label
                    htmlFor={item.id}
                    className={`text-sm font-medium cursor-pointer ${preWalkChecks[item.id] ? "line-through text-gray-500" : ""}`}
                  >
                    {item.label}
                  </label>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    item.priority === "high"
                      ? "border-red-300 text-red-700"
                      : item.priority === "medium"
                        ? "border-yellow-300 text-yellow-700"
                        : "border-green-300 text-green-700"
                  }`}
                >
                  {item.priority === "high" ? "필수" : item.priority === "medium" ? "권장" : "선택"}
                </Badge>
              </div>
            ))}

            {preWalkProgress === 100 && (
              <div className="bg-green-100 border border-green-200 rounded-lg p-3 text-center">
                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-green-800">산책 준비 완료! 🎉</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 산책 후 체크리스트 */}
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              산책 후 관리사항
            </CardTitle>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">완료율</span>
                <span className="text-sm font-semibold text-green-600">{Math.round(postWalkProgress)}%</span>
              </div>
              <Progress value={postWalkProgress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {postWalkItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getPriorityColor(item.priority)}`}
              >
                <Checkbox
                  id={`post-${item.id}`}
                  checked={postWalkChecks[item.id]}
                  onCheckedChange={() => handlePostWalkCheck(item.id)}
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{item.icon}</span>
                  <label
                    htmlFor={`post-${item.id}`}
                    className={`text-sm font-medium cursor-pointer ${postWalkChecks[item.id] ? "line-through text-gray-500" : ""}`}
                  >
                    {item.label}
                  </label>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    item.priority === "high"
                      ? "border-red-300 text-red-700"
                      : item.priority === "medium"
                        ? "border-yellow-300 text-yellow-700"
                        : "border-green-300 text-green-700"
                  }`}
                >
                  {item.priority === "high" ? "필수" : item.priority === "medium" ? "권장" : "선택"}
                </Badge>
              </div>
            ))}

            {postWalkProgress === 100 && (
              <div className="bg-green-100 border border-green-200 rounded-lg p-3 text-center">
                <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-green-800">완벽한 산책 관리! +50 포인트 🏆</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 왕초보 산책 꿀팁 */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              왕초보 산책 꿀팁
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{tip.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              <Lightbulb className="w-4 h-4 mr-2" />더 많은 꿀팁 보기
            </Button>
          </CardContent>
        </Card>

        {/* 주의사항 */}
        <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              주의사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• 강아지가 피곤해하거나 헥헥거리면 즉시 휴식을 취하세요</p>
              <p>• 다른 강아지와 만날 때는 주인의 허락을 먼저 구하세요</p>
              <p>• 이상한 것을 먹지 않도록 항상 주의깊게 관찰하세요</p>
              <p>• 날씨가 너무 덥거나 추울 때는 산책 시간을 조절하세요</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-20"></div>
    </div>
  )
}

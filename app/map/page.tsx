"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Search,
  Users,
  Volume2,
  VolumeX,
  TreePine,
  Building,
  ArrowLeft,
  Navigation,
  Heart,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

export default function MapPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showDogDensity, setShowDogDensity] = useState(true)

  const filters = [
    { id: "all", label: "전체", icon: MapPin },
    { id: "quiet", label: "조용한", icon: VolumeX },
    { id: "active", label: "활기찬", icon: Volume2 },
    { id: "park", label: "공원", icon: TreePine },
    { id: "urban", label: "도심", icon: Building },
  ]

  const walkingSpots = [
    {
      id: 1,
      name: "한강공원 뚝섬지구",
      distance: "0.3km",
      rating: 4.8,
      tags: ["조용한", "넓은공간", "강아지친구많음"],
      currentDogs: 12,
      description: "넓은 잔디밭과 강변 산책로가 있어 대형견도 자유롭게 뛸 수 있어요",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      name: "보라매공원",
      distance: "0.7km",
      rating: 4.6,
      tags: ["활기찬", "사람많음", "놀이시설"],
      currentDogs: 8,
      description: "다양한 연령대의 강아지들이 모여 사회화에 좋아요",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      name: "동네 산책로",
      distance: "0.1km",
      rating: 4.2,
      tags: ["조용한", "사람적음", "단거리"],
      currentDogs: 3,
      description: "집 근처 조용한 산책로, 짧은 산책에 적합해요",
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  const nearbyDogs = [
    { name: "골든이", breed: "골든리트리버", distance: "50m", mood: "친화적", owner: "김댕댕" },
    { name: "초코", breed: "푸들", distance: "120m", mood: "활발함", owner: "이멍멍" },
    { name: "바둑이", breed: "믹스", distance: "200m", mood: "차분함", owner: "박왈왈" },
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
              <h1 className="text-lg font-bold text-gray-900">실시간 산책지도</h1>
              <p className="text-sm text-gray-500">근처 산책로와 댕댕이 현황</p>
            </div>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-1" />내 위치
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* 검색 및 필터 */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="산책로 검색..." className="pl-10" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {filter.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* 지도 영역 (시뮬레이션) */}
        <Card className="relative overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 relative">
            {/* 지도 배경 시뮬레이션 */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[url('/placeholder.svg?height=256&width=400')] bg-cover bg-center"></div>
            </div>

            {/* 실시간 강아지 위치 표시 */}
            {showDogDensity && (
              <>
                <div className="absolute top-12 left-16 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  12
                </div>
                <div className="absolute top-32 right-20 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  8
                </div>
                <div className="absolute bottom-16 left-12 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  3
                </div>
              </>
            )}

            {/* 지도 컨트롤 */}
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                size="sm"
                variant={showDogDensity ? "default" : "outline"}
                onClick={() => setShowDogDensity(!showDogDensity)}
              >
                <Users className="w-4 h-4 mr-1" />
                댕댕이 현황
              </Button>
            </div>

            {/* 내 위치 표시 */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </Card>

        {/* 근처 산책로 리스트 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">근처 추천 산책로</h2>
            <Badge variant="secondary">{walkingSpots.length}곳</Badge>
          </div>

          {walkingSpots.map((spot) => (
            <Card key={spot.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                    <img
                      src={spot.image || "/placeholder.svg"}
                      alt={spot.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{spot.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {spot.distance}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{spot.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-orange-600">
                        <Users className="w-3 h-3" />
                        <span>{spot.currentDogs}마리 산책중</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {spot.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">{spot.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1">
                    <Navigation className="w-4 h-4 mr-1" />
                    길찾기
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 근처 댕댕친구들 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              지금 근처에서 산책중인 댕댕이들
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nearbyDogs.map((dog, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">🐕</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{dog.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {dog.breed}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {dog.distance} • {dog.mood} • {dog.owner}님
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  인사하기
                </Button>
              </div>
            ))}

            <Link href="/community">
              <Button variant="ghost" className="w-full text-purple-600">
                더 많은 댕댕친구 보기 →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="h-20"></div>
    </div>
  )
}

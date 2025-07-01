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
  Mountain,
  Building2,
  ArrowLeft,
  Navigation,
  Heart,
  MessageCircle,
  ZoomIn,
  ZoomOut,
  Compass,
  Layers,
  AlertTriangle,
  CheckCircle,
  Clock,
  Dog,
} from "lucide-react"
import Link from "next/link"

export default function MapPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [mapZoom, setMapZoom] = useState(1)

  // 강아지 마리 수 및 혼잡도 데이터
  const dogPoints = [
    { x: 16, y: 12, count: 12, congestion: "혼잡한 지역입니다", type: "busy" },
    { x: 80, y: 32, count: 8, congestion: "적정 규모입니다", type: "moderate" },
    { x: 12, y: 84, count: 3, congestion: "작은 규모입니다", type: "small" },
  ];

  // 공원/도심 아이콘 위치 데이터
  const mapIcons = [
    { x: 20, y: 15, type: "park" },
    { x: 75, y: 35, type: "park" },
    { x: 50, y: 50, type: "urban" },
  ];

  const getColor = (type: string) => {
    switch (type) {
      case "busy": return "bg-orange-500";
      case "moderate": return "bg-blue-500";
      case "small": return "bg-green-500";
      default: return "bg-gray-400";
    }
  };

  const filters = [
    { id: "all", label: "전체", icon: MapPin },
    { id: "quiet", label: "조용한", icon: VolumeX },
    { id: "active", label: "활기찬", icon: Volume2 },
    { id: "park", label: "공원", icon: Mountain },
    { id: "urban", label: "도심", icon: Building2 },
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
      image: "/placeholder.jpg",
      coordinates: { x: 20, y: 15 },
      type: "park",
      congestion: "busy",
      congestionText: "혼잡한 지역입니다",
      congestionDescription: "현재 많은 강아지들이 산책 중이에요"
    },
    {
      id: 2,
      name: "보라매공원",
      distance: "0.7km",
      rating: 4.6,
      tags: ["활기찬", "사람많음", "놀이시설"],
      currentDogs: 8,
      description: "다양한 연령대의 강아지들이 모여 사회화에 좋아요",
      image: "/placeholder.jpg",
      coordinates: { x: 75, y: 35 },
      type: "park",
      congestion: "moderate",
      congestionText: "적당히 활기찬 지역입니다",
      congestionDescription: "적절한 수의 강아지들이 있어요"
    },
    {
      id: 3,
      name: "동네 산책로",
      distance: "0.1km",
      rating: 4.2,
      tags: ["조용한", "사람적음", "단거리"],
      currentDogs: 3,
      description: "집 근처 조용한 산책로, 짧은 산책에 적합해요",
      image: "/placeholder.jpg",
      coordinates: { x: 15, y: 80 },
      type: "path",
      congestion: "quiet",
      congestionText: "조용한 지역입니다",
      congestionDescription: "차분한 산책을 원한다면 추천해요"
    },
  ]

  const nearbyDogs = [
    { name: "골든이", breed: "골든리트리버", distance: "50m", mood: "친화적", owner: "김댕댕" },
    { name: "초코", breed: "푸들", distance: "120m", mood: "활발함", owner: "이멍멍" },
    { name: "바둑이", breed: "믹스", distance: "200m", mood: "차분함", owner: "박왈왈" },
  ]

  const handleZoomIn = () => setMapZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setMapZoom(prev => Math.max(prev - 0.2, 0.5))

  const getCongestionColor = (congestion: string) => {
    switch (congestion) {
      case "busy":
        return "text-red-600 bg-red-50 border-red-200"
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "quiet":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getCongestionIcon = (congestion: string) => {
    switch (congestion) {
      case "busy":
        return <AlertTriangle className="w-4 h-4" />
      case "moderate":
        return <Clock className="w-4 h-4" />
      case "quiet":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="w-full max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">실시간 산책지도</h1>
              <p className="text-sm text-gray-500 truncate">근처 산책로와 댕댕이 현황</p>
            </div>
            <Button variant="outline" size="sm" className="flex-shrink-0">
              <Navigation className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">내 위치</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* 검색 및 필터 */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="산책로 검색..." className="pl-10 w-full" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap flex-shrink-0"
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {filter.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* 개선된 지도 영역 */}
        <Card className="relative overflow-hidden">
          <div className="h-80 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 relative">
            {/* 지도 배경 패턴 */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
                  linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* 도로 네트워크 시뮬레이션 */}
            <div className="absolute inset-0">
              {/* 메인 도로 */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 opacity-40"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300 opacity-40"></div>
              
              {/* 보조 도로 */}
              <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200 opacity-30"></div>
              <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gray-200 opacity-30"></div>
              <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-gray-200 opacity-30"></div>
              <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-gray-200 opacity-30"></div>
            </div>

            {/* 강아지 마리 수 원 표시 (지형 아이콘 + 숫자) */}
            {dogPoints.map((pt, i) => (
              <div
                key={i}
                className="absolute group"
                style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: "translate(-50%,-50%)" }}
              >
                {/* 숫자 원 내부에 지형 아이콘과 숫자 */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${getColor(pt.type)} group-hover:scale-110 transition`}>
                  <div className="flex flex-col items-center">
                    {pt.type === "busy" ? (
                      <Building2 className="w-4 h-4" />
                    ) : pt.type === "moderate" ? (
                      <Mountain className="w-4 h-4" />
                    ) : (
                      <Mountain className="w-4 h-4" />
                    )}
                    <span className="text-sm">{pt.count}</span>
                  </div>
                </div>
                {/* 호버 버블 */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition z-20 flex flex-col items-center">
                  <div className="px-4 py-2 rounded-lg shadow-lg bg-white text-gray-800 text-xs font-semibold border whitespace-nowrap">
                    {pt.congestion}
                  </div>
                  {/* 말풍선 꼬리 */}
                  <div className="w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white mx-auto -mt-1"></div>
                </div>
              </div>
            ))}

            {/* 지도 컨트롤 패널 */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomIn}
                    className="w-8 h-8 p-0"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomOut}
                    className="w-8 h-8 p-0"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 나침반 */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <Compass className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {/* 줌 레벨 표시 */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
              <span className="text-xs font-medium text-gray-600">
                {Math.round(mapZoom * 100)}%
              </span>
            </div>
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
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg"
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{spot.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 flex-shrink-0 ml-2">
                        <MapPin className="w-3 h-3" />
                        {spot.distance}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">🐕</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{dog.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {dog.breed}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {dog.distance} • {dog.mood} • {dog.owner}님
                  </div>
                </div>
                <Button size="sm" variant="outline" className="flex-shrink-0">
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

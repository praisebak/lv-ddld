"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
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
  AlertTriangle,
  CheckCircle,
  Clock,
  Dog,
  Timer,
  Play,
  Pause,
  Square,
  CheckCircle2,
  Trophy,
  Star,
  Bell,
  Settings,
  Award,
  BarChart3,
  Plus,
  X,
} from "lucide-react"
import Link from "next/link"

export default function MapPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [mapZoom, setMapZoom] = useState(1)
  const [isWalking, setIsWalking] = useState(false)
  const [activeTab, setActiveTab] = useState("map")
  const [showChecklistModal, setShowChecklistModal] = useState(false)
  const [showNearbyDogs, setShowNearbyDogs] = useState(false)

  // 산책 타이머 상태
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [walkGoal, setWalkGoal] = useState(30) // 30분 목표

  // 체크리스트 상태
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "목줄/하네스 착용", completed: false },
    { id: 2, text: "배변봉투 준비", completed: false },
    { id: 3, text: "물병 준비", completed: false },
    { id: 4, text: "강아지 신분증 확인", completed: false },
    { id: 5, text: "날씨 확인", completed: false },
  ])

  // 게임화 상태
  const [userStats, setUserStats] = useState({
    level: 5,
    points: 1250,
    streak: 7,
    totalWalks: 45,
    totalTime: "23시간 15분",
    badges: ["첫산책", "연속3일", "10km달성"],
  })

  // 타이머 효과
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startWalk = () => {
    setShowChecklistModal(true)
  }

  const completeChecklist = () => {
    const allCompleted = checklistItems.every(item => item.completed)
    if (allCompleted) {
      setShowChecklistModal(false)
      setIsWalking(true)
      setTimerActive(true)
    }
  }

  const pauseWalk = () => {
    setTimerActive(false)
  }

  const stopWalk = () => {
    setIsWalking(false)
    setTimerActive(false)
    setTimerSeconds(0)
  }

  // 강아지 마리 수 및 혼잡도 데이터
  const dogPoints = [
    { x: 16, y: 12, count: 12, congestion: "혼잡한 지역입니다", type: "busy" },
    { x: 80, y: 32, count: 8, congestion: "적정 규모입니다", type: "moderate" },
    { x: 12, y: 84, count: 3, congestion: "작은 규모입니다", type: "small" },
  ];

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
      coordinates: { x: 20, y: 15 },
      type: "park",
      congestion: "busy",
    },
    {
      id: 2,
      name: "보라매공원",
      distance: "0.7km",
      rating: 4.6,
      tags: ["활기찬", "사람많음", "놀이시설"],
      currentDogs: 8,
      description: "다양한 연령대의 강아지들이 모여 사회화에 좋아요",
      coordinates: { x: 75, y: 35 },
      type: "park",
      congestion: "moderate",
    },
    {
      id: 3,
      name: "동네 산책로",
      distance: "0.1km",
      rating: 4.2,
      tags: ["조용한", "사람적음", "단거리"],
      currentDogs: 3,
      description: "집 근처 조용한 산책로, 짧은 산책에 적합해요",
      coordinates: { x: 15, y: 80 },
      type: "path",
      congestion: "quiet",
    },
  ]

  const nearbyDogs = [
    { 
      id: 1,
      name: "골든이", 
      breed: "골든리트리버", 
      distance: "50m", 
      mood: "친화적", 
      owner: "김댕댕", 
      avatar: "🐕",
      age: "3살",
      size: "대형견",
      personality: "활발하고 친화적이에요",
      isWalking: true,
      walkStartTime: "14:30",
      location: "한강공원 뚝섬지구"
    },
    { 
      id: 2,
      name: "초코", 
      breed: "푸들", 
      distance: "120m", 
      mood: "활발함", 
      owner: "이멍멍", 
      avatar: "🐩",
      age: "2살",
      size: "중형견",
      personality: "장난기 많고 똑똑해요",
      isWalking: true,
      walkStartTime: "14:25",
      location: "보라매공원"
    },
    { 
      id: 3,
      name: "바둑이", 
      breed: "믹스", 
      distance: "200m", 
      mood: "차분함", 
      owner: "박왈왈", 
      avatar: "🐕‍🦺",
      age: "5살",
      size: "중형견",
      personality: "차분하고 순한 성격이에요",
      isWalking: true,
      walkStartTime: "14:20",
      location: "동네 산책로"
    },
    { 
      id: 4,
      name: "루시", 
      breed: "말티즈", 
      distance: "80m", 
      mood: "겁많음", 
      owner: "최멍멍", 
      avatar: "🐕",
      age: "1살",
      size: "소형견",
      personality: "조용하고 소심해요",
      isWalking: true,
      walkStartTime: "14:35",
      location: "한강공원 뚝섬지구"
    },
    { 
      id: 5,
      name: "맥스", 
      breed: "허스키", 
      distance: "150m", 
      mood: "에너지 넘침", 
      owner: "정왈왈", 
      avatar: "🐺",
      age: "2살",
      size: "대형견",
      personality: "에너지 넘치고 장난기 많아요",
      isWalking: true,
      walkStartTime: "14:15",
      location: "보라매공원"
    }
  ]

  const handleZoomIn = () => setMapZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setMapZoom(prev => Math.max(prev - 0.2, 0.5))

  const getColor = (type: string) => {
    switch (type) {
      case "busy": return "bg-orange-500";
      case "moderate": return "bg-blue-500";
      case "small": return "bg-green-500";
      default: return "bg-gray-400";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "busy": return <Building2 className="w-4 h-4" />; // 도심 산책로
      case "moderate": return <Mountain className="w-4 h-4" />; // 공원 산책로
      case "small": return <MapPin className="w-4 h-4" />; // 동네 산책로
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 - 통합 정보 바 */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="w-full max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-gray-900 truncate">산책지도</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    🔥 {userStats.streak}일 연속
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    Lv.{userStats.level}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-shrink-0">
                <Navigation className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">내 위치</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-shrink-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 지도 영역 */}
      <div className="relative">
        {/* 지도 컨테이너 */}
        <div className="h-96 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 relative">
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

          {/* 도로 네트워크 */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 opacity-40"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300 opacity-40"></div>
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200 opacity-30"></div>
            <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gray-200 opacity-30"></div>
            <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-gray-200 opacity-30"></div>
            <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-gray-200 opacity-30"></div>
          </div>

          {/* 강아지 마리 수 원 표시 */}
          {dogPoints.map((pt, i) => (
            <div
              key={i}
              className="absolute group cursor-pointer"
              style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: "translate(-50%,-50%)" }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${getColor(pt.type)} group-hover:scale-110 transition`}>
                <div className="flex flex-col items-center">
                  {getIcon(pt.type)}
                  <span className="text-sm">{pt.count}</span>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition z-20 flex flex-col items-center">
                <div className="px-4 py-2 rounded-lg shadow-lg bg-white text-gray-800 text-xs font-semibold border whitespace-nowrap">
                  {pt.congestion}
                </div>
                <div className="w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white mx-auto -mt-1"></div>
              </div>
            </div>
          ))}

          {/* 지도 컨트롤 */}
          <div className="absolute top-4 right-4 space-y-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="outline" onClick={handleZoomIn} className="w-8 h-8 p-0">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomOut} className="w-8 h-8 p-0">
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

          {/* 줌 레벨 */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
            <span className="text-xs font-medium text-gray-600">
              {Math.round(mapZoom * 100)}%
            </span>
          </div>
        </div>

        {/* 플로팅 산책 시작 버튼 */}
        {!isWalking && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
              onClick={startWalk}
            >
              <Play className="w-5 h-5 mr-2" />
              산책 시작
            </Button>
          </div>
        )}

        {/* 산책 중 타이머 오버레이 */}
        {isWalking && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {formatTime(timerSeconds)}
              </div>
              <div className="flex gap-2">
                {timerActive ? (
                  <Button size="sm" variant="outline" onClick={pauseWalk}>
                    <Pause className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setTimerActive(true)}>
                    <Play className="w-4 h-4" />
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={stopWalk}>
                  <Square className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-2">
                <Progress value={(timerSeconds / (walkGoal * 60)) * 100} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">
                  목표: {walkGoal}분 ({Math.round((timerSeconds / (walkGoal * 60)) * 100)}%)
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowNearbyDogs(!showNearbyDogs)}
                  className="text-xs"
                >
                  <Users className="w-3 h-3 mr-1" />
                  근처 댕댕이 {nearbyDogs.length}마리
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 산책 중 주변 강아지들 프로필 */}
        {isWalking && showNearbyDogs && (
          <div className="absolute bottom-20 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border max-h-96 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">근처에서 산책중인 댕댕이들</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNearbyDogs(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {nearbyDogs.map((dog) => (
                  <div key={dog.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {dog.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-gray-900">{dog.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {dog.breed}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {dog.size}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>{dog.age} • {dog.owner}님</div>
                        <div>{dog.distance} • {dog.mood}</div>
                        <div className="text-purple-600">{dog.location}</div>
                        <div className="text-gray-500 italic">"{dog.personality}"</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Heart className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 하단 탭 네비게이션 */}
      <div className="bg-white border-t">
        <div className="max-w-lg mx-auto">
          <div className="flex">
            <Button
              variant={activeTab === "map" ? "default" : "ghost"}
              className="flex-1 py-3"
              onClick={() => setActiveTab("map")}
            >
              <MapPin className="w-4 h-4 mr-2" />
              지도
            </Button>
            <Button
              variant={activeTab === "spots" ? "default" : "ghost"}
              className="flex-1 py-3"
              onClick={() => setActiveTab("spots")}
            >
              <Mountain className="w-4 h-4 mr-2" />
              산책로
            </Button>
            <Button
              variant={activeTab === "dogs" ? "default" : "ghost"}
              className="flex-1 py-3"
              onClick={() => setActiveTab("dogs")}
            >
              <Users className="w-4 h-4 mr-2" />
              댕댕이
            </Button>
            <Button
              variant={activeTab === "tools" ? "default" : "ghost"}
              className="flex-1 py-3"
              onClick={() => setActiveTab("tools")}
            >
              <Settings className="w-4 h-4 mr-2" />
              도구
            </Button>
          </div>
        </div>
      </div>

      {/* 탭별 콘텐츠 */}
      <div className="max-w-lg mx-auto px-4 py-4">
        {activeTab === "map" && (
          <div className="space-y-4">
            {/* 검색 및 필터 */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="산책로 검색..." className="pl-10 w-full" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
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

            {/* 실시간 정보 카드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  실시간 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">근처 댕댕이</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {nearbyDogs.length}마리
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">추천 산책로</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {walkingSpots.length}곳
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "spots" && (
          <div className="space-y-3">
            {walkingSpots.map((spot) => (
              <Card key={spot.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Mountain className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{spot.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 flex-shrink-0 ml-2">
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
                          <span>{spot.currentDogs}마리</span>
                        </div>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "dogs" && (
          <div className="space-y-3">
            {nearbyDogs.map((dog, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {dog.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{dog.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {dog.breed}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {dog.distance} • {dog.mood} • {dog.owner}님
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-4">
            {/* 체크리스트 - 산책 중이 아닐 때만 표시 */}
            {!isWalking && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    산책 체크리스트
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`check-${item.id}`}
                        checked={item.completed}
                        onCheckedChange={(checked) => {
                          setChecklistItems(prev => 
                            prev.map(i => i.id === item.id ? { ...i, completed: !!checked } : i)
                          )
                        }}
                      />
                      <label 
                        htmlFor={`check-${item.id}`}
                        className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                      >
                        {item.text}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* 통계 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  산책 통계
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{userStats.totalWalks}</div>
                    <div className="text-xs text-gray-600">총 산책</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{userStats.totalTime}</div>
                    <div className="text-xs text-gray-600">총 시간</div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-yellow-600">{userStats.points} 포인트</div>
                  <div className="text-xs text-gray-600">다음 레벨까지 250 포인트 남음!</div>
                </div>
              </CardContent>
            </Card>

            {/* 뱃지 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  획득 뱃지
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {userStats.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      🏆 {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* 체크리스트 모달 */}
      {showChecklistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">산책 준비 체크리스트</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChecklistModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-3 mb-6">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Checkbox 
                      id={`modal-check-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={(checked) => {
                        setChecklistItems(prev => 
                          prev.map(i => i.id === item.id ? { ...i, completed: !!checked } : i)
                        )
                      }}
                    />
                    <label 
                      htmlFor={`modal-check-${item.id}`}
                      className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowChecklistModal(false)}
                >
                  취소
                </Button>
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={completeChecklist}
                  disabled={!checklistItems.every(item => item.completed)}
                >
                  산책 시작하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 하단 여백 */}
      <div className="h-20"></div>
    </div>
  )
} 
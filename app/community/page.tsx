"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  Plus,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  ArrowLeft,
  Calendar,
  Star,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("groups")

  const walkingGroups = [
    {
      id: 1,
      name: "한강 대형견 모임",
      location: "한강공원 뚝섬지구",
      time: "매주 토요일 오전 10시",
      members: 24,
      description: "대형견들의 자유로운 놀이와 사회화를 위한 정기 모임입니다.",
      tags: ["대형견", "정기모임", "사회화"],
      nextMeeting: "2024-01-13",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "보라매공원 소형견 클럽",
      location: "보라매공원",
      time: "매주 일요일 오후 3시",
      members: 18,
      description: "소형견 전용 모임으로 안전하고 즐거운 산책을 함께해요.",
      tags: ["소형견", "안전", "친목"],
      nextMeeting: "2024-01-14",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "퍼피 사회화 교실",
      location: "올림픽공원",
      time: "매주 화,목 오후 4시",
      members: 12,
      description: "6개월 미만 강아지들의 올바른 사회화를 도와드려요.",
      tags: ["퍼피", "사회화", "교육"],
      nextMeeting: "2024-01-09",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const nearbyFriends = [
    {
      id: 1,
      name: "골든이",
      breed: "골든리트리버",
      age: "3살",
      personality: ["친화적", "활발함", "똑똑함"],
      owner: "김댕댕님",
      distance: "0.2km",
      lastSeen: "5분 전",
      status: "산책중",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "초코",
      breed: "토이푸들",
      age: "2살",
      personality: ["귀여움", "장난꾸러기", "사교적"],
      owner: "이멍멍님",
      distance: "0.4km",
      lastSeen: "10분 전",
      status: "놀이터",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "바둑이",
      breed: "믹스",
      age: "5살",
      personality: ["차분함", "온순함", "경험많음"],
      owner: "박왈왈님",
      distance: "0.6km",
      lastSeen: "15분 전",
      status: "휴식중",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const walkingEvents = [
    {
      id: 1,
      title: "신년 단체 산책",
      date: "2024-01-15",
      time: "오전 10:00",
      location: "한강공원 여의도지구",
      participants: 45,
      maxParticipants: 50,
      description: "새해를 맞아 모든 댕댕이들과 함께하는 대규모 산책 이벤트!",
      organizer: "댕댕로드 운영팀",
    },
    {
      id: 2,
      title: "겨울 건강 산책",
      date: "2024-01-12",
      time: "오후 2:00",
      location: "보라매공원",
      participants: 12,
      maxParticipants: 20,
      description: "겨울철 강아지 건강관리와 함께하는 산책 모임",
      organizer: "수의사 최멍멍",
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
              <h1 className="text-lg font-bold text-gray-900">산책 커뮤니티</h1>
              <p className="text-sm text-gray-500">댕댕친구들과 함께해요</p>
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-1" />
              모임 만들기
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* 검색 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="모임이나 친구 검색..." className="pl-10" />
        </div>

        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="groups">산책 모임</TabsTrigger>
            <TabsTrigger value="friends">댕댕친구</TabsTrigger>
            <TabsTrigger value="events">이벤트</TabsTrigger>
          </TabsList>

          {/* 산책 모임 탭 */}
          <TabsContent value="groups" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">우리 동네 산책팸</h2>
              <Badge variant="secondary">{walkingGroups.length}개 모임</Badge>
            </div>

            {walkingGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {group.members}명
                        </Badge>
                      </div>

                      <div className="space-y-1 mb-2">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {group.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          {group.time}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <Calendar className="w-3 h-3" />
                          다음 모임: {group.nextMeeting}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {group.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2">{group.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <UserPlus className="w-4 h-4 mr-1" />
                      가입하기
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
          </TabsContent>

          {/* 댕댕친구 탭 */}
          <TabsContent value="friends" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">근처 댕댕친구들</h2>
              <Button size="sm" variant="outline">
                <Search className="w-4 h-4 mr-1" />
                친구 찾기
              </Button>
            </div>

            {nearbyFriends.map((friend) => (
              <Card key={friend.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                      <img
                        src={friend.image || "/placeholder.svg"}
                        alt={friend.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                          <p className="text-sm text-gray-600">
                            {friend.breed} • {friend.age}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{friend.distance}</div>
                          <Badge variant={friend.status === "산책중" ? "default" : "secondary"} className="text-xs">
                            {friend.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {friend.personality.map((trait, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{friend.owner}</span>
                        <span className="text-xs text-gray-500">{friend.lastSeen}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      인사하기
                    </Button>
                    <Button size="sm" variant="outline">
                      <UserPlus className="w-4 h-4 mr-1" />
                      친구추가
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 이벤트 탭 */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">특별 이벤트</h2>
              <Badge variant="secondary">{walkingEvents.length}개 이벤트</Badge>
            </div>

            {walkingEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-md transition-shadow border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>

                      <div className="space-y-1 mb-2">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {event.date} {event.time}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Users className="w-3 h-3" />
                          {event.participants}/{event.maxParticipants}명 참여
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                      <p className="text-xs text-gray-500">주최: {event.organizer}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                      참여하기
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20"></div>
    </div>
  )
}

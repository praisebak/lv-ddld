"use client"
import { useEffect, useState } from "react"

interface DogInfo {
  id: number
  name: string
  breed: string
  distance: string
  owner: string
  avatar: string
  age: string
  size: string
  personality: string
  isFriend: boolean
}

interface WalkData {
  date: string
  duration: number // 초
  distance: number // km
  pace: number // 분/km
  breeds: string[]
  dogs: DogInfo[]
  photo: string | null
}

export default function WalkResultPage() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [breeds, setBreeds] = useState<string[]>([])
  const [dogs, setDogs] = useState<DogInfo[]>([])
  const [walkData, setWalkData] = useState<WalkData | null>(null)
  const [weeklyStats, setWeeklyStats] = useState({ distance: 0, count: 0, time: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPhotoUrl(localStorage.getItem("walkPhoto"))
      const breedList = localStorage.getItem("walkBreeds")
      setBreeds(breedList ? JSON.parse(breedList) : [])
      
      const dogsList = localStorage.getItem("walkDogs")
      setDogs(dogsList ? JSON.parse(dogsList) : [])
      
      // 오늘 산책 데이터 가져오기
      const todayWalkData = localStorage.getItem("walkData")
      if (todayWalkData) {
        setWalkData(JSON.parse(todayWalkData))
      }

      // 주간 통계 계산
      const history = JSON.parse(localStorage.getItem("walkHistory") || "[]")
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      
      const weeklyRecords = history.filter((record: WalkData) => 
        new Date(record.date) >= oneWeekAgo
      )
      
      const weeklyDistance = weeklyRecords.reduce((sum: number, record: WalkData) => sum + record.distance, 0)
      const weeklyTime = weeklyRecords.reduce((sum: number, record: WalkData) => sum + record.duration, 0)
      
      setWeeklyStats({
        distance: weeklyDistance,
        count: weeklyRecords.length,
        time: weeklyTime
      })
    }
  }, [])

  const handleAddFriend = (dogId: number) => {
    setDogs(prevDogs => 
      prevDogs.map(dog => 
        dog.id === dogId ? { ...dog, isFriend: !dog.isFriend } : dog
      )
    )
    
    // localStorage 업데이트
    const updatedDogs = dogs.map(dog => 
      dog.id === dogId ? { ...dog, isFriend: !dog.isFriend } : dog
    )
    localStorage.setItem('walkDogs', JSON.stringify(updatedDogs))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}분 ${secs}초`
  }

  const formatPace = (pace: number) => {
    if (pace === 0 || !isFinite(pace)) return "--"
    const mins = Math.floor(pace)
    const secs = Math.round((pace - mins) * 60)
    return `${mins}'${secs.toString().padStart(2, '0')}" /km`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl mb-2">🎉</span>
          <h1 className="text-2xl font-extrabold text-orange-600 mb-1">산책 완료!</h1>
          <p className="text-gray-500 text-sm">오늘 산책을 성공적으로 마쳤어요</p>
        </div>

        {/* 오늘 산책 통계 */}
        {walkData && (
          <div className="w-full mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">🏃‍♂️ 오늘의 운동량</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{walkData.distance.toFixed(1)}km</div>
                <div className="text-xs text-gray-600">총 거리</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{formatTime(walkData.duration)}</div>
                <div className="text-xs text-gray-600">운동 시간</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">
                  {formatPace(walkData.pace)}
                </div>
                <div className="text-xs text-gray-600">평균 페이스</div>
              </div>
            </div>
          </div>
        )}

        {/* 주간 통계 */}
        <div className="w-full mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
          <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">📅 이번 주 달력 기록</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">{weeklyStats.distance.toFixed(1)}km</div>
              <div className="text-xs text-gray-600">주간 거리</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{weeklyStats.count}회</div>
              <div className="text-xs text-gray-600">산책 횟수</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{Math.floor(weeklyStats.time / 60)}분</div>
              <div className="text-xs text-gray-600">누적 시간</div>
            </div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded-lg">
            <div className="text-sm text-gray-600">
              평균 {weeklyStats.count > 0 ? (weeklyStats.distance / weeklyStats.count).toFixed(1) : 0}km/회 • 
              일일 {weeklyStats.count > 0 ? Math.floor(weeklyStats.time / weeklyStats.count / 60) : 0}분 운동
            </div>
          </div>
        </div>

        {/* 산책 사진 */}
        {photoUrl ? (
          <img src={photoUrl} alt="산책 사진" className="rounded-xl border-4 border-orange-200 shadow-lg mb-6 max-h-60 object-cover" />
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-orange-50 rounded-xl border-2 border-dashed border-orange-200 mb-6 text-orange-300 text-3xl">🐶</div>
        )}

        {/* 만난 댕댕이들 */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">🐕 오늘 만난 친구들</h2>
        {dogs.length > 0 ? (
          <div className="w-full space-y-3 mb-6">
            {dogs.map((dog) => (
              <div key={dog.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 shadow-sm">
                <div className="flex items-start gap-3">
                  {/* 아바타 */}
                  <div className="text-3xl">{dog.avatar}</div>
                  
                  {/* 댕댕이 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{dog.name}</h3>
                      <span className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-full">
                        {dog.distance}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-sm">
                        <span className="text-gray-600">품종:</span>
                        <span className="ml-1 font-medium text-purple-700">{dog.breed}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">나이:</span>
                        <span className="ml-1 font-medium text-purple-700">{dog.age}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">크기:</span>
                        <span className="ml-1 font-medium text-purple-700">{dog.size}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">보호자:</span>
                        <span className="ml-1 font-medium text-purple-700">{dog.owner}님</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-600 italic mb-3 bg-white/40 p-2 rounded-lg">
                      "{dog.personality}"
                    </div>
                    
                    {/* 친구추가 버튼 */}
                    <button
                      onClick={() => handleAddFriend(dog.id)}
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                        dog.isFriend 
                          ? 'bg-green-500 text-white shadow-md' 
                          : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      {dog.isFriend ? '✅ 친구 추가됨' : '🤝 친구추가하기'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 mb-6 text-center py-8 bg-gray-50 rounded-xl">
            오늘 만난 댕댕이가 없습니다.
          </div>
        )}

        <button
          className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow transition"
          onClick={() => window.location.href = '/'}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
} 
import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import {selectIsAuthenticated} from "features/user/users-slice"
import {getDetailFollow} from "api/petpicks-api"
import PetpickIconContainer from "components/petpick/PetpickIconContainer"

const ProfileForAnimal = ({animalId, animalname, image}) => {
  const [isFollow, setIsFollow] = useState(false)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    const fetchFollow = async (animalId) => {
      try {
        const nowFollow = await getDetailFollow(animalId)
        setIsFollow(nowFollow)
      } catch {
        console.log("catch")
      }
    }

    fetchFollow(animalId)
  }, [])

  return (
    <div className="relative flex h-12 w-fit items-center justify-start space-x-2.5 rounded-sm px-2 shadow-md">
      <img
        src={image || "/images/profile.jpg"}
        alt="동물 프로필 사진"
        className="size-10 rounded-full border"
        onError={(e) => {
          e.target.src = "/images/profile.jpg" // 이미지 로드 실패 시 기본 이미지로 대체
        }}
      />
      <div className="font-semibold"> {animalname}</div>

      <PetpickIconContainer
        isFollowing={isFollow}
        isLogin={isAuthenticated}
        animalId={animalId}
        isFollowButton={true}
      />
    </div>
  )
}

export default ProfileForAnimal

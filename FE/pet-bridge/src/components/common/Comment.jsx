import {useEffect, useRef, useState} from "react"
import OptionIcon from "./OptionIcon"

const Comment = ({data, currentUserId, onDelete}) => {
  const [isFixedSize, setIsFixedSize] = useState(true)
  // console.log(isFixedSize)
  const handleToggleSize = () => {
    setIsFixedSize(!isFixedSize)
  }
  const handleDelete = (id) => {
    console.log(id)
    onDelete(id)
  }

  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    // 댓글이 지정된 높이를 초과할 때 "더보기" 버튼을 표시
    if (contentRef.current) {
      setShowReadMore(contentRef.current.scrollHeight > 64)
    }
  }, [])

  return (
    <>
      <div className="flex space-x-2.5 px-5 pt-2">
        <div className="mt-2 size-11">
          <img
            src={data.userImage || "/images/profile.jpg"}
            alt="profile"
            className="size-10 overflow-hidden rounded-full object-cover"
          />
          {/* <Image imageName={Siren.png}></Image> */}
        </div>
        <div className="w-full ">
          <div className="flex  h-7 items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="  text-base font-semibold ">
                {data.userNickname}
              </div>
              <div className="  text-xs  ">{data.registTime.split("T")[0]}</div>
            </div>
            <OptionIcon
              userId={data.userId}
              currentUserId={currentUserId}
              onDelete={() => {
                handleDelete(data.id)
              }}
            ></OptionIcon>
          </div>
          <div className="flex flex-col ">
            <div
              ref={contentRef}
              className={`transition-height w-full pr-3 text-base  duration-300 ease-in-out ${isFixedSize ? "h-12 overflow-hidden" : "h-fit"}`}
            >
              {data.content}
            </div>
            {showReadMore && (
              <button
                className="mr-3 mt-1 flex justify-end rounded text-base text-stroke hover:text-black"
                onClick={handleToggleSize}
              >
                {isFixedSize ? "더보기" : "닫기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment

import {patchUserInfo} from "api/users-api"
import DefaultUser150 from "assets/icons/icon-default-user-150.svg"
import {
  getUserInfoThunk,
  selectBirth,
  selectEmail,
  selectId,
  selectImage,
  selectNickname,
  selectPhone,
  selectSocialType,
} from "features/user/users-slice"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {
  validateBirth,
  validateNickname,
  validatePassword,
  // validatePhone,
} from "utils/user-validations"
const UpdateProfileContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userId = useSelector(selectId)
  const nickname = useSelector(selectNickname)
  const email = useSelector(selectEmail)
  const birth = useSelector(selectBirth)
  const phone = useSelector(selectPhone)
  const image = useSelector(selectImage)
  const socialType = useSelector(selectSocialType)

  // 유저 정보 수정 폼 제출을 위한 인자 저장 state
  const [updateFormData, setUpdateFormData] = useState({
    nickname: nickname,
    birth: birth,
    // phone: phone,
    image: image,
  })

  // 유효성 검사 실패 에러 메시지 저장을 위한 state
  const [errors, setErrors] = useState({})

  // 이미지 파일, 미리보기 URL 저장 state
  const [selectedImageFile, setSelectedImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(image || DefaultUser150)

  // 에러메세지 수정
  const setError = (new_error, new_error_message) => {
    if (new_error) {
      setErrors({...errors, [new_error]: new_error_message})
    }
  }

  // 입력값이 변경되면 행동할 Handler 정의
  const changeHandler = (event) => {
    const target = event.target
    const id = target.id

    // 입력 값과 FormData를 연동시킴
    setUpdateFormData({
      ...updateFormData,
      [id]: target.value,
    })
  }

  // 이미지 입력이 변경 Handler
  const imageChangeHandler = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImageFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // 컨펌 입력 처리 함수
  const changeConfirmHandler = (e) => {
    const target = e.target
    const id = target.id

    // 입력 값과 ConfirmNumbers를 연동시킴
    setConfirmNumbers({
      ...confirmNumbers,
      [id]: target.value,
    })
  }

  // 폼 제출 핸들러
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    let newErrors = {}

    let nicknameError = await validateNickname(updateFormData)
    if (updateFormData.nickname === nickname) {
      setError("phone", "")
    } else if (nicknameError.new_error) {
      newErrors.nickname = nicknameError.new_error_message
    }

    let birthError = validateBirth(updateFormData)
    if (birthError.new_error) {
      newErrors.birth = birthError.new_error_message
    }

    // let phoneError = validatePhone(updateFormData)
    // if (phoneError.new_error) {
    //   newErrors.phone = phoneError.new_error_message
    // }
    setErrors(newErrors)
    console.log("뉴에러ㅓㅓ", newErrors)
    // 에러가 없다면
    if (Object.values(newErrors).every((value) => value === "")) {
      // 이미지 추가를 위해 FormData 객체 생성 및 이미지 파일 추가
      const formData = new FormData()
      const formJsonData = {
        password: updateFormData.password,
        nickname: updateFormData.nickname,
        birth: updateFormData.birth,
        // phone: updateFormData.phone,
      }

      formData.append(
        "userEditRequestDto",
        new Blob([JSON.stringify(formJsonData)], {type: "application/json"})
      )
      // 이미지 파일 추가
      if (selectedImageFile) {
        formData.append("imageFile", selectedImageFile)
      }

      // FormData의 내용을 출력
      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }

      // patch 비동기 요청
      try {
        await patchUserInfo(formData)
        navigate(`/users/${userId}`)

        dispatch(getUserInfoThunk())

        return
      } catch (error) {
        console.log("patch 실패 에러", error)
      }
    }
  }

  // 비밀번호 확인 문자 저장을 위한 state
  const [confirmNumbers, setConfirmNumbers] = useState({
    passwordConfirm: "",
  })

  // 칸 입력 완료 후 Focus 해제(onBlur)시 해당 입력에 대한Validation 동작
  const onBlurHandler = async (event) => {
    let new_error = ""
    let new_error_message = ""
    // 이벤트가 발생한 대상
    const target = event.target
    // 아이디 추출 (입력값)
    const inputType = target.id
    // id 값으로 입력 양식 확인 후 양식 검사
    if (inputType === "nickname") {
      if (updateFormData.nickname === nickname) {
        setError("phone", "")
        return
      }
      ;({new_error, new_error_message} = await validateNickname(updateFormData))
      setError(new_error, new_error_message)
    } else if (inputType === "birth") {
      ;({new_error, new_error_message} = validateBirth(updateFormData))
      setError(new_error, new_error_message)
    }
    // else if (inputType === "phone") {
    //   ;({new_error, new_error_message} = validatePhone(updateFormData))
    //   setError(new_error, new_error_message)
    // }
    else if (inputType === "password") {
      if (updateFormData.password) {
        ;({new_error, new_error_message} = validatePassword(updateFormData))
        setError(new_error, new_error_message)
      }
    }
  }

  // 전화번호 입력시 정규표현식으로 숫자만 받도록 변환
  const onInputPhone = (e) => {
    const target = e.target
    if (target.value) {
      target.value = target.value
        .replace(/[^0-9]/g, "")
        .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{4})([0-9]{4})/g, "$1$2$3")
    }
  }

  return (
    <form
      className="flex size-full flex-col items-center space-y-1.5"
      onSubmit={onSubmitHandler}
    >
      <span className="text-2xl font-bold">{nickname}</span>
      <span>({email})</span>
      <label htmlFor="image" className="cursor-pointer">
        <img
          src={previewUrl}
          alt="유저이미지"
          className="size-48 rounded-full"
        />
      </label>
      {/* 프로필 입력 */}
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={imageChangeHandler}
        style={{display: "none"}}
      />
      {!socialType && socialType !== "null" ? (
        // 비밀번호 입력
        <div className="w-full">
          {/* 비밀번호 입력 창 */}
          <input
            value={updateFormData.password}
            onChange={changeHandler}
            type="password"
            className="my-1 w-full rounded-md border p-2.5"
            placeholder="비밀번호"
            id="password"
            minLength={8}
            maxLength={16}
            autoComplete="new-password"
            onBlur={onBlurHandler}
          />
          {/* 비밀번호 확인 입력 창 */}
          <input
            value={confirmNumbers.passwordConfirm}
            onChange={changeConfirmHandler}
            type="password"
            className=" my-1 w-full rounded-md border p-2.5"
            placeholder="비밀번호 확인"
            id="passwordConfirm"
            minLength={8}
            maxLength={16}
            autoComplete="new-password"
          />
          {errors.password && (
            <span className="text-alert col-span-12">{errors.password}</span>
          )}
        </div>
      ) : null}

      {/* 닉네임 입력 창 */}
      <div className="w-full">
        <input
          value={updateFormData.nickname}
          onChange={changeHandler}
          type="text"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="닉네임"
          id="nickname"
          maxLength={20}
          onBlur={onBlurHandler}
        />
        {errors.nickname && (
          <span className="text-alert col-span-12">{errors.nickname}</span>
        )}
      </div>
      {/* 전화번호 입력 창 */}
      <div className="w-full">
        <input
          disabled={true}
          value={phone}
          onInput={onInputPhone}
          onChange={changeHandler}
          type="text"
          className="my-1 w-full rounded-md border p-2.5"
          placeholder="휴대전화번호"
          id="phone"
          maxLength="11"
          onBlur={onBlurHandler}
        />
        {/* {errors.phone && (
          <span className="text-alert col-span-12">{errors.phone}</span>
        )} */}
      </div>
      {/* 생년월일 창 */}
      <div className="w-full">
        <input
          value={updateFormData.birth}
          onChange={changeHandler}
          type="date"
          className=" my-1 w-full rounded-md border p-2.5"
          placeholder="생년월일 8자리 (YYYYMMDD)"
          id="birth"
          minLength="8"
          maxLength="8"
          onBlur={onBlurHandler}
        />
        {errors.birth && (
          <span className="text-alert col-span-12">{errors.birth}</span>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-10">
        {/* 수정하기 버튼 */}
        <button type="submit" className="bg-mild h-12 rounded-md px-3.5 py-2.5">
          수정하기
        </button>
        {/* 취소 버튼 */}
        <Link
          to="/"
          type="button"
          className="bg-mild rounded-md px-3.5 py-2.5 text-center"
        >
          취소하기
        </Link>
      </div>
    </form>
  )
}

export default UpdateProfileContainer

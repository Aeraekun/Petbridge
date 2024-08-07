import axiosInstance from "./axios-instance"

// 유저의 모든 계약서 정보 조회
export const getUserContracts = (userId) => {
  const res = axiosInstance.get(`/contracts/user/${userId}`)
  return res
}

// 계약서 상세 정보 조회
export const getContractDetail = (contractId) => {
  const res = axiosInstance.get(`/contracts/${contractId}`)
  return res
}

// 계약서 도장 찍기 요청
export const patchContractCheck = async (contractInfo) => {
  const res = await axiosInstance.patch(
    `/contract-checks/${contractInfo.contractId}`,
    contractInfo
  )
  return res
}

// 계약서 작성 요청
export const postContract = async (contractFormData) => {
  const res = await axiosInstance.post("/contracts", contractFormData)

  return res
}

// 계약서 상태 변경 요청
// 계약자가 서명 후 계약 완전 체결을 위한 요청
export const patchContract = (contractEditRequestDto) => {
  try {
    const res = axiosInstance.patch(
      `/contracts/${contractEditRequestDto.id}`,
      contractEditRequestDto
    )
    return res
  } catch (error) {
    return error
  }
}

// 계약서 삭제 요청
export const disalbeContract = async (contractId) => {
  const res = await axiosInstance.delete(`/contracts/${contractId}`)

  return res
}

// 계약서 결제 요청
export const postPayment = async (name, totalPrice) => {
  try {
    const res = await axiosInstance.post(`/payment/ready`, {
      name: name,
      totalPrice: totalPrice,
    })

    return res
  } catch (error) {
    return error
  }
}

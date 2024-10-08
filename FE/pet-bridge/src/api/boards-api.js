import axios from "axios"
import axiosInstance from "./axios-instance"
import {Toast} from "utils/common-utils"
const BOARD_API_URL = process.env.REACT_APP_API_URL + "/boards"
const BOARD_COMMENTS_API_URL = process.env.REACT_APP_API_URL + "/board-comments"

//게시글 가져오기
export const getArticle = async (searchParams) => {
  try {
    const res = await axios.get(`${BOARD_API_URL}`, {params: searchParams})
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 가져오기
export const getLostArticle = async (searchParams) => {
  try {
    const res = await axios.get(`${BOARD_API_URL}/lost`, {params: searchParams})
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 상세 조회 (id)
export const getArticleDetail = async (id) => {
  try {
    const res = await axios.get(`${BOARD_API_URL}/${id}`)
    console.log("getArticleDetail" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 등록
export const registArticle = async (formData) => {
  console.log(formData)
  Toast.fire({icon: "success", title: "게시글 등록이 완료됐어요."})
  try {
    const res = await axiosInstance.post(`${BOARD_API_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("registArticle" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 수정
export const editArticle = async (id, formData) => {
  console.log("editArticle", formData)
  try {
    const res = await axiosInstance.patch(`${BOARD_API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("editArticle" + res)
    Toast.fire({icon: "success", title: "게시글 수정이 완료됐어요."})
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 삭제
export const removeArticle = async (articleId) => {
  try {
    const res = await axiosInstance.delete(`${BOARD_API_URL}/${articleId}`)
    console.log("removeBoard" + res)
    Toast.fire({icon: "success", title: "게시글 삭제를 성공했어요."})
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//댓글 조회
export const getListBoardComment = async (boardId) => {
  try {
    const res = await axios.get(`${BOARD_COMMENTS_API_URL}/${boardId}`)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//댓글 작성
export const registBoardComment = async (boardComment) => {
  try {
    const res = await axiosInstance.post(
      `${BOARD_COMMENTS_API_URL}`,
      boardComment
    )
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//댓글 수정
export const editBoardComment = async (boardId, boardComment) => {
  try {
    const res = await axiosInstance.patch(
      `${BOARD_COMMENTS_API_URL}/${boardId}`,
      boardComment
    )
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//댓글 삭제
export const removeBoardComment = async (id) => {
  try {
    const res = await axiosInstance.delete(`${BOARD_COMMENTS_API_URL}/${id}`)
    console.log("removeBoardComment" + res)
    Toast.fire({icon: "success", title: "댓글 삭제를 성공했어요."})
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

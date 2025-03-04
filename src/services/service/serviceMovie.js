import {
  fetchMoviesFromFirebase,
  getSubcommentsFromFirebase,
  pushSubcommentToFirebase,
  updateCommentsCountInFirebase,
  updateSubcommentInFirebase,
  deleteSubcommentInFirebase,
  updateCommentCountInFirebase,
  deleteCommentFromFirebase,
  addCommentToFirebase,
  updateMovieRatingInFirebase,
  checkUserHasCommentedInFirebase,
  updateCommentInFirebase,
} from "../firebase/firebaseMovie.js";
import {} from "../sql/sqlMovie";
const useFirebase = import.meta.env.VITE_USE_FIREBASE === "true"; // QUAN TRỌNG! // Chọn nguồn dữ liệu trong .env

// API LẤY DANH SÁCH PHIM
export const fetchMovies = async () => {
  return useFirebase
    ? await fetchMoviesFromFirebase()
    : await fetchMoviesFromSQL();
};

// API LẤY DANH SÁCH SUBCOMMENT CHO 1 COMMENT CỤ THỂ
export const getSubcomments = async (commentId) => {
  return useFirebase
    ? await getSubcommentsFromFirebase(commentId)
    : await getSubcommentsFromSQL(commentId);
};

// API THÊM COMMENT
export const addComment = async (commentData) => {
  return useFirebase
    ? await addCommentToFirebase(commentData)
    : await addCommentToSQL(commentData);
};

// API THÊM SUBCOMMENT
export const pushSubcomment = async (commentId, newSubcommentData) => {
  return useFirebase
    ? await pushSubcommentToFirebase(commentId, newSubcommentData)
    : await pushSubcommentToSQL(commentId, newSubcommentData);
};

// API CẬP NHẬT TỔNG SỐ BÌNH LUẬN VÀ ĐÁNH GIÁ CỦA PHIM
export const updateMovieRating = async (movieId, rating, isAdding) => {
  return useFirebase
    ? await updateMovieRatingInFirebase(movieId, rating, isAdding)
    : await updateMovieRatingInSQL(movieId, rating, isAdding);
};

// API CHỈNH SỬA SCOMMENT
export const updateComment = async (commentId, updatedData, newImage) => {
  return useFirebase
    ? await updateCommentInFirebase(commentId, updatedData, newImage)
    : await updateCommentToSQL(commentId, updatedData, newImage);
};
// API CHỈNH SỬA SUBCOMMENT
export const updateSubcomment = async (commentId, subcommentId, newText) => {
  return useFirebase
    ? await updateSubcommentInFirebase(commentId, subcommentId, newText)
    : await updateSubcommentToSQL(commentId, subcommentId, newText);
};

// HÀM XOÁ COMMENT
export const deleteComment = async (commentId) => {
  return useFirebase
    ? await deleteCommentFromFirebase(commentId)
    : await deleteCommentFromSQL(commentId);
};
// HÀM XOÁ SUBCOMMENT
export const deleteSubcomment = async (commentId, subcommentId) => {
  return useFirebase
    ? await deleteSubcommentInFirebase(commentId, subcommentId)
    : await deleteSubcommentInSQL(commentId, subcommentId);
};
// API CẬP NHẬT COMMENTCOUNT
export const updateCommentsCount = async (commentId) => {
  return useFirebase
    ? await updateCommentsCountInFirebase(commentId)
    : await updateCommentsCountToSQL(commentId);
};

// HÀM CẬP NHẬT SỐ LƯỢNG SUBCOMMENT CỦA COMMENT CHA
export const updateCommentCount = async (commentId, change) => {
  return useFirebase
    ? await updateCommentCountInFirebase(commentId, change)
    : await updateCommentCountInSQL(commentId, change);
};

// HÀM KIỂM TRA XEM NGƯỜI DÙNG CÓ BÌNH LUẬN HAY CHƯA
export const checkUserHasCommented = async (movieId, userEmail) => {
  return useFirebase
    ? await checkUserHasCommentedInFirebase(movieId, userEmail)
    : await checkUserHasCommentedInSQL(movieId, userEmail);
};

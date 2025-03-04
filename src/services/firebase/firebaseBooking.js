import axios from "axios";
import { getAuth } from "firebase/auth"; // Lấy module Firebase Authentication
import { setAuthToken } from "../../utils/authStorage"; // Hàm lưu token xác thực
import { normalizeString } from "../../utils/validation.js"; // Hàm chuẩn hóa chuỗi
import app from "../firebase/firebaseConfig"; // Import Firebase App đã được khởi tạo
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database"; // Các module để làm việc với Firebase Realtime Database

// Khởi tạo Authentication của Firebase
const auth = getAuth();

/**
 * Hàm lấy lịch sử đặt chỗ từ Firebase
 * @param {string} email - Địa chỉ email của người dùng để tìm kiếm lịch sử
 * @returns {Promise<Array>} - Trả về danh sách các booking (mảng)
 */
export const fetchBookingHistoryFromFirebase = async (email) => {
  const db = getDatabase(); // Lấy instance của Firebase Realtime Database
  const ordersRef = ref(db, `Orders/`); // Tạo tham chiếu đến nhánh `orders` trong database

  try {
    // Lấy toàn bộ dữ liệu từ nhánh `orders`
    const snapshot = await get(ordersRef);
    let bookings = []; // Mảng để lưu trữ các booking liên quan đến người dùng

    // Kiểm tra nếu nhánh `orders` tồn tại trong database
    if (snapshot.exists()) {
      // Duyệt qua từng child (đơn đặt chỗ) trong `orders`
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val(); // Lấy dữ liệu từng child
        if (data.app_user === email) {
          // Kiểm tra nếu email trùng khớp với người dùng
          bookings.push(data); // Thêm đơn đặt chỗ vào mảng
        }
      });
    }

    return bookings; // Trả về danh sách các booking
  } catch (error) {
    // Xử lý lỗi nếu có trong quá trình lấy dữ liệu
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to fetch booking history"); // Ném lỗi để bên gọi xử lý
  }
};

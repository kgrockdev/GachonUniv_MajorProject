import jwtDecode from "jwt-decode";

export class jwtUtils {
  // 토큰 유효성 검사
  static isAuth(token) {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    console.log("decode : ", decoded);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    } else {
      return false;
    }
  }
  // 토큰에서 유저 id 가져오기
  static getId(token) {
    const decoded = jwtDecode(token);
    return decoded.member_id;
  }
  // 토큰에서 유저 id 가져오기
  static getUserId(token) {
    const decoded = jwtDecode(token);
    return decoded.userId;
  }
  // 토큰에서 유저 name 가져오기
  static getUserName(token) {
    const decoded = jwtDecode(token);
    return decoded.username;
  }
}

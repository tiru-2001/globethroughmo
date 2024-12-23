interface loginResponse {
  message: string;
  success: boolean;
  userdata: any;
}
interface registerResponse {
  message: string;
  success: boolean;
  userdata: any;
}

export { registerResponse, loginResponse };

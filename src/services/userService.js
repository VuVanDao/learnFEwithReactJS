import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUser = (inputid) => {
  return axios.get(`/api/get-all-user?id=${inputid}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userid) => {
  return axios.delete("/api/delete-user", { data: { id: userid } });
};
const editUserService = (inputdata) => {
  return axios.put("/api/edit-user", inputdata);
};
const getAllCodeUserService = (inputdata) => {
  return axios.get(`/api/allcode?type=${inputdata}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInfoDoctorById = (doctorId, date) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBooking = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBooking = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
export {
  handleLogin,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeUserService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  postPatientBooking,
  postVerifyBooking,
  createNewSpecialty,
};

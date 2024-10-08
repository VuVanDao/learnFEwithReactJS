import actionTypes from "./actionTypes";
import {
  getAllCodeUserService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctor,
  saveDetailDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";
// import { types } from "node-sass";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeUserService("GENDER");
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.message));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};
export const fetchGenderSuccess = (genderdata) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderdata,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeUserService("POSITION");
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.message));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};
export const fetchPositionSuccess = (positiondata) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positiondata,
});
export const fetchPositionFailed = (positiondata) => ({
  type: actionTypes.FETCH_POSITION_FAILED,
  data: positiondata,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeUserService("role");
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.message));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};
export const fetchRoleSuccess = (roledata) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roledata,
});
export const fetchRoleFailed = (roledata) => ({
  type: actionTypes.FETCH_ROLE_FAILED,
  data: roledata,
});
//create user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errorCode === 0) {
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Create new user complete");
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log(error);
    }
  };
};
const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//get all user
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("ERROR");
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      toast.error("ERROR");
      dispatch(fetchAllUserFailed());
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});
//delete user
export const DeleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errorCode === 0) {
        toast.success("Delete success");
        dispatch(DeleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("ERROR Delete");
        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error("Failed, plz try again");
      dispatch(saveUserFailed());
      console.log(error);
    }
  };
};
export const DeleteUserSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  users: data,
});
export const DeleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
//edit user
export const EditUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errorCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Update new user complete");
      } else {
        toast.error("Update new user error");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Update new user error");
      dispatch(editUserFailed());
    }
  };
};
const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
//get top doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

//get all doctor
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctor();

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

//get all doctor
export const SaveDetailDoctorA = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log(data);
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        toast.success("Save doctor complete");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save doctor is not complete");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      toast.error("Error");
      console.log(error);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

//get all doctor
export const fetchAllScheduleTime = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeUserService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.message,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      });
      let resPrice = await getAllCodeUserService("PRICE");
      let resPayment = await getAllCodeUserService("PAYMENT");
      let resProvince = await getAllCodeUserService("PROVINCE");

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.message,
          resPayment: resPayment.message,
          resProvince: resProvince.message,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log(error);
    }
  };
};
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

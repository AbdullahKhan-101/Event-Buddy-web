import { put, call } from "redux-saga/effects";
import { HomeActions } from "../actions";
import ApiCaller from "../../config/apicaller";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";

const validateResponse = (response) => {
  return new Promise((res, rej) => {
    if (response) {
      if (response.status === 200 || response.status === 201) {
        res({ success: true });
        // toast(response.data);
      } else if (response.status === 404) {
        // showToast();
        toast.error(response);
        res({ success: true });
      } else if (response.status === 500) {
        // showToast();
        // toast.success(response.data.message);
        res({ success: false });
      } else {
        try {
          // showToast();
          toast.success(response.data.error.message);
          res({ success: false, message: response.data.error.message });
        } catch (error) {
          res({ success: false });
        }
      }
    } else {
      res({ success: false });
    }
  });
};

const JWT_TOKEN = "c0bdb603-0d80-4a87-bc0d-4e900691b6bb";

export function* OnSignupSuccess(action) {
  // console.log("hello world");
  const payload = action;
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Post, `user/signup`, payload, {
    "content-type": "application/json",
  });
  // console.log(response, "Get User Dash data");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.On_Signup_Success,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.On_Signup_Fail,
      payload: response,
    });
  }
}

export function* CreateInvitation(action) {
  // console.log("hello world from create invitatioin fuction in saga");
  const payload = action;
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Post, `invitation`, payload, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "Get User Dash data22");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.CREATE_INVITATION_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.CREATE_INVITATION_FAIL,
      payload: response,
    });
  }
}

export function* GetUserProfile(action) {
  // console.log("hello world");
  const jwt = localStorage.getItem("JWT");
  // const payload = action;
  const fcm = "123";
  const response = yield call(ApiCaller.Get, `user/me?FCMToken=${fcm}`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "Get User Profile");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.user_Profile_Success,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.user_Profile_Fail,
      payload: response,
    });
  }
}

export function* GetDiscoverUsers(action) {
  // console.log("hello world from getDiscoverUsers");
  const jwt = localStorage.getItem("JWT");
  // const payload = action;
  // const fcm = "123";
  const response = yield call(ApiCaller.Get, `user/discover`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "Get Discover Users ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.DISCOVER_USERS_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.DISCOVER_USERS_FAIL,
      payload: response,
    });
  }
}

export function* GetUserById(action) {
  // console.log("hello world from GetUserById");
  // const payload = action;
  const id = "1";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `user/details/${id}`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "Get  User by id ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.USER_BY_ID_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.USER_BY_ID_FAIL,
      payload: response,
    });
  }
}

export function* GetPendingInvitations(action) {
  // console.log("hello world from GetPendingInvitations");
  // const payload = action;
  // const id = "1";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `invitation/pending`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "Get  Pending Invitations ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.PENDING_INVITATIONS_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.PENDING_INVITATIONS_FAIL,
      payload: response,
    });
  }
}

export function* GetSentInvitations(action) {
  // console.log("hello world from GetSentInvitations");
  // const payload = action;
  // const id = "1";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `invitation/sent`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "Get  Sent Invitations ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.SENT_INVITATIONS_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.SENT_INVITATIONS_FAIL,
      payload: response,
    });
  }
}

export function* GetReceivedInvitations(action) {
  // console.log("hello world from GetReceivedInvitations");
  // const payload = action;
  // const id = "1";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `invitation/received`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "Get  Received Invitations ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.RECEIVED_INVITATIONS_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.RECEIVED_INVITATIONS_FAIL,
      payload: response,
    });
  }
}

export function* GetInvitationById(action) {
  // console.log("hello world from GetInvitationById");
  const payload = action.payload;
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `invitation/details/${payload}`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  console.log(response, "GetInvitationById ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.INVITATION_BY_ID_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.INVITATION_BY_ID_FAIL,
      payload: response,
    });
  }
}

export function* GetInvitationMessages(action) {
  // console.log("hello world from GetInvitationMessages");
  // const payload = action;
  // const id = "3";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `invitation/messages`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "GetInvitationMessages ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.INVITATION_MESSAGES_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.INVITATION_MESSAGES_FAIL,
      payload: response,
    });
  }
}

export function* GetInvitationChat(action) {
  // console.log("hello world from GetInvitationChat", action);
  const payload = action.payload;
  // const id = "51";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `chat/${payload}`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "GetInvitationChat ");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.INVITATION_CHAT_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.INVITATION_CHAT_FAIL,
      payload: response,
    });
  }
}

export function* GetUserReviews(action) {
  // console.log("hello world from GetUserReviews", action);
  const payload = action?.payload;
  // const id = "2";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `review/user/${payload}`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "GetUserReviews");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.USER_REVIEWS_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.USER_REVIEWS_FAIL,
      payload: response,
    });
  }
}

export function* GetMyReviewForUser(action) {
  // console.log("GetMyReviewForUser");
  // const payload = action;
  const id = "2";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `review/my/user/${id}`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "GetMyReviewForUser");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.MY_REVIEW_FOR_USER_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.MY_REVIEW_FOR_USER_FAIL,
      payload: response,
    });
  }
}

export function* GetMyReviewForInvitation(action) {
  // console.log("GetMyReviewForInvitation");
  // const payload = action;
  const id_one = "2";
  const id_two = "4";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(
    ApiCaller.Get,
    `review/my/user/${id_one}/invitation/${id_two}`,
    {
      "content-type": "application/json",
      authorization: jwt,
    }
  );
  // console.log(response, "GetMyReviewForInvitation");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.MY_REVIEW_FOR_INVITATION_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.MY_REVIEW_FOR_INVITATION_FAIL,
      payload: response,
    });
  }
}

export function* GetNotifications(action) {
  // console.log("GetNotifications");
  // const payload = action;
  // const id = "2";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `notification`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "GetNotifications");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.NOTIFICATIONS_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.NOTIFICATIONS_FAIL,
      payload: response,
    });
  }
}

export function* GetInvChat(action) {
  // console.log("GetNotifications", action.payload);
  const payload = action.payload;
  // const id = "2";
  const jwt = localStorage.getItem("JWT");
  const response = yield call(ApiCaller.Get, `/chat/${payload}`, {
    "content-type": "application/json",
    authorization: jwt,
  });
  // console.log(response, "GetInvChat");
  const response_status = yield call(validateResponse, response);
  if (response_status.success) {
    yield put({
      type: HomeActions.INVITATIONCHAT_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: HomeActions.INVITATIONCHAT_FAIL,
      payload: response,
    });
  }
}

// Imports: Dependencies
import { all, takeLatest } from "redux-saga/effects";

// Imports: Actions
import { HomeActions } from "../actions/";

// Imports: Redux Sagas
// import {

// } from './AuthSaga';

import {
  OnSignupSuccess,
  GetUserProfile,
  CreateInvitation,
  GetDiscoverUsers,
  GetUserById,
  GetPendingInvitations,
  GetSentInvitations,
  GetReceivedInvitations,
  GetInvitationById,
  GetInvitationMessages,
  GetInvitationChat,
  GetUserReviews,
  GetMyReviewForUser,
  GetMyReviewForInvitation,
  GetNotifications,
  GetInvChat,
} from "./HomeSaga";

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([takeLatest(HomeActions.On_Signup, OnSignupSuccess)]);
  yield all([takeLatest(HomeActions.CREATE_INVITATION, CreateInvitation)]);
  yield all([takeLatest(HomeActions.user_Profile, GetUserProfile)]);
  yield all([takeLatest(HomeActions.DISCOVER_USERS, GetDiscoverUsers)]);
  yield all([takeLatest(HomeActions.USER_BY_ID, GetUserById)]);
  yield all([
    takeLatest(HomeActions.PENDING_INVITATIONS, GetPendingInvitations),
  ]);
  yield all([takeLatest(HomeActions.SENT_INVITATIONS, GetSentInvitations)]);
  yield all([
    takeLatest(HomeActions.RECEIVED_INVITATIONS, GetReceivedInvitations),
  ]);
  yield all([takeLatest(HomeActions.INVITATION_BY_ID, GetInvitationById)]);
  yield all([
    takeLatest(HomeActions.INVITATION_MESSAGES, GetInvitationMessages),
  ]);
  yield all([takeLatest(HomeActions.INVITATION_CHAT, GetInvitationChat)]);
  yield all([takeLatest(HomeActions.USER_REVIEWS, GetUserReviews)]);
  yield all([takeLatest(HomeActions.MY_REVIEW_FOR_USER, GetMyReviewForUser)]);
  yield all([
    takeLatest(HomeActions.MY_REVIEW_FOR_INVITATION, GetMyReviewForInvitation),
  ]);
  yield all([takeLatest(HomeActions.NOTIFICATIONS, GetNotifications)]);
  yield all([takeLatest(HomeActions.INVITATIONCHAT, GetInvChat)]);
}

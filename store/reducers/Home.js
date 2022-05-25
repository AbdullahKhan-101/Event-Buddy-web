import { HomeActions } from "../actions/";
// import toast, { Toaster } from 'react-hot-toast';

const INITIAL_STATE = {
  user: null,
  OnSignup: [],
  createInvitation: [],
  UserProfile: [],
  DiscoverUsers: [],
  UserById: [],
  PendingInvitations: [],
  SentInvitations: [],
  ReceivedInvitations: [],
  Invitation_ById: [],
  Invitation_messages: [],
  Invitation_chat: [],
  User_reviews: [],
  My_review_for_user: [],
  My_review_for_Invitation: [],
  notifications: [],
  userDetail: {},
  getInvCha: [],
  // userDash: [],
  // loader: false,
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case HomeActions.GET_USER_DASH_DATA:
    //   return { ...state, loader: true };
    // case HomeActions.GET_USER_DASH_DATA_SUCCESS:
    //   return { ...state, loader: false, userDash: action.payload };
    // case HomeActions.GET_USER_DASH_DATA_FAIL:
    //   return { ...state, loader: false };
    case HomeActions.CREATE_INVITATION:
      return { ...state, loader: true };
    case HomeActions.CREATE_INVITATION_SUCCESS:
      return { ...state, loader: false, createInvitation: action.payload };
    case HomeActions.CREATE_INVITATION_FAIL:
      return { ...state, loader: false };

    case HomeActions.On_Signup:
      return { ...state, loader: true };
    case HomeActions.On_Signup_Success:
      return { ...state, loader: false, OnSignup: action.payload };
    case HomeActions.On_Signup_Fail:
      return { ...state, loader: false };

    case HomeActions.On_Login:
      return { ...state, user: action.payload };
    case HomeActions.On_Signout:
      return { ...state, user: null };

    case HomeActions.user_Profile:
      return { ...state, loader: true };
    case HomeActions.user_Profile_Success:
      return { ...state, loader: false, UserProfile: action.payload };
    case HomeActions.user_Profile_Fail:
      return { ...state, loader: false };

    case HomeActions.DISCOVER_USERS:
      return { ...state, loader: true };
    case HomeActions.DISCOVER_USERS_SUCCESS:
      return { ...state, loader: false, DiscoverUsers: action.payload };
    case HomeActions.DISCOVER_USERS_FAIL:
      return { ...state, loader: false };

    case HomeActions.USER_BY_ID:
      return { ...state, loader: true };
    case HomeActions.USER_BY_ID_SUCCESS:
      return { ...state, loader: false, UserById: action.payload };
    case HomeActions.USER_BY_ID_FAIL:
      return { ...state, loader: false };

    case HomeActions.PENDING_INVITATIONS:
      return { ...state, loader: true };
    case HomeActions.PENDING_INVITATIONS_SUCCESS:
      return { ...state, loader: false, PendingInvitations: action.payload };
    case HomeActions.PENDING_INVITATIONS_FAIL:
      return { ...state, loader: false };

    case HomeActions.SENT_INVITATIONS:
      return { ...state, loader: true };
    case HomeActions.SENT_INVITATIONS_SUCCESS:
      return { ...state, loader: false, SentInvitations: action.payload };
    case HomeActions.SENT_INVITATIONS_FAIL:
      return { ...state, loader: false };

    case HomeActions.RECEIVED_INVITATIONS:
      return { ...state, loader: true };
    case HomeActions.RECEIVED_INVITATIONS_SUCCESS:
      return { ...state, loader: false, ReceivedInvitations: action.payload };
    case HomeActions.RECEIVED_INVITATIONS_FAIL:
      return { ...state, loader: false };

    case HomeActions.INVITATION_BY_ID:
      return { ...state, loader: true };
    case HomeActions.INVITATION_BY_ID_SUCCESS:
      return { ...state, loader: false, Invitation_ById: action.payload };
    case HomeActions.INVITATION_BY_ID_FAIL:
      return { ...state, loader: false };

    case HomeActions.INVITATION_MESSAGES:
      return { ...state, loader: true };
    case HomeActions.INVITATION_MESSAGES_SUCCESS:
      return { ...state, loader: false, Invitation_messages: action.payload };
    case HomeActions.INVITATION_MESSAGES_FAIL:
      return { ...state, loader: false };

    case HomeActions.INVITATION_CHAT:
      return { ...state, loader: true };
    case HomeActions.INVITATION_CHAT_SUCCESS:
      return { ...state, loader: false, Invitation_chat: action.payload };
    case HomeActions.INVITATION_CHAT_FAIL:
      return { ...state, loader: false };

    case HomeActions.USER_REVIEWS:
      return { ...state, loader: true };
    case HomeActions.USER_REVIEWS_SUCCESS:
      return { ...state, loader: false, User_reviews: action.payload };
    case HomeActions.USER_REVIEWS_FAIL:
      return { ...state, loader: false };

    case HomeActions.MY_REVIEW_FOR_USER:
      return { ...state, loader: true };
    case HomeActions.MY_REVIEW_FOR_USER_SUCCESS:
      return { ...state, loader: false, My_review_for_user: action.payload };
    case HomeActions.MY_REVIEW_FOR_USER_FAIL:
      return { ...state, loader: false };

    case HomeActions.MY_REVIEW_FOR_INVITATION:
      return { ...state, loader: true };
    case HomeActions.MY_REVIEW_FOR_INVITATION_SUCCESS:
      return {
        ...state,
        loader: false,
        My_review_for_Invitation: action.payload,
      };
    case HomeActions.MY_REVIEW_FOR_INVITATION_FAIL:
      return { ...state, loader: false };

    case HomeActions.NOTIFICATIONS:
      return { ...state, loader: true };
    case HomeActions.NOTIFICATIONS_SUCCESS:
      return { ...state, loader: false, notifications: action.payload };
    case HomeActions.NOTIFICATIONS_FAIL:
      return { ...state, loader: false };

    case HomeActions.INVITATIONCHAT:
      return { ...state, loader: true };
    case HomeActions.INVITATIONCHAT_SUCCESS:
      return { ...state, loader: false, getInvCha: action.payload };
    case HomeActions.INVITATIONCHAT_FAIL:
      return { ...state, loader: false };

    case HomeActions.USERDETAILS:
      return { ...state, userDetail: action.payload };

    default:
      return state;
  }
}
export default Reducer;

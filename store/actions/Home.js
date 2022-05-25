export default class Action {
  //Constants
  static CREATE_INVITATION = "CREATE_INVITATION";
  static CREATE_INVITATION_SUCCESS = "CREATE_INVITATION_SUCCESS";
  static CREATE_INVITATION_FAIL = "CREATE_INVITATION_FAIL";

  static On_Signup = "On_Signup";
  static On_Signup_Success = "On_Signup_Success";
  static On_Signup_Fail = "On_Signup_Fail";

  static On_Login = "On_Login";
  static On_Login_Success = "On_Login_Success";
  static On_Login_Fail = "On_Login_Fail";

  static On_Signout = "On_Signout";
  static On_Signout_Success = "On_Signout_Success";
  static On_Signout_Fail = "On_Signout_Fail";

  static user_Profile = "user_Profile";
  static user_Profile_Success = "user_Profile_Success";
  static user_Profile_Fail = "user_Profile_Fail";

  static DISCOVER_USERS = "DISCOVER_USERS";
  static DISCOVER_USERS_SUCCESS = "DISCOVER_USERS_SUCCESS";
  static DISCOVER_USERS_FAIL = "DISCOVER_USERS_FAIL";

  static USER_BY_ID = "USER_BY_ID";
  static USER_BY_ID_SUCCESS = "USER_BY_ID_SUCCESS";
  static USER_BY_ID_FAIL = "USER_BY_ID_FAIL";

  static PENDING_INVITATIONS = "PENDING_INVITATIONS";
  static PENDING_INVITATIONS_SUCCESS = "PENDING_INVITATIONS_SUCCESS";
  static PENDING_INVITATIONS_FAIL = "PENDING_INVITATIONS_FAIL";

  static SENT_INVITATIONS = "SENT_INVITATIONS";
  static SENT_INVITATIONS_SUCCESS = "SENT_INVITATIONS_SUCCESS";
  static SENT_INVITATIONS_FAIL = "SENT_INVITATIONS_FAIL";

  static RECEIVED_INVITATIONS = "RECEIVED_INVITATIONS";
  static RECEIVED_INVITATIONS_SUCCESS = "RECEIVED_INVITATIONS_SUCCESS";
  static RECEIVED_INVITATIONS_FAIL = "RECEIVED_INVITATIONS_FAIL";

  static INVITATION_BY_ID = "INVITATION_BY_ID";
  static INVITATION_BY_ID_SUCCESS = "INVITATION_BY_ID_SUCCESS";
  static INVITATION_BY_ID_FAIL = "INVITATION_BY_ID_FAIL";

  static INVITATION_MESSAGES = "INVITATION_MESSAGES";
  static INVITATION_MESSAGES_SUCCESS = "INVITATION_MESSAGES_SUCCESS";
  static INVITATION_MESSAGES_FAIL = "INVITATION_MESSAGES_FAIL";

  static INVITATION_CHAT = "INVITATION_CHAT";
  static INVITATION_CHAT_SUCCESS = "INVITATION_CHAT_SUCCESS";
  static INVITATION_CHAT_FAIL = "INVITATION_CHAT_FAIL";

  static USER_REVIEWS = "USER_REVIEWS";
  static USER_REVIEWS_SUCCESS = "USER_REVIEWS_SUCCESS";
  static USER_REVIEWS_FAIL = "USER_REVIEWS_FAIL";

  static MY_REVIEW_FOR_USER = "MY_REVIEW_FOR_USER";
  static MY_REVIEW_FOR_USER_SUCCESS = "MY_REVIEW_FOR_USER_SUCCESS";
  static MY_REVIEW_FOR_USER_FAIL = "MY_REVIEW_FOR_USER_FAIL";

  static MY_REVIEW_FOR_INVITATION = "MY_REVIEW_FOR_INVITATION";
  static MY_REVIEW_FOR_INVITATION_SUCCESS = "MY_REVIEW_FOR_INVITATION_SUCCESS";
  static MY_REVIEW_FOR_INVITATION_FAIL = "MY_REVIEW_FOR_INVITATION_FAIL";

  static NOTIFICATIONS = "NOTIFICATIONS";
  static NOTIFICATIONS_SUCCESS = "NOTIFICATIONS_SUCCESS";
  static NOTIFICATIONS_FAIL = "NOTIFICATIONS_FAIL";

  static USERDETAILS = "USERDETAILS";
  static USERDETAILS_SUCCESS = "USERDETAILS_SUCCESS";
  static USERDETAILS_FAIL = "USERDETAILS_FAIL";

  static INVITATIONCHAT = "INVITATIONCHAT";
  static INVITATIONCHAT_SUCCESS = "INVITATIONCHAT_SUCCESS";
  static INVITATIONCHAT_FAIL = "INVITATIONCHAT_FAIL";

  // static GET_USER_DASH_DATA = "USER_DASH_DATA";
  // static GET_USER_DASH_DATA_SUCCESS = "GET_USER_DASH_DATA_SUCCESS";
  // static GET_USER_DASH_DATA_FAIL = "GET_USER_DASH_DATA_FAIL";

  //Actions
  static getUDD(payload) {
    return {
      type: Action.GET_USER_DASH_DATA,
      payload,
    };
  }

  static CreateInvitaion(payload) {
    // console.log(payload);
    return {
      type: Action.CREATE_INVITATION,
      payload,
    };
  }

  static UserProfile(payload) {
    // console.log(payload);
    return {
      type: Action.user_Profile,
      payload,
    };
  }

  static DiscoverUsers(payload) {
    // console.log(payload);
    return {
      type: Action.DISCOVER_USERS,
      payload,
    };
  }

  static UserById(payload) {
    // console.log(payload);
    return {
      type: Action.USER_BY_ID,
      payload,
    };
  }

  static PendingInvitatioins(payload) {
    // console.log(payload);
    return {
      type: Action.PENDING_INVITATIONS,
      payload,
    };
  }

  static SentInvitatioins(payload) {
    // console.log(payload);
    return {
      type: Action.SENT_INVITATIONS,
      payload,
    };
  }

  static ReceivedInvitatioins(payload) {
    // console.log(payload);
    return {
      type: Action.RECEIVED_INVITATIONS,
      payload,
    };
  }

  static InvitationById(payload) {
    // console.log(payload);
    return {
      type: Action.INVITATION_BY_ID,
      payload,
    };
  }

  static InvitationMessages(payload) {
    // console.log(payload);
    return {
      type: Action.INVITATION_MESSAGES,
      payload,
    };
  }

  // ==,==,== isko call krna he abhi
  static InvitationChat(payload) {
    // console.log(payload);
    return {
      type: Action.INVITATION_CHAT,
      payload,
    };
  }
  // ==^==^== isko call krna he abhi

  static UserReviews(payload) {
    // console.log(payload);
    return {
      type: Action.USER_REVIEWS,
      payload,
    };
  }

  // ==^==^== isko call krna he abhi
  static MyReviewForUser(payload) {
    // console.log(payload);
    return {
      type: Action.MY_REVIEW_FOR_USER,
      payload,
    };
  }
  // ==^==^== isko call krna he abhi

  // ==^==^== isko call krna he abhi
  static MyReviewForInvitation(payload) {
    // console.log(payload);
    return {
      type: Action.MY_REVIEW_FOR_INVITATION,
      payload,
    };
  }
  // ==^==^== isko call krna he abhi

  static Notifications(payload) {
    // console.log(payload);
    return {
      type: Action.NOTIFICATIONS,
      payload,
    };
  }

  static Signup(payload) {
    // console.log(payload);
    return {
      type: Action.On_Signup,
      payload,
    };
  }

  static On_Login(payload) {
    return {
      type: Action.On_Login,
      payload,
    };
  }
  static On_Signout(payload) {
    return {
      type: Action.On_Signout,
      payload,
    };
  }
  static userDetails(payload) {
    // console.log("UserDetails Action Payload ", payload);
    return {
      type: Action.USERDETAILS,
      payload,
    };
  }
  static getInvitationChat(payload) {
    // console.log("UserDetails Action Payload ", payload);
    return {
      type: Action.INVITATIONCHAT,
      payload,
    };
  }
}

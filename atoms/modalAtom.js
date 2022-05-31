import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const reviewModal = atom({
  key: "reviewModal",
  default: false,
});
export const openReviewsModall = atom({
  key: "openReviewsModall",
  default: false,
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const inviteModal = atom({
  key: "inviteModal",
  default: "close",
});

export const acceptInviteModal = atom({
  key: "acceptInviteModal",
  default: "close",
});

export const usersDataModal = atom({
  key: "usersDataModal",
  default: [],
});

export const notificationCountState = atom({
  key: "notificationCountState",
  default: [],
});

export const ClickNotificationData = atom({
  key: "ClickNotificationData",
  default: {
    name: null,
  },
});

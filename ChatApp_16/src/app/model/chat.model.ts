export interface UsersModel {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    isAdmin: boolean;
    pic: string;
    __v: number;
  }
  export interface SelectedDataModel {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    groupAdmin: UsersModel;
    users: UsersModel[];
    createdAt: string;
    updatedAt: string;
    // __v: number;
  }
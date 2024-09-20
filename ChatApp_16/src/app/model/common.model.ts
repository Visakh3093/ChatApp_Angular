export interface CommonInitialModel {
    toast: ToastModel;
    loaderData: boolean;
    modal: boolean;
    chatBox: boolean;
    profileModal:boolean,
    groupModal:boolean;
    selectedUserModal:boolean;
}

export interface ToastModel {
    toastMessage: string,
    type?: string
}

export interface SearchObjectModel {
    _id: string;
    name: string;
    email: string;
    password?: string;
    mobile: string;
    isAdmin: boolean;
    pic: string;
    friends?: any[];
    __v: number;
  }
export type dataUser = {
	avatar: string;
	created: Date | null;
    id: number;
	intra: string;
    level: number;
    nickname: string;
	updated: Date | null;
	friends: Array<dataFriend> | undefined;
	//is2fa: boolean;
	//isFirst: boolean;
}

export type dataFriend = {
	tid: number;
	intra: string;
	friend: string;
	block: boolean;
	created: Date | null;
	updated: Date | null;
    id: number;
}

export enum UserStatus {
	me,
	login,
	logout,
	ingame,
  }

  export type FriendList = {
	friend: dataFriend;
	status: UserStatus;
  }

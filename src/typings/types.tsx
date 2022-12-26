export type dataUser = {
	avatar: string;
	created: Date | null;
    id: number;
	intra: string;
    level: number;
    nickname: string;
	updated: Date | null;
	friends: Array<dataFriend> | undefined;
	tf: boolean;
	//isFirst: boolean;
}

export type GameType = {
	created: Date | null;
	id: number;
	player: string;
	score: string;
	updated: Date | null;
}

export type listGame = GameType[]

export type FriendType = {
	friend: string;
	state: UserStatus;
	blocked: boolean;
	avatar: string;
}

export type listFriend = FriendType[]

//{ friend: string; state: UserStatus; blocked: boolean; avatar : string}
export type dataFriend = {
	tid: number;
	intra: string;
	friend: string;
	block: boolean;
	created: Date | null;
	updated: Date | null;
    id: number;
}

export type getAchievementType = {
	id: number;
	intra: string;
	nickname: string;
	avatar: string;
	level: number;
	tf: boolean;
	//verify: null,???
	email: string;
	created: Date;
	updated: Date;
	achievements: achievementTypeList;
}

export type achievementType = {
	tid: number;
	achievement: number;
}

export type achievementTypeList = achievementType[]

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

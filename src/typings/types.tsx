export type dataUser = {
	avatar: string;
	created: Date | null;
    id: number;
	intra: string;
    level: number;
    nickname: string;
	updated: Date | null;
	friends: Array<dataFriend> | undefined;
}

export type dataFriend = {
    id: number;
	intra: string;
	friend: string;
	block: boolean;
	created: Date | null;
	updated: Date | null;
}

class GlobalData 
{
	public constructor() 
	{
	}

	public static userModel:UserModel;
	public static battleModel:BattleModel;

	public static userId:string;
	public static userName:string;
	public static userIcon:string;
	public static contextId:string = "-1";
	public static contextType:string;
	public static senderId:string = null;				//好友邀请你

	public static isDev:boolean = true;					//开发环境

	public static matchMode:string;			//随机 or 好友

}
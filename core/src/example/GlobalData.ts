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
	public static contextId:string;
	public static contextType:string;
	public static senderId:string = null;				//好友邀请你

	public static isDev:boolean = false;		//开发环境
}
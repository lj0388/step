class GlobalData 
{
	public constructor() 
	{
	}

	public static isDev:boolean = false;					//开发环境

	public static userModel:UserModel;
	public static battleModel:BattleModel;

	public static userId:string;
	public static userName:string;
	public static userIcon:string;
	public static contextId:string = "-1";
	public static contextType:string;
	public static senderId:string = "-1";				//好友邀请你
	
	public static matchMode:string;						//随机 or 好友
	public static battleStartTime:number;				//战斗开始的时间

	public static matchTime:number = 45;

}
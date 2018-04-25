class ServerConst
{
    public static LOGIN_C2S:number = 1001;
    public static LOGIN_S2C:number = 1002;

    public static Invite_LOGIN_C2S:number = 1003;
    //public static Invite_LOGIN_S2C:number = 1004;

	public static Match_Invite_C2S:number = 1005;  //匹配邀请
    public static Match_Invite_S2C:number = 1006;  //邀请确认 针对好友

    public static Match_Confirm_C2S:number = 1007;  //接受/拒绝
    public static Match_Confirm_S2C:number = 1008;  //失效/拒绝

    public static Match_Cancel_C2S:number = 1021;   //取消匹配
    public static Match_Cancel_S2C:number = 1022;   //消除匹配邀请界面

    public static Match_Scuess_S2C:number = 1010;   //匹配成功 进入战斗


    public static MOVE_C2S:number = 1101;
    public static MOVE_S2C:number = 1102;

    public static MOVE_END_C2S:number = 1103;
    public static MOVE_END_S2C:number = 1104;

    public static GET_Friends_C2S:number = 2001;
    public static GET_Friends_S2C:number = 2002;

    public static GET_Results_C2S:number = 3001;
    public static GET_Results_S2C:number = 3002;


}
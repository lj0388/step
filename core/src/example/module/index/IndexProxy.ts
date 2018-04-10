class IndexProxy extends BaseProxy
{
	public constructor(controller:BaseController) 
	{
		super(controller);
		 //注册从服务器返回消息的监听
        this.receiveServerMsg(ServerConst.Match_Invite_S2C, this.matchInviteMsg, this);
		this.receiveServerMsg(ServerConst.Match_Confirm_S2C, this.matchConfirmMsg, this);
		this.receiveServerMsg(ServerConst.Match_Scuess_S2C, this.matchSuccessMsg, this);
	}


	//匹配请求
	public matchPlayer(uid:string, groupId:string, matchType:string)
	{
		var obj:any = {};
		obj.uid = uid;
		obj.groupId = groupId;
		obj.matchType = matchType;

		this.sendSocketMsg(ServerConst.Match_Invite_C2S, obj);
	}

	//匹配确认
	public matchConfirm(uid:string, groupId:string, confirmType:string)
	{
		var obj:any = {};
		obj.uid = uid;
		obj.groupId = groupId;
		obj.confirm = confirmType;

		this.sendSocketMsg(ServerConst.Match_Confirm_C2S, obj);
	}


    /**
     * 匹配邀请
     */
    public matchInviteMsg(obj:any):void
	{
        this.applyFunc(IndexConst.Match_Invite_S2C, obj);
    }

	 /**
     * 匹配确认
     */
    public matchConfirmMsg(obj:any):void
	{
        this.applyFunc(IndexConst.Match_Confirm_S2C, obj);
    }

	 /**
     * 匹配成功
     */
    public matchSuccessMsg(obj:any):void
	{
        this.applyFunc(IndexConst.Match_Scuess_S2C, obj);
    }
}
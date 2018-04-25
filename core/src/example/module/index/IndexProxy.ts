class IndexProxy extends BaseProxy
{
	public constructor(controller:BaseController) 
	{
		super(controller);
		 //注册从服务器返回消息的监听
        this.receiveServerMsg(ServerConst.Match_Invite_S2C, this.matchInviteMsg, this);
		this.receiveServerMsg(ServerConst.Match_Confirm_S2C, this.matchConfirmMsg, this);
		this.receiveServerMsg(ServerConst.Match_Scuess_S2C, this.matchSuccessMsg, this);

		this.receiveServerMsg(ServerConst.Match_Cancel_S2C, this.matchCancelMsg, this);
	}


	//匹配请求
	public matchPlayer(uid:string, groupId:string, matchType:string):void
	{
		var obj:any = {};
		obj.uid = uid;
		obj.groupId = groupId;
		obj.matchType = matchType;

		//console.log("matchPlayer: " + obj.uid + " " + obj.groupId  + " " + obj.matchType);
		FBInstant.logEvent("MATCH_REQUEST", 1,{"uid":uid, "gid":groupId, "type":matchType});
		this.sendSocketMsg(ServerConst.Match_Invite_C2S, obj);
	}

	//匹配确认
	public matchConfirm(uid:string, groupId:string, confirmType:string, senderId:string):void
	{
		var obj:any = {};
		obj.uid = uid;
		obj.groupId = groupId;
		obj.confirm = confirmType;
		obj.senderId = senderId;

	    //console.log("matchConfirm: " + obj.uid + " " + obj.groupId  + " " + obj.matchType);
		FBInstant.logEvent("MATCH_CONFIRM", 1,{"uid":uid, "gid":groupId, "type":confirmType});
		this.sendSocketMsg(ServerConst.Match_Confirm_C2S, obj);
	}

	//匹配取消
	public matchCancel(uid:string):void
	{
		var obj:any = {};
		obj.uid = uid;
		FBInstant.logEvent("MATCH_CANCEL", 1,{"uid":uid});
		this.sendSocketMsg(ServerConst.Match_Cancel_C2S, obj);
	}

	//匹配取消
	public matchCancelMsg(obj:any):void
	{
        this.applyFunc(IndexConst.Match_Cancel_S2C, obj);
    }


    /**
     * 匹配邀请
     */
    public matchInviteMsg(obj:any):void
	{
		//console.log("matchInviteMsg: " + obj);
        this.applyFunc(IndexConst.Match_Invite_S2C, obj);
    }

	 /**
     * 匹配确认
     */
    public matchConfirmMsg(obj:any):void
	{
		//console.log("Match_Confirm_S2C: " + obj);
        this.applyFunc(IndexConst.Match_Confirm_S2C, obj);
    }

	 /**
     * 匹配成功
     */
    public matchSuccessMsg(obj:any):void
	{
		FBInstant.logEvent("MATCH_SCUESS", 1,{"uid":GlobalData.userId, "gid":GlobalData.contextId, "type":GlobalData.matchMode});
        this.applyFunc(IndexConst.Match_Scuess_S2C, obj);
    }
}
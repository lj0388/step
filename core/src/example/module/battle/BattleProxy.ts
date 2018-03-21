class BattleProxy extends BaseProxy
{
	public constructor(controller:BaseController) 
	{
		super(controller);
		 //注册从服务器返回消息的监听
        //this.receiveServerMsg(ServerConst.Match_S2C, this.matchSuccess, this);

		this.receiveServerMsg(ServerConst.MOVE_S2C, this.moveStep, this);
		this.receiveServerMsg(ServerConst.MOVE_END_S2C, this.moveEndS2C, this);
	}


	//请求匹配
	// public matchPlayer(uid:any)
	// {
	// 	var obj:any = {};
	// 	obj.uid = uid;

	// 	this.sendSocketMsg(ServerConst.Match_S2C, obj);
	// }


    /**
     * 匹配成功
     */
    // private matchSuccess(obj:any):void
	// {
    //     this.applyFunc(LoginConst.LOGIN_S2C, obj);
    // }

	private moveStep(obj:any):void
	{
		this.applyFunc(BattleConst.MovePlayer_S2C, obj);
	}

	//移动到终点 判定胜负
	public moveEndC2S(uid:string)
	{
		var obj:any = {};
	 	obj.uid = uid;
		this.sendSocketMsg(ServerConst.MOVE_END_C2S, obj);
	}

	//战斗结果(远程角色)
	public moveEndS2C(data:any):void
	{
		this.applyFunc(BattleConst.MoveEnd_S2C, data);
	}
}
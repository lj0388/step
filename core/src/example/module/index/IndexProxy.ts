class IndexProxy extends BaseProxy
{
	public constructor(controller:BaseController) 
	{
		super(controller);
		 //注册从服务器返回消息的监听
        this.receiveServerMsg(ServerConst.Match_S2C, this.matchSuccess, this);
	}


	//请求匹配
	public matchPlayer(uid:any)
	{
		var obj:any = {};
		obj.uid = uid;

		this.sendSocketMsg(ServerConst.Match_C2S, obj);
	}


    /**
     * 匹配成功
     */
    public matchSuccess(obj:any):void
	{
        this.applyFunc(IndexConst.Match_S2C, obj);
    }
}
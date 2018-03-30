class FriendProxy extends BaseProxy
{

	public constructor(controller:BaseController) 
	{
		super(controller);
		
		 //注册从服务器返回消息的监听
        this.receiveServerMsg(ServerConst.GET_Friends_S2C, this.friendListMsg, this);	
	}


	public requestFriendList(uid:string)
	{
		var obj:any = {};
	 	obj.uid = uid;
		this.sendSocketMsg(ServerConst.GET_Friends_C2S, obj);
	}

	private friendListMsg(data:any):void
	{
		var model:FriendModel = this.getModel() as FriendModel;
		model.updateFriendsData(data);
		this.applyFunc(FriendConst.GET_Friends_S2C);
	}
}
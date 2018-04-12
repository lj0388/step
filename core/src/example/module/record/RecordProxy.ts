class RecordProxy extends BaseProxy 
{
	public constructor(controller:BaseController) 
	{
		super(controller);
		
		 //注册从服务器返回消息的监听
        this.receiveServerMsg(ServerConst.GET_Results_S2C, this.recordListMsg, this);	
	}

	public requestRecordList(uid:string)
	{
		var obj:any = {};
	 	obj.uid = uid;
		obj.groupId = "c0001";
		this.sendSocketMsg(ServerConst.GET_Results_C2S, obj);
	}

	private recordListMsg(data:any):void
	{
		var model:RecordModel = this.getModel() as RecordModel;
		model.updateRecordData(data);
		this.applyFunc(RecordConst.GET_RECORD_S2C);
	}
}
class RecordModel extends BaseModel
{
    
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller:BaseController) {
        super($controller);
    }

	public groups:string[];
	public friends:any[];

	public updateRecordData(data:any):void
	{
		this.groups = data.groups;
		this.friends = data.friends;	
	}
}

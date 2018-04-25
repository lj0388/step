class RecordModel extends BaseModel
{
    
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller:BaseController) {
        super($controller);
    }

	public records:any[];

	public updateRecordData(data:any):void
	{
		this.records = data;
        console.log("records: " + data);
        
	}
}

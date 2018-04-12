class RecordController extends BaseController 
{
	 //本模块的数据存储
    private model:RecordModel;
   
    //本模块的Proxy
    private proxy: RecordProxy;

 	//本模块的所有UI
    private recordView: RecordView;

    public constructor() 
	{
        super();

        //初始化Model
        this.model = new RecordModel(this);

		//初始化Proxy
        this.proxy = new RecordProxy(this);

        //初始化UI
        this.recordView = new RecordView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Record, this.recordView);      

        //注册模块间、模块内部事件监听
        this.registerFunc(RecordConst.OPEN_RECORD_VIEW, this.openRecordView, this);

        //注册S2C消息
        this.registerFunc(RecordConst.GET_RECORD_S2C, this.getRecordS2C, this);
    }

	private openRecordView():void
    {
        //this.proxy.requestRecordList(GlobalData.userId);
        this.proxy.requestRecordList("u0001");
    }

    private getRecordS2C():void
    {
        App.ViewManager.open(ViewConst.Record, this.model);
    }

}
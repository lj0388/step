class IndexController extends BaseController
{
	private model:IndexModel;
	private proxy:IndexProxy;
	private indexView:IndexView;

	public constructor()
	{
        super();

		this.model = new IndexModel(this);
		
		this.proxy = new IndexProxy(this);

		this.indexView = new IndexView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.Index, this.indexView);

		this.registerFunc(IndexConst.Match_Random_Click, this.onRandomMatch, this);		//单击匹配
		this.registerFunc(IndexConst.Match_TimeOver, this.onMatchTimeOver, this);		//匹配超时        		
        this.registerFunc(IndexConst.Match_S2C, this.onMatchSuccess, this);				//匹配成功
	}

	
	//开始匹配
	private onRandomMatch():void
	{
		this.indexView.showMatchUI();
		this.indexView.showMatchTime(30);		//30秒倒计时
		//this.proxy.matchPlayer("1111");
		this.proxy.matchPlayer(GlobalData.userModel.uid);
    }

	//匹配超时        		
	private onMatchTimeOver():void
	{
		this.indexView.showIndexUI();
	}

	//匹配成功
	private onMatchSuccess(data:any):void
	{
		GlobalData.battleModel.updateData(data);
        //保存数据
        //this.model.userInfo = userInfo;
		//this.model.updateData(data);
        //本模块UI处理
        this.indexView.matchSuccess();        
		
		//UI跳转
        //App.ViewManager.close(ViewConst.Index);
        //var model:BaseModel = this.getControllerModel(ControllerConst.Login);

		App.SceneManager.runScene(SceneConsts.Battle, data);
    }
}
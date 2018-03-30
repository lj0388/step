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

		this.registerFunc(IndexConst.Match_Click, this.onMatchClick, this);						//点击匹配对战
		this.registerFunc(IndexConst.Match_Confirm_Click, this.onMatchConfirmClick, this);		//点击匹配对战

		this.registerFunc(IndexConst.Match_TimeOver, this.onMatchTimeOver, this);				//匹配超时        		
        this.registerFunc(IndexConst.Match_Invite_S2C, this.onMatchInviteS2C, this);			//匹配邀请
		this.registerFunc(IndexConst.Match_Confirm_S2C, this.onMatchConfirm, this);				//匹配确认
		this.registerFunc(IndexConst.Match_Scuess_S2C, this.onMatchSuccess, this);				//匹配成功

		this.registerFunc(IndexConst.Match_Invite_C2S, this.OnMatchInviteC2S, this);			//切换好友组 进行匹配
	}

	
	//匹配对战
	private onMatchClick():void
	{
		this.indexView.showMatchUI();
		this.indexView.showMatchTime(30);		//30秒倒计时
		
		if (GlobalData.contextId != null)		//匹配好友
		{
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Friends);
		}
		else
		{
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Random);	//匹配陌生人
		}
		
		//this.proxy.matchPlayer("1111");		
    }

	private onMatchConfirmClick(confirm:string):void
	{
		egret.log("confirmType: " + confirm);
		this.proxy.matchConfirm(GlobalData.userId, GlobalData.contextId, confirm);
	}

	//匹配邀请
	private OnMatchInviteC2S(data:any):void
	{
		this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Friends);
	}

	//匹配邀请        		
	private onMatchInviteS2C(data:any):void
	{
		this.indexView.showInviteUI(data);
	}

	//匹配拒绝/过期        		
	private onMatchConfirm(data:any):void
	{
		this.indexView.showInviteResultUI(data);
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

	//匹配超时        		
	private onMatchTimeOver():void
	{
		this.indexView.showIndexUI();
	}
}
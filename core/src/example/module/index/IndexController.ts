class IndexController extends BaseController
{
	private model:IndexModel;
	private proxy:IndexProxy;

	private indexView:IndexView;
	private randomMatchView:RandomMatchView;
	private friendMatchView:FriendMatchView;
	private matchInviteView:MatchInviteView;
	private matchResultView:MatchResultView;

	private friendView:FriendView;
	private recordView:RecordView;

	public constructor()
	{
        super();

		this.model = new IndexModel(this);
		
		this.proxy = new IndexProxy(this);

		this.indexView = new IndexView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.Index, this.indexView);

		this.randomMatchView = new RandomMatchView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.RandomMatch, this.randomMatchView);

		this.friendMatchView = new FriendMatchView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.FriendMatch, this.friendMatchView);

		this.matchInviteView = new MatchInviteView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.MatchInvite, this.matchInviteView);

		this.matchResultView = new MatchResultView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.MatchResult, this.matchResultView);

		this.friendView = new FriendView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.Friend, this.friendView);

		this.recordView = new RecordView(this, LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.Record, this.recordView);


		this.registerFunc(IndexConst.Match_Click, this.onMatchClick, this);						//点击匹配对战
		this.registerFunc(IndexConst.Match_Cancel, this.onMatchCancel, this);					//点击匹配取消
		this.registerFunc(IndexConst.Match_TimeOver, this.onMatchTimeOver, this);				//匹配超时        

		this.registerFunc(IndexConst.Match_Invite_S2C, this.onMatchInviteS2C, this);			//匹配邀请	       
		this.registerFunc(IndexConst.Match_Confirm_Click, this.onMatchConfirmClick, this);		//点击匹配接受/拒绝		
		this.registerFunc(IndexConst.Match_Confirm_S2C, this.onMatchConfirm, this);				//匹配失败 失效/拒绝
		this.registerFunc(IndexConst.Match_Scuess_S2C, this.onMatchSuccess, this);				//匹配成功战斗开始

		this.registerFunc(IndexConst.Random_Match, this.OnRandeomMatch, this);					//从好友邀请转向随机匹配
		this.registerFunc(IndexConst.Match_Invite_C2S, this.OnMatchInviteC2S, this);			//切换好友组 进行匹配
	}

	
	//匹配对战
	private onMatchClick():void
	{
		// this.indexView.showMatchUI();
		// this.indexView.showMatchTime(30);		//30秒倒计时
		
		if (GlobalData.contextId != null)		//匹配好友
		{
			App.ViewManager.open(ViewConst.FriendMatch);
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Friends);
		}
		else
		{
			App.ViewManager.open(ViewConst.RandomMatch);
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Random);	//匹配陌生人
		}	
    }

	//匹配取消
	private onMatchCancel():void
	{
		App.ViewManager.close(ViewConst.RandomMatch);
		App.ViewManager.close(ViewConst.FriendMatch);
	}

	//点击 接受/拒绝 邀请
	private onMatchConfirmClick(confirm:string):void
	{
		egret.log("confirmType: " + confirm);
		this.proxy.matchConfirm(GlobalData.userId, GlobalData.contextId, confirm);
	}

	//从好友邀请转战随机邀请
	private OnRandeomMatch():void
	{
		App.ViewManager.close(ViewConst.FriendMatch);
		App.ViewManager.open(ViewConst.RandomMatch);

		this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Random);	//匹配陌生人
	}


	//匹配邀请
	private OnMatchInviteC2S(data:any):void
	{
		this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Friends);
	}

	//匹配邀请        		
	private onMatchInviteS2C(data:any):void
	{
		//this.indexView.showInviteUI(data);
		App.ViewManager.open(ViewConst.MatchInvite, data);
	}

	//匹配拒绝/过期        		
	private onMatchConfirm(data:any):void
	{
		//this.indexView.showInviteResultUI(data);
		App.ViewManager.open(ViewConst.MatchResult, data);
	}

	//匹配成功
	private onMatchSuccess(data:any):void
	{
		GlobalData.battleModel.updateData(data);    

		App.SceneManager.runScene(SceneConsts.Battle, data);
    }

	//匹配超时        		
	private onMatchTimeOver():void
	{
		//this.indexView.showIndexUI();
		App.ViewManager.close(ViewConst.RandomMatch);
		App.ViewManager.close(ViewConst.FriendMatch);
	}
}
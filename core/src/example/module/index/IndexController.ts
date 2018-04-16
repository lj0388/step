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
		this.registerFunc(IndexConst.Match_Mode, this.onMatchMode, this);						//匹配模式 随机/好友

		this.registerFunc(IndexConst.Match_Cancel, this.onMatchCancel, this);					//点击匹配取消
		this.registerFunc(IndexConst.Match_Cancel_S2C, this.onMatchCancelS2C, this);			//匹配取消 关闭邀请界面
		this.registerFunc(IndexConst.Match_TimeOver, this.onMatchTimeOver, this);				//匹配超时        

		this.registerFunc(IndexConst.Match_Invite_S2C, this.onMatchInviteS2C, this);			//匹配邀请	       
		this.registerFunc(IndexConst.Match_Confirm_Click, this.onMatchConfirmClick, this);		//点击匹配接受/拒绝		
		this.registerFunc(IndexConst.Match_Confirm_S2C, this.onMatchConfirmS2C, this);				//匹配失败 失效/拒绝
		this.registerFunc(IndexConst.Match_Scuess_S2C, this.onMatchSuccessS2C, this);				//匹配成功战斗开始

		this.registerFunc(IndexConst.Match_Invite_C2S, this.OnMatchInviteC2S, this);			//切换好友组 进行匹配
	}

	
	//private mode:string = MatchType.Random;

	//匹配对战
	private onMatchClick():void
	{		
		if (GlobalData.contextId != "-1")						//匹配好友
		{
			GlobalData.matchMode = MatchType.Friends;
			App.ViewManager.open(ViewConst.FriendMatch);
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Friends);
		}
		else
		{
			GlobalData.matchMode = MatchType.Random;
			App.ViewManager.open(ViewConst.RandomMatch);
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Random);	//匹配陌生人
		}	
    }

	private onMatchMode(mode:string):void
	{
		this.closeAll();
		
		if (mode == MatchType.Random)
		{
			GlobalData.matchMode = MatchType.Random;
			App.ViewManager.open(ViewConst.RandomMatch);
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Random);	
		}
		else
		{
			GlobalData.matchMode = MatchType.Friends;
			App.ViewManager.open(ViewConst.FriendMatch);
			this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Friends);
		}
	}

	//匹配取消
	private onMatchCancel():void
	{
		this.closeAll();

		this.proxy.matchCancel(GlobalData.userModel.uid);	
	}

	//关闭邀请界面
	private onMatchCancelS2C(data:any):void
	{
		App.ViewManager.close(ViewConst.MatchInvite);
	}

	//点击 接受/拒绝 邀请
	private onMatchConfirmClick(confirm:string, data:any):void
	{
		egret.log("confirmType: " + confirm);
		this.proxy.matchConfirm(GlobalData.userModel.uid, GlobalData.userModel.contextId, confirm, data.senderId);
	}

	//匹配邀请
	private OnMatchInviteC2S(data:any):void
	{
		this.proxy.matchPlayer(GlobalData.userModel.uid, GlobalData.contextId, MatchType.Friends);
	}

	//匹配邀请        		
	private onMatchInviteS2C(data:any):void
	{
		App.ViewManager.open(ViewConst.MatchInvite, data);
	}

	//匹配拒绝/过期        		
	private onMatchConfirmS2C(data:any):void
	{
		App.ViewManager.open(ViewConst.MatchResult, data);
	}

	//匹配成功
	private onMatchSuccessS2C(data:any):void
	{
		GlobalData.battleModel.updateData(data);    

		App.SceneManager.runScene(SceneConsts.Battle, data);
    }

	//匹配超时        		
	private onMatchTimeOver():void
	{
		App.ViewManager.close(ViewConst.RandomMatch);
		App.ViewManager.close(ViewConst.FriendMatch);
	}

	private closeAll():void
	{
		App.ViewManager.close(ViewConst.RandomMatch);
		App.ViewManager.close(ViewConst.FriendMatch);
		App.ViewManager.close(ViewConst.MatchResult);
	}
}
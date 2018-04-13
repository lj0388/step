class MatchType
{
	public static Random:string = "1";
	public static Friends:string = "2";
}
class MatchState
{
	public static Normal:string = "0";
	public static Invalid:string = "1";
	public static Refuse:string = "2";
	public static Accept:string = "3";
}
class ConfirmType
{
	public static Accept:string = "1";
	public static Refuse:string = "2";
}

class IndexView extends BaseEuiView
{
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/IndexSkin.exml";
	}

	public imgIcon:eui.Image;

	public btnMatch:eui.Button;
	public btnFriend:eui.Button;
	public btnResult:eui.Button;	//战绩
	public btnShare:eui.Button;	
	
	public hbox:eui.Group;
	public btnSwitch:eui.Button;

	public initUI():void 
	{
		super.initUI();
		
		this.btnMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnMatchClick, this);
		this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFriendClick, this);
		this.btnResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnResultClick, this);
		this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShareClick, this);

		// this.btnAccept.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnAcceptClick, this);
		// this.btnRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRefuseClick, this);
	}

 	public open(...param:any[]):void 
	{
		var data:any = param[0];
		// if (data.hasOwnProperty("matchState"))
		// {
		// 	this.showMatchState(data.matchState);
		// }
		// else
		// {
		// 	this.showIndexUI();
		// }	

		//this.updateBattleRoles(data.groupId);		//更新对战角色信息
    }
	
	private btnMatchClick(e:egret.TouchEvent):void
	{

		// egretfb.EgretFBInstant.context.chooseAsync().then(() => 
		// {
		// 	var contextId = egretfb.EgretFBInstant.context.getID();
		// 	this.contextArr.push(contextId);
			
		// 	var saveData = {context: this.contextArr};

		// 	egretfb.EgretFBInstant.player.setDataAsync(saveData).then(() => 
		// 	{
		// 		egretfb.EgretFBInstant.player.getDataAsync(['context']).then((data) =>
		// 		{
		// 		    egret.log('getDataAsync', data['context'])
		// 		})				
		// 		egret.log('data is set');
		// 	})

		// 	egret.log('context.id chooseAsync:', egretfb.EgretFBInstant.context.getID());

		// }, (err) =>
		// {
		// 	egret.log('chooseAsync error', JSON.stringify(err));
		// })

		//App.ViewManager.open(ViewConst.Friend);

		this.applyFunc(IndexConst.Match_Click);
		//App.SceneManager.runScene(SceneConsts.Battle);	
	}

    private contextArr:string[] = []; 

	//好友面板
	private btnFriendClick(e:egret.TouchEvent):void
	{
		//App.ViewManager.open(ViewConst.Friend);

		// egretfb.EgretFBInstant.player.getDataAsync(['context']).then((data) =>
        // {
		// 	this.contextArr = data['context'];
		// 	egret.log('getDataAsync', data['context']);			
        // })

		//this.applyControllerFunc(FriendConst.OpenFriendView);

		this.applyControllerFunc(ControllerConst.Friend, FriendConst.OPEN_FRIEND_VIEW);
	}

	//战斗记录
	private btnResultClick(e:egret.TouchEvent):void
	{
		//App.ViewManager.open(ViewConst.Friend);

		// egretfb.EgretFBInstant.player.getDataAsync(['context']).then((data) =>
        // {
		// 	this.contextArr = data['context'];
		// 	egret.log('getDataAsync', data['context']);		
			
        // })

		//this.applyControllerFunc(FriendConst.OpenFriendView);

		this.applyControllerFunc(ControllerConst.Record, RecordConst.OPEN_RECORD_VIEW);
	}

	private btnShareClick(e:egret.TouchEvent):void
	{

	}




	// private btnAcceptClick(e:egret.TouchEvent):void
	// {
	// 	if (this.inviteData != null && this.inviteData.groupId != GlobalData.contextId)
	// 	{
	// 		egretfb.EgretFBInstant.context.switchAsync(this.inviteData.groupId).then
	// 		{
	// 			GlobalData.contextId = egretfb.EgretFBInstant.context.getID();
	// 			this.applyFunc(IndexConst.Match_Confirm_Click, 1);
	// 		}
	// 	}
	// 	else
	// 	{
	// 		this.applyFunc(IndexConst.Match_Confirm_Click, 1);
	// 	}				
	// }

	// private btnRefuseClick(e:egret.TouchEvent):void
	// {
	// 	this.applyFunc(IndexConst.Match_Confirm_Click, 2);
	// }


	//友情提示  邀请已失效等
	public showMatchState(state:string):void
	{
		if (state == MatchState.Normal)
		{
			// show ui
		}		
		else if (state == MatchState.Invalid)
		{
			
		}	
		else if (state == MatchState.Refuse)
		{
			
		}	
	}

	public updateBattleRoles(groupId:string)
	{
		if (groupId == null)
		{
			//img random
		}
		else
		{
			//好友数据&头像集合
		}
	}

	// public showIndexUI():void
	// {
	// 	this.matchGroup.visible = false;
	// 	this.indexGroup.visible = true;		
	// }

	// private inviteData:any;
	// public showInviteUI(data:any):void
	// {
	// 	//谁谁邀请你 拒绝/接受
	// 	this.inviteData = data;
	// 	this.inviteGroup.visible = true;
	// }

	//拒绝/过期
	public showInviteResultUI(data:any):void
	{		
		
	}

	// public showMatchUI():void
	// {
	// 	this.matchGroup.visible = true;
	// 	this.indexGroup.visible = false;		
	// }

	// private lastTime = 0;

	// public showMatchTime(time:number):void
	// {
	// 	this.lastTime = time;
	// 	this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);
	// 	App.TimerManager.doTimer(1000, time, this.onMatchTime, this, this.onMatchTimeOver);
	// }

	// private onMatchTime():void
	// {
	// 	this.lastTime--;
	// 	this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);
	// }

	// public matchSuccess():void
	// {
	// 	App.TimerManager.remove(this.onMatchTime, this);
	// }

	// private onMatchTimeOver():void
	// {
	// 	this.lblTime.text = App.DateUtils.getFormatBySecond(0, 3);	
	// 	this.applyFunc(IndexConst.Match_TimeOver);
	// }
}
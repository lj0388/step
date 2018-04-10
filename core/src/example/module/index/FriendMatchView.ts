class FriendMatchView extends BaseEuiView
{
	public imgIcon:eui.Image;
	public lblName:eui.Label;
	public lblTime:eui.Label;
	public btnCancel:eui.Button;
	public btnRandomMatch:eui.Button;

	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/FriendMatchSkin.exml";
	}

	public initUI():void 
	{
		super.initUI();
		
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancelClick, this);
		this.btnRandomMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRandomMatchClick, this);
	}

	public open(...param:any[]):void 
	{
		var data:any = param[0];

		this.updateBattleRoles(data.groupId);		//更新对战角色信息

		this.showMatchTime(30);
    }

	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Cancel);
	}

	private btnRandomMatchClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Random_Match);
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

	private lastTime = 0;

	public showMatchTime(time:number):void
	{
		this.lastTime = time;
		this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);
		App.TimerManager.doTimer(1000, time, this.onMatchTime, this, this.onMatchTimeOver);
	}

	private onMatchTime():void
	{
		this.lastTime--;
		this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);
	}

	public matchSuccess():void
	{
		App.TimerManager.remove(this.onMatchTime, this);
	}

	private onMatchTimeOver():void
	{
		this.lblTime.text = App.DateUtils.getFormatBySecond(0, 3);	
		this.applyFunc(IndexConst.Match_TimeOver);
	}
}
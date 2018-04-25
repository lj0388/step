class RandomMatchView extends BaseEuiView
{
	public imgIcon:IconImg;
	public lblName:eui.Label;
	public lblTime:eui.Label;
	public btnCancel:eui.Button;

	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/RandomMatchSkin.exml";
	}

	public initUI():void 
	{
		super.initUI();
		
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancelClick, this);
	}

	public open(...param:any[]):void 
	{
		//console.log("randomMatch");

		var data:any = param[0];

		this.imgIcon.loadImage(GlobalData.userIcon);

		this.lblName.text = GlobalData.userName;

		this.showMatchTime(GlobalData.matchTime);
    }
	
	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Cancel);
	}

	private lastTime = 0;

	public showMatchTime(time:number):void
	{
		this.lastTime = time;
		this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);

		App.TimerManager.doTimer(1000, time, this.onMatchTime, this, this.onMatchTimeOver, this);
	}

	public onMatchTime():void
	{
		this.lastTime--;
		this.lblTime.text = App.DateUtils.getFormatBySecond(this.lastTime, 3);
	}

	private onMatchTimeOver():void
	{
		//App.TimerManager.remove(this.onMatchTime, this);

		//this.lblTime.text = "00:00";	

		// if (App.TimerManager.isExists(this.onMatchTime, this))
		App.TimerManager.remove(this.onMatchTime, this);

		this.applyFunc(IndexConst.Match_TimeOver);		
	}

	public close(...param:any[]):void 
	{
		// if (App.TimerManager.isExists(this.onMatchTime, this))
		App.TimerManager.remove(this.onMatchTime, this);
    }
}
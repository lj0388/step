class RandomMatchView extends BaseEuiView
{
	public imgIcon:eui.Image;
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
		var data:any = param[0];

		let imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			this.imgIcon.bitmapData = loader.data;			
		}, this);		

		imgLoader.load(GlobalData.userModel.icon);

		this.lblName.text = GlobalData.userModel.name;

		this.showMatchTime(30);
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
		this.lblTime.text = "00:00";	
		this.applyFunc(IndexConst.Match_TimeOver);
	}
}
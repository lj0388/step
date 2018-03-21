class IndexView extends BaseEuiView
{
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/IndexSkin.exml";
	}

	public indexGroup:eui.Group;
	public matchGroup:eui.Group;

	public btnMatch:eui.Button;
	public btnSingle:eui.Button;

	public imgIcon:eui.Image;

	public lblTime:eui.Label;

	public initUI():void 
	{
		super.initUI();
		
		this.btnMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnMatchClick, this);
		this.btnSingle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSingleClick, this);
	}

 	public open(...param:any[]):void 
	{
		this.showIndexUI();
    }
	
	private btnMatchClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Random_Click);
		//App.SceneManager.runScene(SceneConsts.Battle);	
	}

	private btnSingleClick(e:egret.TouchEvent):void
	{

	}

	public showIndexUI():void
	{
		this.matchGroup.visible = false;
		this.indexGroup.visible = true;		
	}

	public showMatchUI():void
	{
		this.matchGroup.visible = true;
		this.indexGroup.visible = false;		
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
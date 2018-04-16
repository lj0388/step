class VictoryView extends BaseEuiView
{
	public constructor($controller:BaseController, $parent:eui.Group) 
	{
        super($controller, $parent);

        this.skinName = "resource/skins/VictorySkin.exml";
    }

    public imgIcon:IconImg;
    public imgIcon2:IconImg;
    public lblTime:eui.Label;

	public btnShare:eui.Image;
    public btnBack:eui.Image;  
 	public btnPlay:eui.Image; 

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void
	{
        super.initUI();
      
     	this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareClickHandler,this);       
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backClickHandler,this);     
        this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playClickHandler,this);      
    }

    public open(...param:any[]):void 
    {
        var data:any = param[0];
        var ownVo:PlayerVO = GlobalData.battleModel.own;
        var enemyVo:PlayerVO = GlobalData.battleModel.enemy;

        this.imgIcon.loadImage(ownVo.icon);
        this.imgIcon2.loadImage(enemyVo.icon);

        var time:number = egret.getTimer() - GlobalData.battleStartTime;
        this.lblTime.text = App.DateUtils.getFormatBySecond(time / 1000, 3);
    }

    private playSound():void
	{
        App.SoundManager.playEffect("sound_dianji");
    }

    private backClickHandler(e:egret.TouchEvent):void
	{
        //this.playSound();
        //App.ViewManager.open(ViewConst.Shop);
        App.SceneManager.runScene(SceneConsts.Index);
    }

    private shareClickHandler(e:egret.TouchEvent):void
	{
        // this.playSound();
        // App.ViewManager.open(ViewConst.Warehouse);
        
    }

    private playClickHandler(e:egret.TouchEvent):void
	{
        //this.playSound();
        //App.ViewManager.open(ViewConst.Shop);
        App.SceneManager.runScene(SceneConsts.Index, "replay");
    }
}
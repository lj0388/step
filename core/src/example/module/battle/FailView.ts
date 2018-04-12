class FailView extends BaseEuiView
{
	public constructor($controller:BaseController, $parent:eui.Group) 
	{
        super($controller, $parent);

        this.skinName = "resource/skins/FailSkin.exml";
    }

    public imgIcon:eui.Image;
    public imgIcon2:eui.Image;
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

    private playClickHandler(e:egret.TouchEvent):void
	{
        //this.playSound();
        //App.ViewManager.open(ViewConst.Shop);
        App.SceneManager.runScene(SceneConsts.Index, "replay");
    }



    private shareClickHandler(e:egret.TouchEvent):void
	{
        // this.playSound();
        // App.ViewManager.open(ViewConst.Warehouse);
    }
}
class BattleResultView extends BaseEuiView
{
	public constructor($controller:BaseController, $parent:eui.Group) 
	{
        super($controller, $parent);

        this.skinName = "resource/skins/BattleResultSkin.exml";
    }


    public imgWin:eui.Image;
    public imgLose:eui.Image;
    public lblTime:eui.Label;

	public btnRank:eui.Image;
    public btnBack:eui.Image;  
 	public btnShare:eui.Image;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void
	{
        super.initUI();
      
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankClickHandler,this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backClickHandler,this);
        this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareClickHandler,this);       
    }

    public open(...param:any[]):void 
    {
        var isWin:boolean = param[0];

        if (isWin)
            this.showWinUI();
        else
            this.showLoseUI();
    }

    private playSound():void
	{
        App.SoundManager.playEffect("sound_dianji");
    }

    private rankClickHandler(e:egret.TouchEvent):void
	{
        // this.playSound();
        // App.ViewManager.open(ViewConst.Friend);
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

    private showWinUI():void
    {
        this.imgWin.visible = true;
        this.imgLose.visible = false;
    }

    private showLoseUI():void
    {
        this.imgWin.visible = false;
        this.imgLose.visible = true;
    }
}
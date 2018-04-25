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

        FBInstant.logEvent("END_BATTLE", 1,{"uid":GlobalData.userId, "win":1, "gid":GlobalData.contextId, "type":GlobalData.matchMode});
    }

    private backClickHandler(e:egret.TouchEvent):void
	{
        //this.playSound();
        //App.ViewManager.open(ViewConst.Shop);
    
        
        App.SceneManager.runScene(SceneConsts.Index);
    }

    private shareClickHandler(e:egret.TouchEvent):void
	{
        var imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			var t:egret.Texture = new egret.Texture();
			t.bitmapData = loader.data;			
			var img:string = t.toDataURL("image/png", new egret.Rectangle(0,0,t.textureWidth, t.textureHeight));

			FBInstant.shareAsync({
            intent: 'REQUEST',
            image: img,
            text: GlobalData.userName + " is inviting you to play one step two steps",
            data: {"msg":1003},
            }).then(function () 
            {
                FBInstant.logEvent("shareGame", 1, {type:1003});
            }).catch(function(e) 
            {
                console.log(e);
            });

        }, this);		

		imgLoader.load(GlobalData.userIcon);
    }

    private playClickHandler(e:egret.TouchEvent):void
	{
        //this.playSound();
        //App.ViewManager.open(ViewConst.Shop);
        App.SceneManager.runScene(SceneConsts.Index, "replay");
    }
}
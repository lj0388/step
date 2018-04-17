class BattleUIView extends BaseEuiView
{
	public constructor($controller:BaseController, $parent:eui.Group) 
	{
        super($controller, $parent);

        this.skinName = "resource/skins/BattleUISkin.exml";
    }

    private controller:BaseController;

    // private bg:egret.Bitmap;
    // private objectContainer:egret.DisplayObjectContainer;
    private player:Player;
    private enemy:Player;
    // private btnOneStep:egret.Bitmap;
    // private btnTwoStep:egret.Bitmap;
    public imgIcon1:IconImg;
    public imgIcon2:IconImg;
    public lblProgress1:eui.Label;
    public lblProgress2:eui.Label;
    public btnOneStep:eui.Image;
    public btnTwoStep:eui.Image;  

    public imgReady:eui.Image;  
    public imgGo:eui.Image;  

    public imgHigh:eui.Image;
    public imgLow:eui.Image;
    public lblHigh:eui.Label;
    public lblLow:eui.Label;

    // public enemys:Array<Enemy>;
    
    public initUI():void
	{
        super.initUI();
      
        this.btnOneStep.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnOneStepClick,this);
        this.btnTwoStep.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTwoStepClick,this);
    }


    public initData():void 
    {
        super.initData();        
    }

    public open(...param:any[]):void 
    {
        this.touchEnabled = false;
        this.imgReady.visible = false;
        this.imgGo.visible = false;
        this.lblHigh.visible = false;
        this.lblLow.visible = false;
        this.imgHigh.visible = false;
        this.imgLow.visible = false;

        GlobalData.battleStartTime = egret.getTimer();
        var ownVo:PlayerVO = GlobalData.battleModel.own;
        var enemyVo:PlayerVO = GlobalData.battleModel.enemy;

        this.player = this.applyFunc(BattleConst.Get_Player, ownVo.uid);
        this.enemy = this.applyFunc(BattleConst.Get_Player, enemyVo.uid);
      
        //egret.Tween.get(this.imgReady).to({"visible":true},1000).to({"x":300},1000);  
        egret.Tween.get(this.imgReady).wait(100).to({"visible":true}).wait(500).to({"visible":false});
        egret.Tween.get(this.imgGo).wait(700).to({"visible":true}).wait(500).to({"visible":false}).call(this.gameStart);  

        App.TimerManager.doTimer(100,0, this.enterFrame, this);

        this.imgIcon1.loadImage(ownVo.icon);
        this.imgIcon2.loadImage(enemyVo.icon);                        
    }

    public gameStart():void
    {
        this.touchEnabled = true;       
    }

    public gameOver():void
    {
        App.TimerManager.remove(this.enterFrame, this);
    }

    private enterFrame():void
    {
        this.lblProgress1.text = Math.floor((this.player.currentIndex - 1) / 112 * 100).toString() + "%";
        this.lblProgress2.text = Math.floor((this.enemy.currentIndex - 1) / 112 * 100).toString() + "%";

        var diff:number = this.player.currentIndex - this.enemy.currentIndex;
        
        console.log("own: " + this.player.currentIndex + " enemy: " + this.enemy.currentIndex);

        if (diff >= 10)
        {
            this.imgHigh.visible = true;
            this.lblHigh.visible = true;
            this.lblHigh.text = Math.abs(diff).toString();
        }
        
        if (diff <= -10)
        {
            this.imgLow.visible = true;
            this.lblLow.visible = true;
            this.lblLow.text = Math.abs(diff).toString();
        }

        if (Math.abs(diff) < 10)
        {
            this.imgHigh.visible = false;
            this.lblHigh.visible = false;
            this.imgLow.visible = false;
            this.lblLow.visible = false;
        }
    }

    private btnOneStepClick(e:egret.TouchEvent):void
	{	
        this.player.nextStep(1);
	}

    private btnTwoStepClick(e:egret.TouchEvent):void
	{      
        this.player.nextStep(2);
	}
}
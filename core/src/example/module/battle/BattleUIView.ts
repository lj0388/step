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
    public imgIcon1:eui.Image;
    public imgIcon2:eui.Image;
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

        var ownVo:PlayerVO = GlobalData.battleModel.own;
        var enemyVo:PlayerVO = GlobalData.battleModel.enemy;

        this.player = this.applyFunc(BattleConst.Get_Player, ownVo.uid);
        this.enemy = this.applyFunc(BattleConst.Get_Player, enemyVo.uid);
      
        //egret.Tween.get(this.imgReady).to({"visible":true},1000).to({"x":300},1000);  
        egret.Tween.get(this.imgReady).wait(100).to({"visible":true}).wait(500).to({"visible":false});
        egret.Tween.get(this.imgGo).wait(700).to({"visible":true}).wait(500).to({"visible":false}).call(this.gameStart);  

         App.TimerManager.doTimer(100, -1, this.enterFrame, this);
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
        this.lblProgress1.text = Math.round(this.player.currentIndex / 112 * 100).toString() + "%";
        this.lblProgress1.text = Math.round(this.enemy.currentIndex / 112 * 100).toString() + "%";

        var diff:number = this.player.currentIndex - this.enemy.currentIndex;
        
        console.log("own: " + this.player.currentIndex + " enemy: " + this.enemy.currentIndex);

        if (diff >= 10)
        {
            this.imgHigh.visible = true;
            this.lblHigh.visible = true;
            this.lblHigh.text = Math.abs(diff).toString();
        }
        else if (diff <= -10)
        {
            this.imgLow.visible = true;
            this.lblLow.visible = true;
            this.lblLow.text = Math.abs(diff).toString();
        }
        else
        {
            this.imgHigh.visible = false;
            this.lblHigh.visible = false;
            this.imgLow.visible = false;
            this.lblLow.visible = false;
        }
    }
   


    public initUI():void
	{
        super.initUI();
      
        this.btnOneStep.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnOneStepClick,this);
        this.btnTwoStep.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTwoStepClick,this);
    }

    // public initUI():void 
    // {
    //     super.initUI();  
    //     this.btnOneStep = new egret.Bitmap();
    //     this.btnOneStep.touchEnabled = true;
    //     this.btnOneStep.texture = RES.getRes("ui_btnAttack_png");
    //     this.btnOneStep.x = 100;
    //     this.btnOneStep.y = App.StageUtils.getHeight() - 150;      
    //     this.btnOneStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOneStepClick, this);
    //     this.addChild(this.btnOneStep);
       

    //     this.btnTwoStep = new egret.Bitmap();
    //     this.btnTwoStep.touchEnabled = true;
    //     this.btnTwoStep.texture = RES.getRes("ui_btnAttack_png");
    //     this.btnTwoStep.x =   App.StageUtils.getWidth() - 200;
    //     this.btnTwoStep.y = App.StageUtils.getHeight() - 150;      
    //     this.addChild(this.btnTwoStep);
    //     this.btnTwoStep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTwoStepClick, this);
    // }

    private btnOneStepClick(e:egret.TouchEvent):void
	{
		//this.applyFunc(LoginConst.LOGIN_C2S);
		//App.SceneManager.runScene(SceneConsts.Battle);
        console.log(1);
        this.player.nextStep(1);
	}

    private btnTwoStepClick(e:egret.TouchEvent):void
	{
        console.log(2);
        this.player.nextStep(2);
		//this.applyFunc(LoginConst.LOGIN_C2S);
		//App.SceneManager.runScene(SceneConsts.Battle);	
	}
}
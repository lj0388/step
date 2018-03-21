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
    
    // private btnOneStep:egret.Bitmap;
    // private btnTwoStep:egret.Bitmap;
    public imgIcon1:eui.Image;
    public imgIcon2:eui.Image;
    public lblProgress1:eui.Label;
    public lblProgress2:eui.Label;
    public btnOneStep:eui.Image;
    public btnTwoStep:eui.Image;  

    // public enemys:Array<Enemy>;
  

    public initData():void 
    {
        super.initData();

        this.player = this.applyFunc(BattleConst.Get_Player);
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
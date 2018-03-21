class UserView extends BaseEuiView
{
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/LoginSkin.exml";
	}

	// public btnBattle:eui.Button;
	// public btnSolo:eui.Button;

	public initUI():void 
	{
		super.initUI();

		// this.btnBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBattleClick, this);
		// this.btnSolo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSoloClick, this);
	}

	public matchSuccess():void
	{

	}
	
	private btnBattleClick(e:egret.TouchEvent):void
	{
		this.applyFunc(LoginConst.LOGIN_C2S);
		//App.SceneManager.runScene(SceneConsts.Battle);	
	}

	private btnSoloClick(e:egret.TouchEvent):void
	{

	}

}
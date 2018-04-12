class MatchResultView extends BaseEuiView
{
	public imgIcon:eui.Image;
	public imgFriendIcon:eui.Image;
	public lblName:eui.Label;
	public lblState:eui.Label;

	public btnCancel:eui.Button;
	public btnRandomMatch:eui.Button;
	
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/MatchResultSkin.exml";
	}

	public initUI():void 
	{
		super.initUI();		
	
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancelClick, this);
		this.btnRandomMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRandomMatchClick, this);
	}

	public open(...param:any[]):void 
	{
		var data:any = param[0];
		
		if (data.state == MatchState.Invalid)
		{
			this.lblState.text = "invited Invalid";
		}
		else if (data.state == MatchState.Refuse)
		{
			this.lblState.text = "xxx refuse your invited";
		}
		

		//this.updateBattleRoles(data.groupId);		//更新对战角色信息
    }


	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Cancel);
	}

	private btnRandomMatchClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Random_Match);
	}

	
}
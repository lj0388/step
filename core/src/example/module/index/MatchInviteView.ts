class MatchInviteView extends BaseEuiView
{
	public imgIcon:eui.Image;
	public imgFriendIcon:eui.Image;
	public lblName:eui.Label;
	public btnAccept:eui.Button;
	public btnCancel:eui.Button;

	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/MatchInviteSkin.exml";
	}

	public initUI():void 
	{
		super.initUI();
		
		this.btnAccept.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnAcceptClick, this);
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancelClick, this);
	}

	public open(...param:any[]):void 
	{
		var data:any = param[0];

		//this.updateBattleRoles(data.groupId);		//更新对战角色信息
    }

	private btnAcceptClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Confirm_Click, ConfirmType.Accept);
	}

	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Confirm_Click, ConfirmType.Refuse);
	}
}




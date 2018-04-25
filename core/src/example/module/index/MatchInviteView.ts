class MatchInviteView extends BaseEuiView
{
	public imgIcon:IconImg;
	public imgIcon2:IconImg;

	public lblName:eui.Label;
	public lblName2:eui.Label;

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

	private data:any;

	public open(...param:any[]):void 
	{
		this.data = param[0];
			
		this.imgIcon.loadImage(GlobalData.userModel.icon);
		this.lblName.text = GlobalData.userModel.name;
	
		this.imgIcon2.loadImage(this.data.senderIcon);
		this.lblName2.text = this.data.senderName;
    }

	private btnAcceptClick(e:egret.TouchEvent):void
	{
		//console.log("acceptClick: ");
		
		this.applyFunc(IndexConst.Match_Confirm_Click, ConfirmType.Accept, this.data);
		//App.ViewManager.closeView(this);
	}

	private btnCancelClick(e:egret.TouchEvent):void
	{
		//console.log("cancelClick: ");
		
		this.applyFunc(IndexConst.Match_Confirm_Click, ConfirmType.Refuse, this.data);
		App.ViewManager.closeView(this);
	}
}




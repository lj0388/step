class MatchInviteView extends BaseEuiView
{
	public imgIcon:eui.Image;
	public imgIcon2:eui.Image;
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

		if (GlobalData.isDev)
			return;
			
		let imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			this.imgIcon.bitmapData = loader.data;			
		}, this);		

		imgLoader.load(GlobalData.userModel.icon);

		this.lblName.text = GlobalData.userModel.name;

		let imgLoader2:egret.ImageLoader = new egret.ImageLoader();
		imgLoader2.crossOrigin = "anonymous";
		imgLoader2.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			this.imgIcon2.bitmapData = loader.data;			
		}, this);		

		imgLoader2.load(this.data.senderIcon);

		this.lblName2.text = this.data.senderName;
    }

	private btnAcceptClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Confirm_Click, ConfirmType.Accept, this.data);
		App.ViewManager.closeView(this);
	}

	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Confirm_Click, ConfirmType.Refuse, this.data);
		App.ViewManager.closeView(this);
	}
}




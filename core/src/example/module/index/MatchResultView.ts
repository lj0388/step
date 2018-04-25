class MatchResultView extends BaseEuiView
{
	public imgIcon:IconImg;
	public hbox:eui.Group;
	public lblName:eui.Label;
	public lblName2:eui.Label;
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

	private tms:number = 0;
	public open(...param:any[]):void 
	{
		var data:any = param[0];
		
		if (data.state == MatchState.Invalid)
		{
			this.lblState.text = "This challenge is no longer availble";
		}
		else if (data.state == MatchState.Refuse)
		{
			this.lblState.text = data.name + " has refused your challenge";
		}
		
		this.imgIcon.loadImage(GlobalData.userModel.icon);

		this.lblName.text = GlobalData.userModel.name;

		this.updateGroupRoles(GlobalData.contextId);		//更新对战角色信息

		this.tms = egret.setTimeout(this.closeUI,this,3000);
    }

	private closeUI():void
	{
		if (this.tms > 0)
		{
			egret.clearTimeout(this.tms);
			App.ViewManager.closeView(this);
			this.tms = 0;
		}	
	}

	public updateGroupRoles(groupId:string)
	{	
		// if (GlobalData.contextId == "-1")
		// 	return;
		
		this.hbox.removeChildren();

		FBInstant.context.getPlayersAsync().then((players) => 
		{
			var len:number = players.length;

			if (len == 1)
			{
				var img:IconImg = new IconImg();
				img.width = img.height = 190;			
				this.hbox.addChild(img);			
				this.lblName2.text = "";
			}

			if (len == 2)
			{
				for (var i:number = 0; i < 2; i++)
				{
					if (players[i].getID() != GlobalData.userId)
					{
						var img:IconImg = new IconImg();	
						img.width = img.height = 190;				
						img.loadImage(players[i].getPhoto());
						this.hbox.addChild(img);		

						this.lblName2.text = players[i].getName();
					}
				}
			}

			if (len > 2)
			{
				var j:number = 0;

				for (var i:number = 0; i < players.length; i++)
				{
					if (players[i].getID() == GlobalData.userId)
						continue;
					
					if (j <= 2)
					{
						var img:IconImg = new IconImg();		
						img.width = img.height = 190;				
						img.loadImage(players[i].getPhoto());
						this.hbox.addChild(img);	
						j++;
					}								
				}			
				
				this.lblName2.text = players.length.toString() + " friends";
			}
			
		});		
	}


	private btnCancelClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Cancel);
	}

	private btnRandomMatchClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Mode, MatchType.Random);
	}

	public close(...param:any[]):void 
	{
		this.closeUI();
    }
}
class MatchType
{
	public static Random:string = "1";
	public static Friends:string = "2";
}
class MatchState
{
	public static Normal:string = "0";
	public static Invalid:string = "1";
	public static Refuse:string = "2";
	public static Accept:string = "3";
}
class ConfirmType
{
	public static Accept:string = "1";
	public static Refuse:string = "2";
}

class IndexView extends BaseEuiView
{
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/IndexSkin.exml";
	}

	public imgIcon:eui.Image;
	public hbox:eui.Group;
	public btnSwitch:eui.Button;

	public lblName:eui.Label;
	public lblName2:eui.Label;

	public btnMatch:eui.Button;

	public btnResult:eui.Button;	//战绩
	public btnShare:eui.Button;	
	

	public initUI():void 
	{
		super.initUI();
		
		this.btnMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnMatchClick, this);

		this.btnSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFriendClick, this);
		this.hbox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFriendClick, this);
		
		this.btnResult.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnResultClick, this);
		this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShareClick, this);
	}

 	public open(...param:any[]):void 
	{
		var data:any = param[0];

		this.updateGroupRoles(GlobalData.contextId);
    }
	
	private btnMatchClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Click);	
	}

    private contextArr:string[] = []; 

	//好友面板
	private btnFriendClick(e:egret.TouchEvent):void
	{
		this.applyControllerFunc(ControllerConst.Friend, FriendConst.OPEN_FRIEND_VIEW);
	}

	//战斗记录
	private btnResultClick(e:egret.TouchEvent):void
	{
		this.applyControllerFunc(ControllerConst.Record, RecordConst.OPEN_RECORD_VIEW);
	}

	private btnShareClick(e:egret.TouchEvent):void
	{
		//share game
	}


	public updateGroupRoles(groupId:string)
	{	
		if (GlobalData.contextId == "-1")
			return;
		
		this.hbox.removeChildren();

		var j:number = 0;

		FBInstant.context.getPlayersAsync().then((players) => 
		{
			this.lblName2.text = players.length.toString() + " friends";

			for (var i:number = 0; i < players.length; i++)
			{
				if (i >= 3)
					break;

				var img:IconImg = new IconImg();
				img.width = 182;
				img.height = 182;
				img.loadImage(players[i].getPhoto());
				this.hbox.addChild(img);				
			}			
		});		
	}
}
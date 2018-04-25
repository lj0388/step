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

	public imgIcon:IconImg;
	//public iconHead:IconHead;
	public hbox:eui.Group;
	public btnSwitch:eui.Button;

	public lblName:eui.Label;
	public lblName2:eui.Label;

	public btnMatch:eui.Button;

	public btnResult:eui.Button;	//战绩
	public btnShare:eui.Button;	
	
	public imgRandom:eui.Image;

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

		this.imgIcon.loadImage(GlobalData.userModel.icon);

		this.lblName.text = GlobalData.userModel.name;

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
		FBInstant.logEvent("CLICK_FRIEND_GROUP", 1,{"uid":GlobalData.userId, "gid":GlobalData.contextId, "type":GlobalData.matchMode});
		this.applyControllerFunc(ControllerConst.Friend, FriendConst.OPEN_FRIEND_VIEW);
	}

	//战斗记录
	private btnResultClick(e:egret.TouchEvent):void
	{
		// var preloadedRewardedVideo = null;

		// FBInstant.getRewardedVideoAsync
		// ('956217177868389_974503196039787', // Your Ad Placement Id
		// ).then(function(rewarded) 
		// {
		// 	// Load the Ad asynchronously
		// 	preloadedRewardedVideo = rewarded;
		// 	return preloadedRewardedVideo.loadAsync();
		// }).then(function() 
		// {
		// 	console.log('Rewarded video preloaded')
		// 	preloadedRewardedVideo.showAsync().then(function() 
		// 	{
		// 		// Perform post-ad success operation
		// 		console.log('Rewarded video watched successfully');        
		// 	}).catch(function(e) 
		// 	{
		// 		console.error(e.message);
		// 	});

		// }).catch(function(err)
		// {
		// 	console.error('Rewarded video failed to preload: ' + err.message);
		// });
		FBInstant.logEvent("CLICK_FRIEND_GROUP", 1,{"uid":GlobalData.userId, "gid":GlobalData.contextId, "type":GlobalData.matchMode});
		
		this.applyControllerFunc(ControllerConst.Record, RecordConst.OPEN_RECORD_VIEW);
	}

	private btnShareClick(e:egret.TouchEvent):void
	{
		var imgLoader:egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		
		imgLoader.once(egret.Event.COMPLETE, (evt:egret.Event) =>
		{
			var loader:egret.ImageLoader = <egret.ImageLoader>evt.currentTarget;
			var t:egret.Texture = new egret.Texture();
			t.bitmapData = loader.data;			
			var img:string = t.toDataURL("image/png", new egret.Rectangle(0,0,t.textureWidth, t.textureHeight));

			FBInstant.shareAsync({
				intent: 'REQUEST',
				image: img,
				text: GlobalData.userName + " has recommended a game for you!",
				data: {"msg":1001},
			}).then(function () 
			{
				//当消息发送后，关闭游戏
				FBInstant.logEvent("shareGame", 1, {type:1001});

			}).catch(function(e) 
			{
				console.log(e);
			});

		}, this);		

		imgLoader.load(GlobalData.userIcon);
	}

	public updateGroupRoles(groupId:string)
	{			
		if (GlobalData.contextId == "-1")
		{
			this.imgRandom.visible = true;
			//this.btnSwitch.visible = true;
			this.hbox.visible = false;
			this.lblName2.visible = false;
			//console.log("indexGroups null");
			
			return;
		}

		this.imgRandom.visible = false;
		//this.btnSwitch.visible = true;
		this.hbox.visible = true;
		this.lblName2.visible = true;
		
		this.hbox.removeChildren();

		FBInstant.context.getPlayersAsync().then((players) => 
		{
			var len:number = players.length;

			//console.log("indexGroups " + len);

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
			
		}).catch(function(e) 
        {
            console.log(e);
        });		
	}

	


	
}
class FriendView extends BaseEuiView
{
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/FriendSkin.exml";
	}

  
    public btnRandomMatch:eui.Button;
    public list:eui.List;
	public btnFriend:eui.Button;    //挑战好友
    public btnBack:eui.Button;
	

	public initUI():void 
	{
		super.initUI();
		
        this.btnRandomMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRandomMatchClick, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemClick,this);
		this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFriendClick, this);
		this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBackClick, this);
	}

    private onItemClick(e:eui.ItemTapEvent):void
    {
        var groupId:string = e.itemRenderer.data.groupId;

        var j:any = this;

        if (GlobalData.contextId != groupId)
        {
            FBInstant.context.switchAsync(groupId).then(function()
            {
                //console.log("contextId: " + FBInstant.context.getID());                
                
                App.ViewManager.closeView(this);

                GlobalData.contextId = groupId;
                
                FBInstant.logEvent("CHANGE_FRIEND_GROUP", 1,{"uid":GlobalData.userId, "gid":GlobalData.contextId, "type":GlobalData.matchMode});
                
                j.applyControllerFunc(ControllerConst.Index, IndexConst.Update_IndexView);
                j.applyControllerFunc(ControllerConst.Index, IndexConst.Match_Mode, MatchType.Friends);
            }
            ).catch(function(e) 
            {
                console.log(e);
            });
        }
        else
        {
            j.applyControllerFunc(ControllerConst.Index, IndexConst.Match_Mode, MatchType.Friends);
        }
               
    }

    public initData():void 
    {
        super.initData();
       
        this.list.itemRenderer = FriendItemRender;
        this.list.itemRendererSkinName = "resource/skins/FriendItemSkin.exml";    
    }

    
 	public open(...param:any[]):void 
	{
        var model:FriendModel = param[0];
        
        var dp:eui.ArrayCollection = new eui.ArrayCollection(model.getFriendsList());
        
        this.list.dataProvider = dp;

        FBInstant.logEvent("OPEN_FRIEND_VIEW", 1,{"uid":GlobalData.userId, "gid":GlobalData.contextId, "type":GlobalData.matchMode});
    }

    private btnRandomMatchClick(e:egret.TouchEvent):void
	{
        App.ViewManager.closeView(this);

        this.applyControllerFunc(ControllerConst.Index, IndexConst.Match_Mode, MatchType.Random)
    }
	
    private contextArr:string[] = []; 

	private btnFriendClick(e:egret.TouchEvent):void
	{
        //egret.log('context.id now:', egretfb.EgretFBInstant.context.getID())
        var j:any = this;
        
        FBInstant.context.chooseAsync().then(function()
        {
            j.changeContext();
        }
        ).catch(function(e) 
        {
            console.log(e);
        });
	}

    private changeContext():void
    {
        App.ViewManager.closeView(this);

        var contextId = FBInstant.context.getID();
        //console.log("context.id: " + contextId);
        GlobalData.contextId = contextId;
        
        this.applyControllerFunc(ControllerConst.Index, IndexConst.Update_IndexView);       
        this.applyControllerFunc(ControllerConst.Index, IndexConst.Match_Mode, MatchType.Friends);       
    }

	private btnBackClick(e:egret.TouchEvent):void
	{
        App.ViewManager.closeView(this);
	}

}
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
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
		this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFriendClick, this);
		this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBackClick, this);
	}

    private onChange(e:eui.PropertyEvent):void
    {
        //获取点击消息
        //e.stopImmediatePropagation();
        console.log(this.list.selectedItem,this.list.selectedIndex);

        //fb switch group api   
        //this.applyControllerFunc(ControllerConst.Index, IndexConst.Match_Mode, MatchType.Friends);
        
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
    }

    private btnRandomMatchClick(e:egret.TouchEvent):void
	{
        App.ViewManager.closeView(this);

        this.applyControllerFunc(ControllerConst.Index, IndexConst.Match_Mode, MatchType.Random)
    }
	
    private contextArr:string[] = []; 

	private btnFriendClick(e:egret.TouchEvent):void
	{
		this.applyFunc(IndexConst.Match_Click);

        egret.log('context.id now:', egretfb.EgretFBInstant.context.getID())

        egretfb.EgretFBInstant.context.chooseAsync().then(() => 
        {
            //var saveData = { score: 123, value: Math.floor(Math.random() * 100) }

            //  egretfb.EgretFBInstant.player.getDataAsync(['context']).then((data) =>
            //  {
            //      egret.log('getDataAsync', data['context'])
            //  })

            var contextId = egretfb.EgretFBInstant.context.getID();
            this.contextArr.push(contextId);
            
            var saveData = {context: this.contextArr};

            egretfb.EgretFBInstant.player.setDataAsync(saveData).then(() => 
            {
                egretfb.EgretFBInstant.player.getDataAsync(['context']).then((data) =>
                {
                    egret.log('getDataAsync', data['context'])
                })
                
                egret.log('data is set');
            })

            egret.log('context.id chooseAsync:', egretfb.EgretFBInstant.context.getID());

        }, (err) =>
        {
            egret.log('chooseAsync error', JSON.stringify(err));
        })

		//App.SceneManager.runScene(SceneConsts.Battle);	
	}

	private btnBackClick(e:egret.TouchEvent):void
	{
        // var groupId = e.data.groupId;

        // if (GlobalData.contextId != groupId)
        // {
        //     egretfb.EgretFBInstant.context.switchAsync(groupId).then
        //     {
        //         GlobalData.contextId = groupId;
        //         this.applyControllerFunc(IndexConst.Match_Invite_C2S);
        //     }
        // }
        // else
        // {
        //      this.applyControllerFunc(IndexConst.Match_Invite_C2S);
        // }
        App.ViewManager.closeView(this);
	}

}
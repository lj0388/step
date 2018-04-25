// TypeScript file
class RecordView extends BaseEuiView
{
	public constructor(controller:BaseController, parent:eui.Group) 
	{
		super(controller, parent);

		this.skinName = "resource/skins/RecordSkin.exml";
	}

  
    public btnRandom:eui.Button;

    public list:eui.List;
    public btnBack:eui.Button;
	

	public initUI():void 
	{
		super.initUI();
		
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
		this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBackClick, this);
	}

    private onChange(e:eui.PropertyEvent):void
    {
        //获取点击消息
        //console.log(this.list.selectedItem,this.list.selectedIndex)
        
    }

    public initData():void 
    {
        super.initData();

        // var dp1:eui.ArrayCollection = new eui.ArrayCollection();
        // dp1.addItem({contextId: "1"});      
        
        this.list.itemRenderer = RecordItemRender;
        this.list.itemRendererSkinName = "resource/skins/RecordItemSkin.exml";
        

        // var layout:eui.TileLayout = new eui.TileLayout();
        // layout.requestedColumnCount = 1;

        // var taskList:eui.List = new eui.List();
        // taskList.layout = layout;
        // taskList.itemRenderer = FriendItemRender;
        // taskList.itemRendererSkinName = "resource/skins/FriendItemSkin.exml";
        // taskList.dataProvider = dp1;
        // this.addChild(taskList);

       

        // var scroller:eui.Scroller = new eui.Scroller();
        // scroller.percentWidth = scroller.percentHeight = 100;
        // scroller.viewport = taskList;
    }

    
 	public open(...param:any[]):void 
	{
        var model:RecordModel = param[0];

        var dp:eui.ArrayCollection = new eui.ArrayCollection(model.records);
        
        this.list.dataProvider = dp;
        
        FBInstant.logEvent("OPEN_RECORD_VIEW", 1,{"uid":GlobalData.userId, "gid":GlobalData.contextId, "type":GlobalData.matchMode});
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
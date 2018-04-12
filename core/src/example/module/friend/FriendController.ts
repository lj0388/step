/**
 * Created by egret on 15-1-7.
 */
class FriendController extends BaseController 
{
    
    private model:FriendModel;
	private proxy:FriendProxy;

    private friendView:FriendView;

    public constructor() 
    {
        super();

        this.model = new FriendModel(this);
		this.proxy = new FriendProxy(this);

        this.friendView = new FriendView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Friend, this.friendView);

        this.registerFunc(FriendConst.OPEN_FRIEND_VIEW, this.openFriendView, this);
        this.registerFunc(FriendConst.GET_Friends_S2C, this.getFriendsS2C, this);
		// this.registerFunc(IndexConst.Match_Random_Click, this.onRandomMatch, this);		//单击匹配
		// this.registerFunc(IndexConst.Match_TimeOver, this.onMatchTimeOver, this);		//匹配超时        		
        // this.registerFunc(IndexConst.Match_S2C, this.onMatchSuccess, this);				//匹配成功
    }   

    private openFriendView():void
    {
        //this.proxy.requestFriendList(GlobalData.userId);
        this.proxy.requestFriendList("u0001");
    }

    private getFriendsS2C():void
    {
        App.ViewManager.open(ViewConst.Friend, this.model);
    }

    
    // private onRandomMatch():void
    // {

    // }

}
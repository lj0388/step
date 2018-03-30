class UserController extends BaseController
{
	 //本模块的数据存储
    private userModel:UserModel;
    //本模块的所有UI
    private userView:UserView;
    //本模块的Proxy
    private userProxy:UserProxy;

    public constructor()
	{
        super();

       
        this.userModel = new UserModel(this);        //初始化Model
  		GlobalData.userModel = this.userModel;
		
        this.userProxy = new UserProxy(this);       //初始化Proxy
       
		//初始化UI
        this.userView = new UserView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.userView);
      
        this.registerFunc(UserConst.LOGIN_C2S, this.onLogin, this);
        this.registerFunc(UserConst.LOGIN_S2C, this.loginSuccess, this);

        this.registerFunc(UserConst.Invite_LOGIN_C2S, this.onInviteLogin, this);
        this.registerFunc(UserConst.Invite_LOGIN_S2C, this.loginSuccess, this);
        //this.registerFunc(UserConst.Invite_LOGIN_S2C, this.inviteLoginSuccess, this);
    }

	private onLogin(uid:string, name:string, icon:string):void
	{
        this.userProxy.login(uid, name, icon);
    }

    private onInviteLogin(uid:string, name:string, icon:string, rid:string, sid:string):void
	{
        this.userProxy.login(uid, name, icon);
    }

    /**
     * 登陆成功处理
     */
    private loginSuccess(data:any):void
	{
        //保存数据
		this.userModel.updateData(data);
        //本模块UI处理
        //this.userView.loginSuccess();
        //UI跳转
        //App.ViewManager.close(ViewConst.Login);
        //var model:BaseModel = this.getControllerModel(ControllerConst.Login);
		App.SceneManager.runScene(SceneConsts.Index, data);
    }

    // private inviteLoginSuccess(data:any):void
	// {
    //     this.userModel.updateData(data);
    //     App.SceneManager.runScene(SceneConsts.Index, data);
    // }
   

}
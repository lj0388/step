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

        //初始化Model
        this.userModel = new UserModel(this);
  		
		//初始化Proxy
        this.userProxy = new UserProxy(this);
        GlobalData.userModel = this.userModel;
        
		//初始化UI
        this.userView = new UserView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.userView);
      
        //注册C2S消息
        this.registerFunc(UserConst.LOGIN_C2S, this.onLogin, this);

        //注册S2C消息
        this.registerFunc(UserConst.LOGIN_S2C, this.loginSuccess, this);
    }

	private onLogin(uid:string, name:string, icon:string):void
	{
        this.userProxy.login(uid, name, icon);
    }

    /**
     * 登陆成功处理
     */
    private loginSuccess(userInfo:any):void
	{
        //保存数据
		this.userModel.updateData(userInfo);
        //本模块UI处理
        //this.userView.loginSuccess();
        //UI跳转
        //App.ViewManager.close(ViewConst.Login);
        //var model:BaseModel = this.getControllerModel(ControllerConst.Login);
		App.SceneManager.runScene(SceneConsts.Index);
		
    }

}
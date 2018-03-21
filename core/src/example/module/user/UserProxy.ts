class UserProxy extends BaseProxy
{
    public constructor($controller:BaseController)
	{
        super($controller);

        //注册从服务器返回消息的监听
        this.receiveServerMsg(ServerConst.LOGIN_S2C, this.loginSuccess, this);
    }

    /**
     * 用户登陆
     * @param userName
     * @param pwd
     */
    public login(uid:string, name:string, icon:string):void
	{
        var paramObj:any = 
		{
            "uid":uid,
            "name":name,
			"icon":icon
        };

        this.sendSocketMsg(ServerConst.LOGIN_C2S, paramObj);
    }

    /**
     * 用户登陆成功返回
     */
    public loginSuccess(obj:any):void
	{
        this.applyFunc(LoginConst.LOGIN_S2C, obj);
    }
}
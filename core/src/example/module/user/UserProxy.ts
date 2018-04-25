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
    public login(uid:string, name:string, icon:string, rid:string, sid:string):void
	{
        var paramObj:any = 
		{
            "uid":uid,
            "name":name,
			"icon":icon,
            "groupId":rid
        };

       // console.log("userNameC2S: " + paramObj.name);

        if (sid != "-1")
        {
            paramObj.senderId = sid;
            this.sendSocketMsg(ServerConst.Invite_LOGIN_C2S, paramObj);
        }
        else
        {
             this.sendSocketMsg(ServerConst.LOGIN_C2S, paramObj);
        }
    }

    /**
     * 用户登陆成功返回
     */
    public loginSuccess(obj:any):void
	{
        this.applyFunc(UserConst.LOGIN_S2C, obj);
    }    
}
class UserModel extends BaseModel
{
    //public userInfo:any;
    public uid:string;
    public name:string;
    public icon:string;
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller:BaseController) 
	{
        super($controller);
    }

    public updateData(data:any):void
    {
        this.uid = data.uid;
        this.name = data.name;
        this.icon = data.icon;
    }

    public isOwn(uid:string):boolean
    {
        if (this.uid == uid)
            return true;

        return false;
    }
}

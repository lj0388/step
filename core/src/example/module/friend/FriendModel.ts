class FriendModel  extends BaseModel
{
    //public userInfo:any;
   

    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller:BaseController) 
    {
        super($controller);
    }

	public groups:string[];
	public friends:any[];

	public updateFriendsData(data:any):void
	{
		this.groups = data.groups;
		this.friends = data.friends;	
	}
   
   //获取当前聊天组的好友
   public getFriendsByGroupId(groupId:string):any[]
   {	   
	   var array:any[] = [];

	   for (var i:number = 0; i < this.friends.length; i++)
	   {		   
		   var obj:any = this.friends[i];
		   
		   if (obj.groupId == groupId)
		   		   array.push(obj);
	   }

	   return array;
   }

   //好友信息列表
   public getFriendsList():any[]
   {
	   var array:any[] = [];
	   for (var i:number = 0; i < this.groups.length; i++)
        {
            var data:any = {};
            var groupId = this.groups[i];
            var friends:any[] = this.getFriendsByGroupId(groupId);
            data.groupId = groupId;
            data.friends = friends;
			array.push(data);
        }
		return array;
   }

}
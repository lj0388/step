class BattleData 
{
	public constructor() 
	{
	}

 	public static tileWidth: number = 150;
    public static tileHeight: number = 150;

	public static mapData:any[] = 
    [
		{id:1,x:1,y:1,f:1},
		{id:2,x:1,y:2,f:1},
		{id:3,x:1,y:3,f:1},
		{id:4,x:1,y:4,f:1},

		{id:5,x:2,y:4,f:-1},

		{id:6,x:3,y:4,f:-1},
		{id:7,x:3,y:3,f:-1},
		{id:8,x:3,y:2,f:-1},
		{id:9,x:3,y:1,f:-1},

		{id:10,x:4,y:1,f:1},

		{id:11,x:5,y:1,f:1},
		{id:12,x:5,y:2,f:1},
		{id:13,x:5,y:3,f:1},
		{id:14,x:5,y:4,f:1},

		{id:15,x:6,y:4,f:-1},

		{id:16,x:7,y:4,f:-1},
		{id:17,x:7,y:3,f:-1},
		{id:18,x:7,y:2,f:-1},
		{id:19,x:7,y:1,f:-1},

		{id:20,x:8,y:1,f:1},

		{id:21,x:9,y:1,f:1},
		{id:22,x:9,y:2,f:1},
		{id:23,x:9,y:3,f:1},
		{id:24,x:9,y:4,f:1},

		{id:25,x:10,y:4,f:-1},

		{id:26,x:11,y:4,f:-1},
		{id:27,x:11,y:3,f:-1},
		{id:28,x:11,y:2,f:-1},
		{id:29,x:11,y:1,f:-1},

		{id:30,x:12,y:1,f:1},

		{id:31,x:13,y:1,f:1},
		{id:32,x:13,y:2,f:1},
		{id:33,x:13,y:3,f:1},
		{id:34,x:13,y:4,f:1},

		{id:35,x:14,y:4,f:-1},

		{id:36,x:15,y:4,f:-1},
		{id:37,x:15,y:3,f:-1},
		{id:38,x:15,y:2,f:-1},
		{id:39,x:15,y:1,f:-1},

		{id:40,x:16,y:1,f:1},

		{id:41,x:17,y:1,f:1},
		{id:42,x:17,y:2,f:1},
		{id:43,x:17,y:3,f:1},
		{id:44,x:17,y:4,f:1},

		{id:45,x:18,y:4,f:-1},

		{id:46,x:19,y:4,f:-1},
		{id:47,x:19,y:3,f:-1},
		{id:48,x:19,y:2,f:-1},
		{id:49,x:19,y:1,f:-1},

		{id:50,x:20,y:1,f:1},

		{id:51,x:21,y:1,f:1},
		{id:52,x:21,y:2,f:1},
		{id:53,x:21,y:3,f:1},
		{id:54,x:21,y:4,f:1},

		{id:55,x:22,y:4,f:-1},

		{id:56,x:23,y:4,f:-1},
		{id:57,x:23,y:3,f:-1},
		{id:58,x:23,y:2,f:-1},
		{id:59,x:23,y:1,f:-1},

		{id:60,x:24,y:1,f:1},

		{id:61,x:25,y:1,f:1},
		{id:62,x:25,y:2,f:1},
		{id:63,x:25,y:3,f:1},
		{id:64,x:25,y:4,f:1},

		{id:65,x:26,y:4,f:-1},

		{id:66,x:27,y:4,f:-1},
		{id:67,x:27,y:3,f:-1},
		{id:68,x:27,y:2,f:-1},
		{id:69,x:27,y:1,f:-1},

		{id:70,x:28,y:1,f:1},

		{id:71,x:29,y:1,f:1},
		{id:72,x:29,y:2,f:1},
		{id:73,x:29,y:3,f:1},
		{id:74,x:29,y:4,f:1,},

		{id:75,x:30,y:4,f:-1},

		{id:76,x:31,y:4,f:-1},
		{id:77,x:31,y:3,f:-1},
		{id:78,x:31,y:2,f:-1},
		{id:79,x:31,y:1,f:-1},

		{id:80,x:32,y:1,f:1},

		{id:81,x:33,y:1,f:1},
		{id:82,x:33,y:2,f:1},
		{id:83,x:33,y:3,f:1},
		{id:84,x:33,y:4,f:1},

		{id:85,x:34,y:4,f:-1},

		{id:86,x:35,y:4,f:-1},
		{id:87,x:35,y:3,f:-1},
		{id:88,x:35,y:2,f:-1},
		{id:89,x:35,y:1,f:-1},

		{id:90,x:36,y:1,f:1},

		{id:91,x:37,y:1,f:1},
		{id:92,x:37,y:2,f:1},
		{id:93,x:37,y:3,f:1},
		{id:94,x:37,y:4,f:1},

		{id:95,x:38,y:4,f:-1},

		{id:96,x:39,y:4,f:-1},
		{id:97,x:39,y:3,f:-1},
		{id:98,x:39,y:2,f:-1},
		{id:99,x:39,y:1,f:-1},

		{id:100,x:40,y:1,f:1},

		{id:101,x:41,y:1,f:1},
		{id:102,x:41,y:2,f:1},
		{id:103,x:41,y:3,f:1},
		{id:104,x:41,y:4,f:1},

		{id:105,x:42,y:4,f:-1},

		{id:106,x:43,y:4,f:-1},
		{id:107,x:43,y:3,f:-1},
		{id:108,x:43,y:2,f:-1},
		{id:109,x:43,y:1,f:-1},

		{id:110,x:44,y:1,f:1},

		{id:111,x:45,y:1,f:1},
		{id:112,x:45,y:2,f:1},
		{id:113,x:45,y:3,f:1},
		{id:114,x:45,y:4,f:1}
	];
}
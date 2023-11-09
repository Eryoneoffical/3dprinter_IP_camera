const app = require('express')();
const wsInstance = require('express-ws')(app);
var fs = require('fs');

var clientList = [], LoginList=[];
var   usrID_list = []; 
function _Login_List()
{
////////////c 
	this.index;//clientI ; 
 
	this.type=""; 
	this.name=""; 
	this.password=""; 
	this.ws ; 
	this.friend_name;
	this.friend_ws;
	
	this.heart;
	this.connected_usr="";
	this.live_count=0;
}

////////////////////
app.ws('/', ws => {
	console.log('new'+ws);
    clientList.push(ws);  

	ws.on('message', data => {
		console.log(data);
		data_route(data,ws);
		LoginList.forEach(usr_on => {
           if(usr_on.ws==ws && usr_on.friend_ws)
           {
           		console.log('friend is online:'+usr_on.friend_ws);
				usr_on.friend_ws.send(data);
		   }
		});
		// send to other ws
	/*	wsInstance.getWss().clients.forEach(server => {
			if (server !== ws) {
				server.send(data);
			}
		});*/
	});	
	///send the close message to other ws
	ws.on('close', () => {
        console.log('WebSocket '+ws+' was closed')
		LoginList.forEach(usr_on => {
	       if(usr_on.ws==ws)
	       {
	       		var index = LoginList.indexOf(usr_on);
				LoginList.splice(index, 1);
				
				var closestring=JSON.stringify({ name: 'client', online: 0 })
				if (usr_on.friend_ws.readyState === 1/*WebSocket.OPEN*/)
					usr_on.friend_ws.send(closestring);
		   }
	       if(usr_on.friend_ws==ws)
	       {
	       		//usr_on.friend_ws=null;
				var closestring=JSON.stringify({ name: 'client', online: 0 })
				if(usr_on.ws.readyState === 1/*WebSocket.OPEN*/)
					usr_on.ws.send(closestring);
		   }
		   
		});
		
		wsInstance.getWss().clients.forEach(server => {
			if (server !== ws) {
				var closestring=JSON.stringify({ name: 'client', online: 0 })
				if(server.readyState === 1/*WebSocket.OPEN*/)
					server.send(closestring);
			}
		});
		//ws=0;	
    })
});

/*
app.get('/', (req, res) => {
	res.sendFile('./index.html', { root: __dirname });
});

app.get('/p2p', (req, res) => {
	res.sendFile('./p2p.html', { root: __dirname });
});
*/
app.get('*', handler);

const {resolve} = require('path');
var dir_path=__dirname;



function handler (request, response) { //create server
 /* fs.readFile(__dirname + '/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    console.log('dds');
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });*/
  	//console.log(request.method);
 
  	if (request.method === "GET") {
		
        let fname;
        // Look at what resource was requested and match that up
        // with the appropriate file name
        // DO not accept any resource requested because that could open up
        // your server for people to request your actual server code files
         
		
       switch(request.url) {
			 
            case "/":
               
			    fname = dir_path+"/index.html";
                break;

            default:
            fname=dir_path+request.url;
                break;
        }
	   
        if (fname) {
			console.log("get file:"+fname);
            fs.readFile(fname, function(err, data) {
                if (err) {
                    response.writeHead(404);
                    response.end();
				    console.log(err);
                } else {
					response.sendFile(fname);
                   // response.writeHead(200, {'Content-Type': 'text'})
                   // response.write(data)
                   // response.end();
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    }
}


/*
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
//httpServer.listen(8080);
//httpsServer.listen(8443);
*/

app.listen(8182);
/////////////////////////////////////
function update_live_count(ws)
{
	var j=0;
	for(j=0;j<LoginList.length;j++)
	{
		if(ws==LoginList[j].client)
		{
			LoginList[j].live_count=0; 					 
			return;
		}
	}
}


function ws_send(ws,data_tmp)
{
 if(ws.readyState != ws.OPEN){
    console.error('heart not open:Client state is ' +ws.readyState);
  }
  else{
  	ws.send(data_tmp);
  }
}

function ws_close(ws)
{
clientList.splice(clientList.indexOf(ws), 1); 			
	var j=0,i=0;
	for(j=0;j<LoginList.length;j++)
	{
		if(ws== LoginList[j].client)
		{
		     
           // init_db();
            for(i=0;i<usrID_grp.length;i++){
                if(LoginList[j].ID==usrID_grp[i][0]){
                   // console.log(usrID_grp[i][1].split(':')[0]);
                    try{
                        for (var k=0;k<LoginList.length;k++){
                            if (LoginList[k].ID==usrID_grp[i][1].split(':')[0]){
								ws_send(LoginList[k].client,'friends close');
                               // LoginList[k].client.send('friends close');
                                break;
                            }
                        }
                    } catch(e){
                        console.log('user close');
                    }
                    break;
                }
            }
			console.log(LoginList[j].ID + "  closed !")
			clearInterval(LoginList[j].heart);
			LoginList.splice(j, 1);
        }
	}
}


function have_login( ids )
{
	var j=0;
	for(j=0;j<LoginList.length;j++)
	{
		if( ids == LoginList[j].ID+":"+LoginList[j].password)
		{
			if(LoginList[j].client.readyState == LoginList[j].client.OPEN)
			{
				/*try{
                    LoginList[j].client.send("has login by other user" );
                    LoginList[j].client.close();
				} catch(e){
					console.log('this is not tb');
					
				}*/
			}
                //ws_close(LoginList[j].client);
            var wss=LoginList[j].client;
			ws_close(LoginList[j].client);
			wss.close();
			return 1;
         }
	}
	return 0;
}

//bind is or not
function bind_tell(data,ws,db){
/*	db.all("SELECT password,friend0 FROM user",function( err, rows){
        for (var i=0;i<rows.length;i++){
            if ( data == rows[i].password ){
				ws_send(ws,'bind;' + rows[i].password +';'+ rows[i].friend0);
             //   ws.send( 'bind;' + rows[i].password +';'+ rows[i].friend0);
                break;
            }
        }
    });
    */
}



function data_route(data,ws)
{
	update_live_count(ws);

    var add_init = (data+"").split(";");

	if (data == 'get all user form database')
	{

	};

	var pdata=(data+"").split(";");
	var i,j;
	 
	if(pdata[1]=="get live")
	{
		var fri_d=get_all_live(ws,pdata[0]);
		if(fri_d!="")
			ws_send(ws,fri_d);
			//ws.send(fri_d) ;
		return;
	}
	var return_message="login fail;";
	if(pdata[1])
	{
		if(pdata[1].substr(0,5)=="login")
		{
			//console.log("c:"+clientList.length);
			for(i=0;i<clientList.length;i+=1) 
			{  
			
		    	if(ws == clientList[i])
				{
					var user_exist = true;
					for(j=0;j<usrID_list.length;j++)
					{
						if(have_login(pdata[0])==1)
						{
							//ws.send("has login by other user" ) ;
							console.log("has login by other user");
							//return;
						}
						//console.log(usrID_list[j].USER+':'+usrID_list[j].PASSWORD);
						if(pdata[0] == usrID_list[j].USER+':'+usrID_list[j].PASSWORD)
						{
                            user_exist = false;
							var logi=new _Login_List();
							logi.index=i;
							logi.ws=ws;
							logi.friend_ws=null;
							logi.friend_name=usrID_list[j].friend;
							logi.type=usrID_list[j].type;
							if(logi.type=='user')
							{
								logi.name=usrID_list[j].USER;
								logi.password=usrID_list[j].PASSWORD;
							}
							else
							{
								logi.name=usrID_list[j].USER;
								logi.password="";
							}
							
							return_message="login_success;"
							LoginList.forEach(usr_on => {
								if(usr_on.friend_name==logi.name)
								{
									logi.friend_ws=usr_on.ws;
									usr_on.friend_ws=ws;
									return_message +=logi.name+";friends;"+usr_on.name+";is online;";
									
								}
							});

							LoginList.push(logi);
							
							//console.log(LoginList); 
							

                            if(ws.readyState != ws.OPEN){
                                console.error('heart not open:Client state is ' +ws.readyState);
                            }
                            else{
                              /*  //this.clients[i].send(data);.
                                bind_tell(pdata[0],ws,db);
								//ws.send('hi new sheep');
								//ws_send(ws,'hi new sheep');
                               // console.log('hi new sheep');

                                ws_send(ws,"hi sheep"+get_all_live(ws,logi.ID));

                                logi.heart = setInterval(function() {
                                    if(ws)
                                    {
                                        if(ws.readyState != ws.OPEN){
                                            console.error('heart not open:Client state is ' +ws.readyState);
                                        } else{
                                            var tem=get_all_live(ws,logi.ID);
											ws_send(ws,"hi sheep"+tem);
                                           // ws.send("hi sheep"+tem);

                                        }
                                    }
                                }, 5000);*/
                            }
							 
						}
					}
					if ( user_exist )
					{
						ws_send(ws,'user or password is error;fail');
						//ws.send( 'user or password is error;fail');
					}
				}
			}
			console.log(return_message);
			ws.send(return_message);
		}
	  
		else if(pdata[1]=="answer")
		{
			console.log(data); 
			for(j=0;j<LoginList.length;j++)
			{
				 
				if((pdata[2].substr(0,LoginList[j].ID.length))== LoginList[j].ID)
				{
					if(ws.readyState != ws.OPEN){
                                            console.error('heart not open:Client state is ' +ws.readyState);
                                        } else{
						LoginList[j].client.send(data) ;
						LoginList[j].connected_usr=pdata[0];
					}
						return;
				}
			}
			 
		}
		else if((pdata[1]=="call")||(pdata[1]=="hang up")||(pdata[1]=="hang up ok")
			||(pdata[1]=="send data"))
		{
			if(pdata[1]!="send data")
				console.log(data); 
			for(j=0;j<LoginList.length;j++)
			{
				if((pdata[2].substr(0,LoginList[j].ID.length))== LoginList[j].ID)
				{
					ws_send(LoginList[j].client,data);
					//LoginList[j].client.send(data) ;
					return;
				}
			}
		}
		else if(pdata[1]=="live")
		{
			for(j=0;j<LoginList.length;j++)
			{
				var login_str=LoginList[j].ID+"";
				//console.log("lllll"+login_str); 
				//if(LoginList[j].password.length>0)
				//	login_str+=":"+LoginList[j].password;
				if(pdata[0]==login_str)
				{
					LoginList[j].live_count=0; 					 
					return;
				}
			}
		
			
			return;
		}
		else if(pdata[1]=="onPause")
		{
			for(j=0;j<LoginList.length;j++)
			{
				if(pdata[0]== LoginList[j].connected_usr)
				{
					LoginList[j].client.send(data) ;  					 
					return;
				}
			}
			return;
		}
		else if(pdata[1]=="live?")
		{
			for(j=0;j<LoginList.length;j++)
			{
				if(pdata[0]== LoginList[j].ID)
				{
					ws_send(ws,pdata[0]+";alive")
					//ws.send(pdata[0]+";alive" ) ;				 
					return;
				}
			}
			return;
		}
		
	}
	//ws.send("fail" ) ;
	//console.log('fail');
}




////////////////
 
const { MongoClient } = require('mongodb');
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function main_db(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://127.0.0.1:27017/";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);
		//await findOneListingByName(client, "test_user1");
		await client.db("IPC").collection("ipc").find().forEach( function(x)
		{

			console.log("user:"+x.USER);
			usrID_list.push(x);

		});
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main_db().catch(console.error);

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("IPC").collection("ipc").findOne({ USER: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}




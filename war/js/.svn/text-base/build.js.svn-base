/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$('#bunfollow').hover(
            function(){
                    $('#bunfollow').html("Unfollow");
                    $('#bunfollow').css("background","#FF0033");
                }, 
                    function(){
                        $('#bunfollow').html("Following");
                        $('#bunfollow').css("background","#007D08");
                    });
$('#bfollow, #bunfollow').click(function(e){
                   e.preventDefault();
                   $.ajax({
                            type: "post",
                            url: "strategyhandle",
                            dataType: "json",
                            data:"action="+$(e.target).attr('name')+'&strategyid='+currstrategy.strategyid,
                            error:function(){
                                alert("error occured!!!");
                            },
                            success:function(data){
                               // console.log(data);
                                if(data.status == 'success')
                                {
                                    if(data.action == Constants.Strategy.STRATEGY_FOLLOW)
                                    {
                                        currstrategy.relation = Constants.Strategy.FOLLOWER;
                                       // var i = strategylist.length;
                                       $('a[href="'+currstrategy.strategyid+'"]').remove();
                                        $('#ifollow').append('<li><a href="'+currstrategy.strategyid+'"class="menulink">'+currstrategy.strategyname+'</a></li>');
                                        $('#strategymenu div li a').click(function( e ) {
                                                 e.preventDefault();
                                                 var si = $(e.target).attr('href');

                                                 var st = strategylist[si];
                                                 $('#strategytitle').text($(e.target).text());
                                                 loadBuildTabs(st, null);
                                                 return false;
                                           }); /// done with the click function this might go the the global space

                                        strategylist[currstrategy.strategyid] = currstrategy;
                                         addCommonMessage(data.message);
                                        loadBuildTabs(currstrategy , null);

                                    }else if(data.action == Constants.Strategy.STRATEGY_UNFOLLOW)
                                    {
                                        currstrategy.relation = Constants.Strategy.PUBLIC;
                                        var si = $('a[href="'+currstrategy.strategyid+'"]').attr('href');
                                        delete strategylist[si];
                                        addCommonMessage(data.message);
                                        loadBuildTabs(currstrategy,null);
                                        
                                        $('a[href="'+currstrategy.strategyid+'"]').remove();
                                        //console.log('a[href="'+currstrategy.strategyid+'"]');
                                    }

                                }else
                                    addCommonMessage(data.message);
                            }
                        });
                   
                });

function loadBuildTabs(strategy, champ)
 {
     //console.log("new strategy:"+currstrategy.strategyid);

     while($( "#buildtabs" ).tabs("length") > 0)
         $("#buildtabs").tabs("remove", 0);
     $('#bfollow, #bunfollow, #bwatch, #bunwatch, #bnew, #bdelete').hide();
     currstrategy = strategy;
     currchamp = champ;
     
     if(currchamp != null){
         $( "#buildtabs" ).tabs("add", "csignup.html", "Join Championship");
         return;
     
     }
     if(currstrategy == null){
         $('#bnew').show();
         $( "#buildtabs" ).tabs("add", "strategysetup.html", "Setup");
         return;
     }
     //console.log("new strategy:"+currstrategy.strategyname);
     $('#strategytitle').text(strategy.strategyname);

     if(profile != null)
         $('#bnew').show();
     if(strategy.relation == Constants.Strategy.OWNER)
     {
         $( "#buildtabs" ).tabs("add", "summary.html?strategyid="+currstrategy.strategyid, "Summary");
         $( "#buildtabs" ).tabs("add", "enterorder.html?strategyid="+currstrategy.strategyid, "New Order");
         $( "#buildtabs" ).tabs("add", "recentorders.html?strategyid="+currstrategy.strategyid, "Recent Orders");
         $( "#buildtabs" ).tabs("add", "closedtrades.html?strategyid="+currstrategy.strategyid, "Closed Trades");
         $( "#buildtabs" ).tabs("add", "portfolio.html", "Portfolio");
         //$( "#buildtabs" ).tabs("add", "performance.jsp?strategyid="+currstrategy.strategyid, "Performance");
         if(currstrategy.type == Constants.Strategy.TYPE_GENERAL)
            $( "#buildtabs" ).tabs("add", "strategysetup.html?strategyid="+currstrategy.strategyid, "Settings");
         $('#bdelete').show();

     }else if(strategy.relation == Constants.Strategy.FOLLOWER) // if its a follower
       {
         $( "#buildtabs" ).tabs("add", "summary.html?strategyid="+currstrategy.strategyid, "Summary");
         $( "#buildtabs" ).tabs("add", "recentorders.html?strategyid="+currstrategy.strategyid, "Recent Orders");
         $( "#buildtabs" ).tabs("add", "closedtrades.html?strategyid="+currstrategy.strategyid, "Closed Trades");
         $( "#buildtabs" ).tabs("add", "portfolio.html", "Portfolio");
         //$( "#buildtabs" ).tabs("add", "performance.jsp?strategyid="+currstrategy.strategyid, "Performance");
         $('#bunfollow').show();
       } else // all others
       {
            $( "#buildtabs" ).tabs("add", "summary.html?strategyid="+currstrategy.strategyid, "Summary");
            $( "#buildtabs" ).tabs("add", "closedtrades.html?strategyid="+currstrategy.strategyid, "Closed Trades");
           // $( "#buildtabs" ).tabs("add", "performance.jsp?strategyid="+currstrategy.strategyid, "Performance");
           if(currstrategy.type == Constants.Strategy.TYPE_GENERAL){
               $('#bfollow').show();
                if(strategy.relation == Constants.Strategy.WATCHER)
                    $('#bunwatch').show();
                else
                    $('#bwatch').show();
           }
       }
      $( "#buildtabs" ).tabs("select",0);
 }
jQuery('#build').ready(function() {
                $( "#strategymenu" ).accordion({
                        active: 0,
                        fillSpace: true
		});
                $( "#strategymenuResizer" ).hide();
              
                $( "#buildtabs" ).tabs({
                        select:2,
			ajaxOptions: {
				error: function( xhr, status, index, anchor ) {
					$( anchor.hash ).html(
						"Couldn't load this tab. We'll try to fix this as soon as possible. " +
						"If this wouldn't be a demo." );
				}
			}
		});
                ////////// create current championship list in the left panel///////////
                /* if(clist!=null){
                     for(key in clist)
                     {
                           $('#champ-list').append('<div class="ui-widget-content ui-corner-all" style="width:160px;padding:2px;float:left;margin-top:10px;border: 2px solid #13518E;"> <img height="50" style="float: left; padding-right: 0px" src="images/trophy.jpg">  <div style="color: blue;font-size: 1.2em;"> Win Cash Prize for our '+ ""+'.</div> <button onClick="loadChampSignup(' + key + ')">Join Now!</button></div>');
                                
                               
                     }
                 }*/
                 showChampList($('#champ-list'),175);
                 
                 
                if(profile != null)
                {
                    $( "#strategymenuResizer" ).show();
                    if(strategylist!=null)
                      for(key in strategylist)
                      {
                          if(strategylist[key].relation == Constants.Strategy.OWNER){
                              if( Constants.Strategy.TYPE_GENERAL != strategylist[key].type)
                                $('#mychamp').append('<li><a href="'+strategylist[key].strategyid+'"class="menulink">'+strategylist[key].strategyname+'</a></li>');
                              else
                                  $('#mystrategy').append('<li><a href="'+strategylist[key].strategyid+'"class="menulink">'+strategylist[key].strategyname+'</a></li>');
                          }
                          else if(strategylist[key].relation == 1)
                                $('#ifollow').append('<li><a href="'+strategylist[key].strategyid+'"class="menulink">'+strategylist[key].strategyname+'</a></li>');
                          else
                                $('#iwatch').append('<li><a href="'+strategylist[key].strategyid+'"class="menulink">'+strategylist[key].strategyname+'</a></li>');
                      } // end of adding strategy list in the menu

                      $('#strategymenu div li a').click(function( e ) {
                             e.preventDefault();
                             var si = $(e.target).attr('href');

                             var st = strategylist[si];
                             $('#strategytitle').text($(e.target).text());
                             loadBuildTabs(st, null);
                             return false;
                       }); /// done with the click function this might go the the global space
                    
                   
                       if(referred != null)
                       {
                           var s = strategylist[referred.strategyid];
                           if(s!=null)  loadBuildTabs(strategylist[referred.strategyid], null);
                           else         loadBuildTabs(referred, null);
                            referred = null;
                       }
                       else if(referredchamp != null){
                           loadBuildTabs(null, referredchamp);
                           referredchamp = null;
                       }else if(strategylist != null && strategylist.length > 0){

                           for(key in strategylist)
                           {
                                loadBuildTabs(strategylist[key], null);
                                break;
                           }
                       }else 
                           loadBuildTabs(null, null);
                      
                } // end of if profile != null
                else {
                    if(referred != null){
                        loadBuildTabs(referred, null);
                        referred = null;
                    }else if(referredchamp != null){
                           loadBuildTabs(null, referredchamp);
                           referredchamp = null;
                    }else{
                        $('#titleblock').hide();
                        $( "#buildtabs" ).tabs("add", "loginform.html", "Login/Signup", 0);
                    }
                }
                
                 
                 
                 
                 
               // $('#bwatch, #bfollow, #bnew').button();
                $('#bnew').click(function(e){
                   e.preventDefault();
                   $('#bfollow, #bunfollow, #bwatch, #bunwatch, #bdelete').hide();
                   while($( "#buildtabs" ).tabs("length") > 0)
                         $("#buildtabs").tabs("remove", 0);
                        currstrategy = null; // this means we r opening a new strategy and and not strategy settings
                                          // currstrategy will again be set up during loadBuildTabs()
                         $( "#buildtabs" ).tabs("add", "strategysetup.html", "Setup");
                });
                
                $( "#delete-confirm" ).dialog({
			resizable: false,
                        autoOpen: false,
			height:140,
                        position:'right',
			modal: true,
			buttons: {
				"Delete Strategy": function() {
                                        $.ajax({
                                                type: "post",
                                                url: "strategyhandle",
                                                dataType: "json",
                                                data:"action="+Constants.Strategy.DELETE_STRATEGY+'&strategyid='+currstrategy.strategyid,
                                                error:function(){
                                                    alert("error occured!!!");
                                                },
                                                success:function(data){
                                                   // console.log(data);
                                                    if(data.status == 'success')
                                                    {
                                                        var si = $('a[href="'+currstrategy.strategyid+'"]').attr('href');
                                                        delete strategylist[si];
                                                        $('a[href="'+currstrategy.strategyid+'"]').remove();
                                                        addCommonMessage(data.message);
                                                        //$( "#tabsjs" ).tabs("load",2);
                                                        $('#content-area').load("build.html");

                                                    }else
                                                        addCommonMessage(data.message);
                                                }
                                            });
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
                $('#bdelete').click(function(e){
                   e.preventDefault();
                   $('#delete-confirm').dialog('open');
                   $( "#delete-confirm" ).dialog({ position: 'center' });
                   

                });
                
                $('#bunwatch').hover(
                    function(){
                            $('#bunwatch').html("Remove Bookmark");
                            $('#bunwatch').css("background","#FF0033");
                        }, 
                            function(){
                                $('#bunwatch').html("Bookmarked");
                                $('#bunwatch').css("background","#0090DB");
                            });
                
                $('#bwatch, #bunwatch').click(function(e){
                   e.preventDefault();
                   $.ajax({
                            type: "post",
                            url: "strategyhandle",
                            dataType: "json",
                            data:"action="+$(e.target).attr('name')+'&strategyid='+currstrategy.strategyid,
                            error:function(){
                                alert("error occured!!!");
                            },
                            success:function(data){
                               // console.log(data);
                                if(data.status == 'success')
                                {
                                    if(data.action == Constants.Strategy.STRATEGY_WATCH)
                                    {
                                        currstrategy.relation = Constants.Strategy.WATCHER;
                                       // var i = strategylist.length;
                                       
                                        $('#iwatch').append('<li><a href="'+currstrategy.strategyid+'"class="menulink">'+currstrategy.strategyname+'</a></li>');
                                        $('#strategymenu div li a').click(function( e ) {
                                                 e.preventDefault();
                                                 var si = $(e.target).attr('href');

                                                 var st = strategylist[si];
                                                 $('#strategytitle').text($(e.target).text());
                                                 loadBuildTabs(st, null);
                                                 return false;
                                           }); /// done with the click function this might go the the global space

                                        strategylist[currstrategy.strategyid] = currstrategy;
                                         addCommonMessage(data.message);
                                        loadBuildTabs(currstrategy, null);

                                    }else if(data.action == Constants.Strategy.STRATEGY_UNWATCH)
                                    {
                                        currstrategy.relation = Constants.Strategy.PUBLIC;
                                        var si = $('a[href="'+currstrategy.strategyid+'"]').attr('href');
                                        delete strategylist[si];
                                        $('a[href="'+currstrategy.strategyid+'"]').remove();
                                        addCommonMessage(data.message);
                                        loadBuildTabs(currstrategy, null);


                                        //console.log('a[href="'+currstrategy.strategyid+'"]');
                                    }

                                }else
                                    addCommonMessage(data.message);
                            }
                        });

                });
               


                
                
                
    
});

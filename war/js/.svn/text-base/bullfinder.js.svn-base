var strategylist = null;
var currstrategy = null;
var strategyid = 0;
var referred = null;
var referredchamp = null;
var searchresults = null;
var filtermenu = null;
var userid = 0;
var profile = null;
var order = null;
var clist = null;
var ranking= null;
var currchamp = null;
var param = null;
var Constants = {
   ExceptionCode:{
      PUBLIC_ERRORCODE_OFFSET : 1000,
      UNAUTHENTICATED_USER_ERROR :1001
      
   },
   MessageCode : {
        MESSAGE_CODE : "messageCode",
        MESSAGE_SUCCESS : "0",
        MESSAGE_ERROR : "1",
        MESSAGE_SUPPRESS : "2"
    }, 
   Order : {
       ORDER_NEW    : "ordernew",
       ORDER_UPDATE : "orderupdate",
       ORDER_CANCEL : "ordercancel",
       ORDER_LIST   : "orderlist",
       ALL_ORDER_LIST: "allorderlist",
       ORDER_REORDER : "reorder",
       ORDER_PROCESSING : "0",
       ORDER_EXECUTED : "1",
       ORDER_CANCELED : "2",
       ORDER_EXPIRED : "3",
       ORDER_UPDATED : "4",
       ORDER_TRIGGERED : "5",
       ORDER_VOID : "6",
       ORDER_BUY : 0,
       ORDER_SELL: 1,
       ORDER_RCODE :{"Buy":0,"Sell":1},
       PRICE_LIMIT : 0,
       PRICE_STOP : 1,
       PRICE_MARKET : 2,
       PRICE_RCODE :{"Limit":0,"Stop":1,"Market":2},
       TERM_RCODE :{"GFD":0,"GTC":1},
       PRICETYPE_CODE:["Limit","Stop","Market"],
       ORDER_CODE:["Buy","Sell"],
       TERM_CODE:["GTC","GFD"],
       ORDER_STATUS_CODE : ["Processing","Executed","Caneled","Expired","Updated","Triggered"]
       
 },
   Strategy:{

       OWNER : "0",
       FOLLOWER : "1",
       WATCHER : "2",
       PUBLIC : "9",
       TYPE_GENERAL : "0",
       TYPE_CHAMPIONSHIP :"1",
       LISTING_PUBLIC :"0",
       LISTING_PRIVATE:"1",
       BROKERAGE_FEE_FIXED: "0",
       BROKERAGE_FEE_PERCENTAGE:"1",
       NEW_STRATEGY : "new",
       DELETE_STRATEGY : "deletestrategy",
       STRATEGY_LIST : "strategylist",
       STRATEGY_UPDATE : "save",
       STRATEGY_UNFOLLOW : "unfollow",
       STRATEGY_FOLLOW : "follow",
       STRATEGY_UNWATCH : "unwatch",
       STRATEGY_WATCH : "watch"
   },
   Trade : {
       TRADE_LIST : "tradelist",
       TRADE_PORTFOLIO : "portfolio"
   },
   Exchange : {
       EX_RCODE:{"BSE":0,"NSE":1},
       EXCHANGE_CODE:["BSE","NSE",""]
   },
   PublicData: {
       SUMMARY : "summary",
       FILTER_MENU : "filtermenu",
       QUOTE : "quote",
       QUOTE_LIST : "quotelist",
       SYMBOL_LOOKUP : "symbollookup",
       CHAMPIONSHIP_LIST : "championshiplist",
       CHAMPIONSHIP_RANKING : "championshipranking"


   },
   Championship: {
       CHAMP_SIGNUP : "champsignup",
       CHAMP_INFO : "champinfo",
       INACTIVE: 0,
       ACTIVE:1,
       ENDED:2,
       RUNNING: 3
   },
   Profile:{
       PROFILE_UPDATE:"profileupdate",
       PASSWORD_UPDATE:"passwordupdate"
   },
   Currency:{
       INR:0,
       USD:1,
       GBP:2,
       CURRENCY_CODE:["INR","USD","GBP"]
   },
   Market:{
       INDIAN:0,
       US:1,
       UK:2,
       MARKET_CODE:["Indian","US","UK"]
   },
   Instrument:{
       STOCK:0,
       OPTION:1,
       INSTRUMENT_CODE:["Stock","Option","Future","Forex"]
   },
   Exception:{
       ERROR:0,
       SUCCESS:1
   }

}
function bfTrace(msg)
{
if(this.console&&typeof console.log!="undefined")
    console.log(msg);
}
function getKey(field, value){
    if(field == 'currency') return Constants.Currency.CURRENCY_CODE[value];
    if(field == 'market') return Constants.Market.MARKET_CODE[value];
    if(field == 'instrumentoptions') return Constants.Instrument.INSTRUMENT_CODE[value];
    return "N/A";
}
function checkEmpty(obj,tipsobj, text){
    if(obj.val() == ''){
        obj.addClass( "ui-state-error" );
                updateTips( tipsobj, text );
                return false;
        } else {
                return true;
        }
        
    
}
function checkIdentical(obj1, obj2,tipsobj, text){
    if(obj1.val() != obj2.val()){
        obj1.addClass( "ui-state-error" );
        obj2.addClass( "ui-state-error" );
                updateTips( tipsobj, text );
                return false;
        } else {
                return true;
        }
}
function checkRegexp( obj, regexp, tipsobj, text ) {
        if ( !( regexp.test( obj.val() ) ) ) {
                obj.addClass( "ui-state-error" );
                updateTips( tipsobj, text );
                return false;
        } else {
                return true;
        }
}
function checkLength(obj, min, max, tipsobj, text ) {
        if ( obj.val().length > max || obj.val().length < min ) {
                obj.addClass( "ui-state-error" );
                updateTips( tipsobj, text );
                return false;
        } else {
                return true;
        }
}

function checkMin(obj, min, tipsobj, text ) {
        if ( parseFloat(obj.val()) < min ) {
                obj.addClass( "ui-state-error" );
                updateTips( tipsobj, text );
                return false;
        } else {
                return true;
        }
}

function checkInputChange(obj, help_str, tipsobj, text ) {
        if ( obj.val() == help_str ) {
                obj.addClass( "ui-state-error" );
                updateTips( tipsobj, text );
                return false;
        } else {
                return true;
        }
}
// Check the range of the value                
function checkRange( obj, min, max, tipsobj, text ) {
            //  console.log("iniial balance;"+obj.val);
        if ( obj.val() > max || obj.val() < min ) {
          //  console.log("currentvalue:"+o.val());
                obj.addClass( "ui-state-error" );
                updateTips( tipsobj, text );
                return false;
        } else {
                return true;
        }
}
function updateTips( tipsobj, text ) {
        tipsobj.text( text )
            .addClass("ui-state-error")
            .show();
        setTimeout(function() {
                tipsobj.hide();
        }, 5000 );
        return;
}
/*function addCommonMessage(message, type){
    if(message == null)return;
    
        commonmsg = $( "#commonmessage" );
        commonmsg.removeClass( "ui-state-error" ); 
        
        commonmsg.text(message)
                 .addClass("ui-state-highlight ui-corner-all")
                 .show();
        //commonmsg.addClass(clas);
        setTimeout(function() {
                commonmsg.hide();//commonmsg.text( "", 1500);
        }, 5000 );
        return;
}*/
function addCommonMessage( message) {
			//alert("Inside addCommonMessage:"+message);
               
        if(message == null)
            return;
        commonmsg = $( "#commonmessage" );
        commonmsg.removeClass( "ui-state-error" ); 
        commonmsg.text(message)
                 .addClass("ui-state-highlight ui-corner-all")
                 .show();
        //commonmsg.addClass(clas);
        setTimeout(function() {
                commonmsg.hide();//commonmsg.text( "", 1500);
        }, 5000 );
        return;
}
function fieldFormatter(type,str){
      
        switch(type){
                   
                       case "0":
                        return $("<td>").html('<span class="cellformat">'+str+'</span>');
                       case "1":
                        return colorFormat('<span class="cellformat">'+str);
                                
                        case "2":
                            return $("<td>").text('<span class="cellformat">'+str);
                                
                        case "3":
                            return $("<td>").text();
                                
                        default:
                            return $("<td>").text(str);
               
               }
    }
    // parse a date in yyyy-mm-dd format
    function parseDate(input) {
     // var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      //return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
      return new Date(input);
    }
    function dateFormatter(d, offset){
        var date = new Date(d);
        var str = date.getUTCDate()+"/"+parseInt(date.getUTCMonth()+1)+"/"+date.getUTCFullYear() + "<br/>"+date.getUTCHours() +":"+date.getUTCMinutes();
        return str;
        
    }
    function dateFormat( str){
        if(str == null) return "";
        var i = str.lastIndexOf(" ");
        if(i >= 0) str = str.substring(0,i);
        //bfTrace("Date:"+str);
         var d = new Date(parseDate(str));
        return d.toDateString();
    }
    Number.prototype.formatMoney = function(c, d, t){
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
    
    function colorFormat(num){
        if(parseFloat(num) < 0)
           return '<span style="color:red">'+parseFloat(num).toFixed(2)+'</span>';
           
        else
           return '<span style="color:green">'+parseFloat(num).toFixed(2)+'</span>';
    } 



function loadContentTabParam(href, tab){// href is the .html that should be loaded
                                    // tab is the div where content should be loaded
    if(arguments.length >= 3 )// param has been passed
    {   
       // bfTrace(arguments[2]);
        param = arguments[2];
    } else param = null;
    /*
    var i = window.location.href.indexOf('#!');
    if(i > 0){
        if(arguments.length >= 4){// new url pattern
           var url = window.location.href.substring(0,i+3) + arguments[3];
           window.location = url; 
        }else{
           url = window.location.href.substring(0,i+3) + href;
           window.location = url; 
        }
    }*/
    tab.load(href);
}
function loadChampSignup(k)
{
    referredchamp = clist[k];
   /* var currTab = $( "#tabsjs" ).tabs("option","selected");
    if(currTab == 2)
        $( "#tabsjs" ).tabs("load",2);
    else
        $( "#tabsjs" ).tabs("select",2);*/
    $('#content-area').load("build.html");
         return;
}

function loadChampList(){
   // bfTrace("LoadChamplist called");
    if(clist == null){
         $.ajax({
                type: "post",
                url: "publicdatahandle",
                dataType: "json",
                data:'action='+Constants.PublicData.CHAMPIONSHIP_LIST,
                error:function(){
                    addCommonMessage("something bad happened.");
                },
                success:function(data){
                   // console.log(data);
                    if(data.status == 'success')
                    {
                        clist = data.clist;
                        $('#index-champ-list').empty();
                        showChampList($('#index-champ-list'), 325);

                    }
                }
        });
    }else {
        //$('#index-champ-list').empty();
        //console.log("Champ list should be empty!!!");
        showChampList($('#index-champ-list'), 320);
    }

}
function showRanking( obj, data){
    if(data == null) return;
    ranking = new Array();
    var div_obj = $('[id="'+obj+'"]');
    for(var i =0; i < data.length; i++){
        ranking.push( {"strategyid" : data[i].strategyid,
                        "strategyname" : "", 
                        "relation":Constants.Strategy.PUBLIC, 
                        "type":Constants.Strategy.TYPE_CHAMPIONSHIP});

    
      var trow = $("<tr>");                               
      var td = $("<td>");
      // Position zero means ranking is undefined so skip them..
      if(data[i].position != 0){ 
          td.html(data[i].position)
          td.appendTo(trow);



          td = $("<td>");
          td.html('<a href=\"javascript:rankingDetails(' + i + ');\" style="color:#39C;">'+data[i].nickname+"</a>");
          td.appendTo(trow);

          td = $("<td style=\"text-align: right;\">");
          td.html(colorFormat(new Number(data[i].overallreturn).toFixed(2)));
          td.appendTo(trow);
          trow.appendTo(div_obj);
      }
    }
    
}

function loadChampRanking( champid, obj){
    
     $.ajax({
            type: "post",
            url: "publicdatahandle",
            dataType: "json",
            data:'divid='+obj+'&championshipid='+champid+'&action='+Constants.PublicData.CHAMPIONSHIP_RANKING,
            error:function(){
                addCommonMessage("something bad happened.");
            },
            success:function(data){
               // console.log(data);
                if(data.status == 'success')
                {
                  // ranking =  data.ranking;
                  // if(ranking != null)
                    showRanking(obj, data.ranking);

                }
            }
    });

}

function showChampList(obj, width){
     if(clist!=null){
                         obj.empty();
                         for(key in clist)
                         {
                             if(Constants.Championship.ACTIVE==clist[key].status)
                              obj.append('<div class="" style="width:'+width+'px;padding:0px;float:right;margin-top:0px;border-bottom: 0px solid #13518E;"> \n\
                                      <div class="header-green" style="font-size:12px !important;">'+clist[key].name+'</div>\n\
                                    <div class="module" style="float:left;"><div style="padding:3px;"><img height="50" style="float: left; padding-right: 0px" src="images/trophy.jpg">  \n\
                                    <div style="color: #2E6E9E;font-size: 14px;">'+ clist[key].description+'.</div> \n\
                                    <div class="btn-blue" style="font-size:10px !important; margin:5px;float:right;" onClick="loadContentTabParam(\'contest/contest.html\',$(\'#content-area\'),'+key+');">Join Now!</div></div></div></div>');


                         }
                     }
}
 function signUp(e){
                var fullname = $( "#fullname" ),
                nickname = $( "#nickname" ),
                email = $( "#email" ),
                password = $( "#password" ),
                repassword = $( "#repassword" ),
                allFields = $( [] ).add( fullname ).add( nickname ).add( email ).add( password ).add( repassword );
                                    
                allFields.attr('value','');
                $("#signupform").show();
                allFields.attr('value','');
		signupWindow();	
        }  
 function userSignout( origin){
      // $(this).parent().slideUp('fast'); //When the mouse hovers out of the subnav, move it back up  
                        //$('#menu-user').parent().find("ul.subnav").slideUp('fast'); //Drop down the subnav on click  
                        //$('#menu-user').parent().find("ul.subnav").attr("expanded", "false");
                        $.ajax({
                            type: "post",
                            url: "login",
                            dataType: "json",
                            data:'action=signout&origin='+origin,
                            error:function(){
                                addCommonMessage("something bad happened.");
                            },
                            success:function(data){
                                if(data.status == 'success'){
                                    $('#menu-user').hide();
                                    
                                    $('#message').html('');
                                    
                                    $('#menu-home').attr('href','/#!/');
                                    window.location.href = '/#!/';
                                    $('#signup').show();
                                    //$('#un, #pw, #login, #signup, #forgotpwd').show();
                                     //$('#un').attr("value", "dummyemail32@gmail.com");
                                     //$('#pw').attr("value", "dummy");
                                    //$('#toolbar').position({of: '#bb', my: 'right top',at: 'right top', offset: '-20 20', collision:'none none'});
                                    //$('#tabsjs').tabs( "remove" ,3 );
                                    //$('#tabsjs').tabs( "url" , 0 , 'publichome.html' );
                                    strategylist = null;
                                    //clist = null;
                                    currstrategy = null;
                                    //currchamp = null;
                                    strategyid = 0;
                                    referred = null;
                                    referredchamp = null;
                                    searchresults = null;
                                    filtermenu = null;
                                    //userid = 0;
                                    profile = null;
                                   // var ref = $('#tabsjs').tabs('option','selected');
                                    
                                   // $( "#tabsjs" ).tabs("load",ref);
                                    //alert("You have been signed out successfully");
                                    addCommonMessage(data.message);
                                }
                                else
                                    addCommonMessage("something bad happened while you are signing out");

                            }
                        });

 }      
 function login(info){
   //  bfTrace("Login called");
    $.ajax({
            type: "post",
            url: "login",
            dataType: "json",
            data:info,
            error:function(xhr, textStatus, error){
                   // alert(xhr.status);
                    console.log('status: ' + textStatus);
                    console.log(xhr.responseText);
                addCommonMessage("Something bad happened during login.");
            },
            success:function(data){

                if(data.status == 'success')
                {
                    //alert(name + " successful...");
                    profile = data.userProfile;
                    $('#signup').hide();
                    $('#menu-username').html(profile.fullname);
                    //userid = data.userid;
                   // $('#un, #pw, #login, #signup, #forgotpwd').hide();
                   // $("#toolbar").append('<div class="btn-blue" id="signout">Sign out</div>')
                    //$("#signout").button();
                    //$('#toolbar').position({of: '#bb', my: 'right top',at: 'right top', offset: '-20 20', collision:'none none'});
                    $('#menu-user').show();
                    
                    
                  /*  $("ul.topnav li a").click(function(e){
        e.preventDefault();
        var sn = $(this).parent().find("ul.subnav");
        if(sn == null)
            $('#content-area').load($(e.target).attr('href'));
        else{
            var obj = $(this).parent().find("ul.subnav");
            if(obj.attr("expanded") == "false" ){
                $(this).parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click  
                obj.attr("expanded", "true");
        }else
            {
                $(this).parent().find("ul.subnav").slideUp('fast').show(); //Drop down the subnav on click  
                obj.attr("expanded", "false");
            }
        }
    }); /* $("#menu-username").click(function() { //When trigger is clicked...  
        
        $("#menu-username").addClass("nav-ht");
        //Following events are applied to the subnav itself (moving subnav up and down)  
        $(this).parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click  
  
        $(this).parent().hover(function() {  
        }, function(){  
            $(this).parent().find("ul.subnav").slideUp('fast'); //When the mouse hovers out of the subnav, move it back up  
        });  
  
        //Following events are applied to the trigger (Hover events for the trigger)  
        });.hover(function() {  
            $(this).parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click  
            $(this).addClass("subhover"); //On hover over, add class "subhover"  
        }, function(){  //On Hover Out  
            //$(this).parent().find("ul.subnav").slideUp('fast'); //When the mouse hovers out of the subnav, move it back up  
            $(this).removeClass("subhover"); //On hover out, remove class "subhover"  
    });*/
    
   
                    //$('#tabs-1').load("myacc.html");
                    //$('#tabsjs').tabs( "add" ,"myacc.html" , "<div style='padding:7px;font-size:1.5em;'>My Account</div>", 4 );
                    if(data.messageCode != Constants.MessageCode.MESSAGE_SUPPRESS   )
                        addCommonMessage(data.message);
                    $("#signout").click(function(e) {
                      userSignout("user");

                   });// end of signout button
                   
                   strategylist = data.slist;
                   clist = data.clist;
                   $('#menu-home').attr('href','/#!/home/');
                   window.location.href = '/#!/home/';
                   //loadContentTabParam('mytickertrek.html', $('#content-area'));
                   //now we can load some other info as well related to this user
                  /* $.ajax({
                            type: "post",
                            url: "strategyhandle",
                            dataType: "json",
                            data:'action='+Constants.Strategy.STRATEGY_LIST,
                            error:function(){
                                addCommonMessage("something bad happened.");
                            },
                            success:function(data){
                               // console.log(data);
                                if(data.status == 'success')
                                {
                                    strategylist = data.strategylist;
                                    $('#menu-home').attr('href','/#!/home/');
                                    window.location.href = '/#!/home/';
                                    loadContentTabParam('mytickertrek.html', $('#content-area'));
                                    
                                   // $('#content-area').load("build.html");
                                   // var ref = $('#tabsjs').tabs('option','selected');
                                    // $( "#tabsjs" ).tabs("load",ref);
                                    
                                }
                            }
                   });*/


                }
                else if(data.status == 'error'){
                    if(data.errorCode < Constants.ExceptionCode.PUBLIC_ERRORCODE_OFFSET)
                        addCommonMessage(data.message);
                }
            }
    }); // end of login ajax
}


//Courtsey to: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getPathParams() {
   var hashes = null;
   //var t = window.location.href.subwindow.location.href.indexOf('#!/')
   var i = window.location.href.indexOf('#!/');
   if(i >0){
       bfTrace(window.location.href.slice(i));
       hashes = window.location.href.slice(i + 3).split('/');
   }
    return hashes;
}
function setHref(str){
    window.location.href= str;
}
function navigate(){
    var hash = location.hash;
    $('#navmenu-h a').each(function(){
        var that = $(this);
        that[ 'removeClass' ]( 'selected' );
    });
 var path = getPathParams(); 
 if(path != null && path.length > 0 && path[0] != ""){
    
    document.title = 'tickertrek.com';
     if("help" == path[0]){
         if(path.length > 1)loadContentTabParam('help/help.html',$('#content-area'),path[1]);
         else loadContentTabParam('help/help.html',$('#content-area'));
     }else if("home" == path[0]){
         if(profile!=null)
            loadContentTabParam('mytickertrek.html',$('#content-area'));
     }else if("strategy" == path[0]){
         if(path.length > 1)loadContentTabParam('build/build.html',$('#content-area'),path[1]);
         else loadContentTabParam('build/build.html',$('#content-area'));
     }else if("search" == path[0]){
         loadContentTabParam('follow.html',$('#content-area'));
     }else if("contest" == path[0]){
         if(path.length > 1)loadContentTabParam('contest/contest.html',$('#content-area'),path[1]);
         else loadContentTabParam('contest/contest.html',$('#content-area'));
     }else if("user" == path[0]){
         if(path.length > 1)loadContentTabParam('profile/userpage.html',$('#content-area'),path[1]);
         else loadContentTabParam('profile/userpage.html',$('#content-area'));
     }else if("profile" == path[0]){
         loadContentTabParam('profile.html',$('#content-area'));
     }else
         loadContentTabParam('publichome.html',$('#content-area'));
         
 }else
  loadContentTabParam('publichome.html',$('#content-area'));
}

function signupWindow(){
       $( "#dialog-form" ).dialog( "open" );
      // allFields.removeClass( "ui-state-error" );
                 //tips.text('All form fields are required.');
      // return e.preventDefault();
}
function showLoading(obj) {
  var windowHeight = obj.height();
    var windowWidth = obj.width();
  // console.log("Width:"+windowHeight + "Height:"+windowWidth);
   //obj.empty().html('<p><img src="images/ajax-loader.gif" /> Please Wait</p>');
    $('#loading').css({top:windowHeight/2 , left:windowWidth/2});
    obj.append($('#loading'));
    $('#loading').show();
 
}

function hideLoading(obj) {
  $("#loading").hide();
  
}
function  details(i)
{
    loadContentTabParam('build/build.html',$('#content-area'),i);
  
}
function  rankingDetails(i)
{
    if(ranking == null)return;
    
    referred = ranking[i];
   /* var currTab = $( "#tabsjs" ).tabs("option","selected");
    if(currTab == 2)
        $( "#tabsjs" ).tabs("load",2);
    else
        $( "#tabsjs" ).tabs("select",2);*/
    $('#content-area').load("build.html");
         return;
  
}
function changeForgotPWDWindow(email, code){
           $( "#changepwddialog" ).dialog( "open" );
           $( "#pwdemail" ).val(email);
           $( "#pwdcode" ).val(code);
           return;
       }
function forgotPWDWindow(){
        $( "#forgotpwddialog" ).dialog( "open" );
           return;
       }

 function doesCSignedup(name){
                  
                   if(strategylist!=null && profile != null){
                        name = name+" ("+profile.nickname+")";
                      for(key in strategylist)
                      {
                          if(strategylist[key].relation == Constants.Strategy.OWNER &&
                            strategylist[key].strategyname == name){
                                return strategylist[key].strategyid;
                          }
                      }
                   }
                      return 0;
                         
               }
 
$(document).ready(function() {
    $('#menu-user').hide();
    $( "#commonmessage" ).hide();
    //Uttam - this may get out of control, would be better to find a better solution
    //but now i have no other way than to do this
    var urlparams = getUrlVars();
    if(urlparams != null && urlparams["registrationsuccess"] != null){
        //Then dont call the login
    } else {
        login($('#un').serialize()+'&'+$('#pw').serialize()+'&action=login&ref=-1');
    }
        
        
	
        
      

var fbshort = $( "#feedback-short" ),
fblong = $( "#feedback-long" ),
allfbfields = $( [] ).add( fbshort ).add( fblong );
   
		
$( "#feedback-dialog" ).dialog({
			autoOpen: false,
			height: 390,
			width: 560,
			modal: true,
			buttons: {
				"Submit": function() {
                                    
                                    var bValid = true;
                                    allfbfields.removeClass( "ui-state-error" );
                                    bValid = bValid && checkEmpty(fbshort,$('#feedback-validate'), "Please dont keep the feedback field empty!!!");
                                    bValid = bValid && checkInputChange(fbshort, "Give some feedback here...", $('#feedback-validate'),"Please give us some feedback.");
                                    bValid = bValid && checkLength( fbshort, 1, 200, $('#feedback-validate'), "Please use the details field if your feedback is too long." );
                                    bValid = bValid && checkLength( fblong, 0, 1000, $('#feedback-validate'), "Feedback is too long!!!" );
                                    fblong.attr('value','');
                                    if ( bValid ) {
						
						$( this ).dialog( "close" );
                                                $.ajax({
                                                    type: "post",
                                                    url: "genericuseractionauthenticated",
                                                    dataType: "json",
                                                    data:$('#feedback-form').serialize()+'&action=feedback',
                                                    error:function(){
                                                       hideLoading($("#feedback-dialog")); 
                                                       updateTips(tips, "Bad Bad Server!!!");
                                                    },
                                                    success:function(data){
                                                        hideLoading($("#feedback-dialog"));
                                                        if(data.status == 'success')
                                                        addCommonMessage(data.message);
                                                    else
                                                        addCommonMessage(data.message);
                                                    }
                                            });
                                            showLoading($("#feedback-dialog"));

					}
                                },
                                "Cancel":function(){
                                    $( this ).dialog( "close" );
                                    //allfbfields.attr('value','');
                                    allfbfields.removeClass( "ui-state-error" );
                                }
                        }, cancel: function() {
                                $( this ).dialog( "close" );
                                //allfbfields.attr('value','');
                                allfbfields.removeClass( "ui-state-error" );
                        }
});  
$('#feedback-button, #contactus').click(function(e) {
                $('#feedback-short').attr('value', 'Give some feedback here...');
                $('#feedback-long').attr('value', 'Tell us more about it (optional)...');
		
                //$( "#feedback-type" ).buttonset();
                $( "#feedback-dialog" ).dialog( "open" );
                return e.preventDefault();
        });
                
$( "#messge-dialog" ).dialog({
			autoOpen: false,
			height: 250,
			width: 300,
			modal: true,
			buttons: {
				"Continue": function() {
                                    $( this ).dialog( "close" );
                                }
                        }, Cancel: function() {
                            $( this ).dialog( "close" );
                        }, close: function() {
                            var baseurl = window.location.href.toString().split('?');
                            if(baseurl.length > 1 && baseurl[1].length > 0)
                                window.location.replace(baseurl[0]);
                        }
});

$( "#error-dialog" ).dialog({
			autoOpen: false,
			height: 200,
			width: 400,
			modal: true,
                        buttons: {
				"Close": function() {
                                    $( this ).dialog( "close" );
                                }
                        },
			 Cancel: function() {
                            $( this ).dialog( "close" );
                        }, close: function() {
                           $( this ).dialog( "close" );
                        }
});

$( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 430,
			width: 250,
			modal: true,
			buttons: {
				"Create an account": function() {
                                    var fullname = $( "#fullname" ),
                                    nickname = $( "#nickname" ),
                                    email = $( "#email" ),
                                    password = $( "#password" ),
                                    repassword = $( "#repassword" ),
                                    allFields = $( [] ).add( fullname ).add( nickname ).add( email ).add( password ).add( repassword ),
                                    tips = $( "#validateTips" );
                                    var regsuccess = false;

					var bValid = true;
                                        regsuccess = false;
					allFields.removeClass( "ui-state-error" );
                                        bValid = bValid && checkLength( fullname, 2, 50, tips, "Name should be between 2 and 50 letters." );
                                        bValid = bValid && checkLength( nickname, 5, 16, tips, "User Name should be in between 5 and 16 leters." );
					//bValid = bValid && checkLength( username, "Username", 3, 16 );
					bValid = bValid && checkLength( email, 6, 80, tips, "Email address should be in between 6 and 80 letters." );
					bValid = bValid && checkLength( password, 5, 16, tips, "Password should be in between 5 and 16 letters." );
                                        bValid = bValid && checkLength( repassword, 5, 16, tips, "Password should be in between 5 and 16 letters." );

					
                                        bValid = bValid && checkRegexp( fullname, /^[a-z]([0-9a-z_ ])+$/i, tips, "First Name may consist of only a-z." );
                                        bValid = bValid && checkRegexp( nickname, /^[a-z]([0-9a-z_])+$/i, tips,
                                         "User name can only contain a-z 0-9 and _");
					// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
					bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, tips, "Invalid Email address (example address@gmail.com)." );
					bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, tips, "Password field only allow : a-z 0-9" );
                                        bValid = bValid && checkIdentical( password, repassword, tips, "Passwords did not match." );


					if ( bValid ) {
						$.ajax({
                                                    type: "post",
                                                    url: "registeruser",
                                                    dataType: "json",
                                                    data:email.serialize()+'&'+nickname.serialize()+'&'+password.serialize()+'&'+fullname.serialize()+'&action=signup',
                                                    error:function(){
                                                       hideLoading($('#dialog-form'));
                                                       updateTips(tips, "something bad happened.");
                                                    },
                                                    success:function(data){
                                                        hideLoading($('#dialog-form'));
                                                        var reply = data;
                                                        var code = reply.status;
                                                        if(code == 'success')
                                                        {
                                                            $('#dialog-form').dialog('close');
                                                            addCommonMessage("Signup successful. You will recive an email with a link."
                                                                +"To finish registration, please check your inbox and follow the steps.");
                                                            hideLoading($('#dialog-form'));
                                                            regsuccess = true;
                                                        }
                                                        else
                                                            //alert("ERROR:: " + reply.errorCode);
                                                            updateTips(tips,reply.message);
                                                    }
                                            });
                                            showLoading($('#dialog-form'));
                                         }
				},
				Cancel: function() {
                                        var fullname = $( "#fullname" ),
                                        nickname = $( "#nickname" ),
                                        email = $( "#email" ),
                                        password = $( "#password" ),
                                        repassword = $( "#repassword" ),
                                        allFields = $( [] ).add( fullname ).add( nickname ).add( email ).add( password ).add( repassword );

                                        
					$( this ).dialog( "close" );
                                        allFields.removeClass( "ui-state-error" );
                                        allFields.attr('value','');
                                        $( "#validateTips" ).removeClass( "ui-state-error" );
                                        
				}
			},
			close: function() {
                                var fullname = $( "#fullname" ),
                                    nickname = $( "#nickname" ),
                                    email = $( "#email" ),
                                    password = $( "#password" ),
                                    repassword = $( "#repassword" ),
                                    allFields = $( [] ).add( fullname ).add( nickname ).add( email ).add( password ).add( repassword );
                                    
				allFields.removeClass( "ui-state-error" );
                                $( "#validateTips" ).removeClass( "ui-state-error" );
                                allFields.attr('value','');
			}
		});
                
              

     $('#signup').click(signUp);

           
     var fpwdfullname = $( "#fpwdfullname" ),
	pwdemail = $( "#pwdemail" ),
	fpwdemail = $( "#fpwdemail" ),
	pwdpassword = $( "#pwdpassword" ),
	repwdpassword = $( "#repwdpassword" ),
	pwdcode = $("#pwdcode"),
	allPWDFields = $( [] ).add( pwdemail ).add( pwdpassword ).add( repwdpassword ),
	allfPWDFields = $( [] ).add( fpwdfullname ).add( fpwdemail ),
	pwdTips = $( ".validateTipsPWD" ),
        fPWDTips = $( ".validateTipsfPWD" );
    var frgtpwdsuccess = false;
    $( "#forgotpwddialog" ).dialog({
			autoOpen: false,
			height: 250,
			width: 300,
			modal: true,
			buttons: {
				"Submit": function() {
					var bValid = true;
                                        frgtpwdsuccess = false;
					allfPWDFields.removeClass( "ui-state-error" );
                                        bValid = bValid && checkLength( fpwdfullname, 2, 50, fPWDTips, "Name should be between 2 and 50 letters." );
                                        bValid = bValid && checkLength( fpwdemail, 6, 80, fPWDTips, "Email address should be in between 6 and 80 letters." );
                                        bValid = bValid && checkRegexp( fpwdfullname, /^[a-z]([0-9a-z_ ])+$/i, fPWDTips, "First Name may consist of only a-z." );
                                        bValid = bValid && checkRegexp( fpwdemail, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, fPWDTips, "Invalid Email address (example address@gmail.com)." );
                                        if ( bValid ) {
                                                $.ajax({
                                                    type: "post",
                                                    url: "forgotpassword",
                                                    dataType: "json",
                                                    data:fpwdemail.serialize()+'&'+fpwdfullname.serialize()+'&action=forgotpassword',
                                                    error:function(){
                                                       updateTips(fPWDTips, "Something bad has happened.");
                                                    },
                                                    success:function(data){
                                                        var reply = data;
                                                        var code = reply.status;
                                                        if(code == 'success')
                                                        {
                                                            fPWDTips.text("You will recive an email with a link."
                                                                +"To change you password, please check your inbox and follow the steps.");
                                                            var options = {
                                                                    buttons: {
                                                                        "Continue": function () {
                                                                            $(this).dialog('close');
                                                                        }
                                                                    }
                                                                };
                                                                $("#forgotpwdform").hide();
                                                                $("#forgotpwddialog").dialog('option', options);
                                                                $( "#forgotpwddialog" ).dialog( "option", "height", 250 );
                                                                $( "#forgotpwddialog" ).dialog( "option", "width", 400 );
                                                                frgtpwdsuccess = true;
                                                        }
                                                        else
                                                            updateTips(fPWDTips,reply.message);
                                                    }
                                            });
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
                                        allfPWDFields.removeClass( "ui-state-error" );
                                        fPWDTips.removeClass( "ui-state-error" );
                                        if(!frgtpwdsuccess)
                                            fPWDTips.text('All form fields are required.').addClass("validateTipsfPWD");
				}
			},
			close: function() {
				allfPWDFields.removeClass( "ui-state-error" );
                                fPWDTips.removeClass( "ui-state-error" );
                                if(!frgtpwdsuccess)
                                    fPWDTips.text('All form fields are required.').addClass("validateTipsfPWD");
			}
		});
     $( "#changepwddialog" ).dialog({
            autoOpen: false,
            height: 320,
            width: 250,
            modal: true,
            buttons: {
                "Change password": function() {
                    var bValid = true;
                    allPWDFields.removeClass( "ui-state-error" );
                    bValid = bValid && checkLength( pwdemail, 2, 50, pwdTips, "Email address should be in between 6 and 80 letters." );
                    bValid = bValid && checkLength( pwdpassword, 5, 16, pwdTips, "Password should be in between 5 and 16 letters.");
                    bValid = bValid && checkLength( repwdpassword, 5, 16, pwdTips, "Password should be in between 5 and 16 letters.");
                    bValid = bValid && checkRegexp( pwdemail, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, pwdTips, "Invalid Email address (example address@gmail.com)." );
                    bValid = bValid && checkRegexp( pwdpassword, /^([0-9a-zA-Z])+$/, pwdTips, "Password field only allow : a-z 0-9" );
                    bValid = bValid && checkIdentical( pwdpassword, repwdpassword, pwdTips, "Passwords did not match." );
                    if ( bValid ) {
                            $.ajax({
                                type: "post",
                                url: "forgotpassword",
                                dataType: "json",
                                data:pwdemail.serialize()+'&'+pwdcode.serialize()+'&'+pwdpassword.serialize()+'&action=changepassword',
                                error:function(){
                                   updateTips(pwdTips, "Something bad has happened.");
                                },
                                success:function(data){
                                    var reply = data;
                                    var code = reply.status;
                                    if(code == 'success')
                                    {
                                        pwdTips.text("Password has been changed successfully.");
                                        var options = {
                                                buttons: {
                                                    "Continue": function () {
                                                        $(this).dialog('close');
                                                    }
                                                }
                                            };
                                            $("#pwdchangeform").hide();
                                            $("#changepwddialog").dialog('option', options);
                                            $( "#changepwddialog" ).dialog( "option", "height", 250 );
                                            $( "#changepwddialog" ).dialog( "option", "width", 400 );
                                    }
                                    else
                                        updateTips(pwdTips,reply.message);
                                }
                        });
                    }
                },
                Cancel: function() {
                        $( this ).dialog( "close" );
                }
            },
            close: function() {
                var baseurl = window.location.href.toString().split('?');
                if(baseurl.length > 1 && baseurl[1].length > 0)
                    window.location.replace(baseurl[0]);
            }
    });

var urlparams = getUrlVars();
if(urlparams != null && urlparams["registrationsuccess"] != null){
    var regsucess = urlparams["registrationsuccess"];
    if(regsucess == "true") {
        $( "#dlgmessage").text("Registration is successful. You are ready to roll!");
        $( "#messge-dialog" ).dialog( "open" );
    } else if(regsucess == "false"){
        $( "#dlgmessage").text("Your registration was unsuccessful. Your registration link may have been expired.");
        $( "#messge-dialog" ).dialog( "open" );
    }
}
if(urlparams != null && urlparams["pwdchangesuccess"] != null){
    var pwdsucess = urlparams["pwdchangesuccess"];
    if(pwdsucess == "true") {
        $( "#dlgmessage").text("Password change is successful. You are ready to roll!");
        $( "#messge-dialog" ).dialog( "open" );
    } else if(pwdsucess == "false"){
        $( "#dlgmessage").text("Your password change was unsuccessful. The link may have been expired. Please tray again.");
        $( "#messge-dialog" ).dialog( "open" );
    }
}
if(urlparams != null && urlparams["forgotpasswordconfirm"] != null){
    var pwdconfirm = urlparams["forgotpasswordconfirm"];
    if(pwdconfirm == "true" && urlparams['forgotpasswordemail'] != null && urlparams['forgotpasswordcode'] != null) {
        changeForgotPWDWindow(urlparams['forgotpasswordemail'],urlparams['forgotpasswordcode']);
    }
}

$(window).bind('hashchange', function() {
    
 navigate();
});
 navigate();
 
 
  /*
  $('#nav li').hover(
		function () {
			//show its submenu
			$('ul', this).slideDown(100);
 
		}, 
		function () {
			//hide its submenu
			$('ul', this).slideUp(100);			
		}
	);
 
    $("#navmenu-h li a").click(function(e){
        e.preventDefault();
       // console.log("hef="+$(e.target).attr('href'));
        if($(e.target).attr('href') == "#") return;
       // console.log("Main menu item called");
         loadContent($(e.target).attr('href'));
         return;
     
    });
    */
    
          
         

});

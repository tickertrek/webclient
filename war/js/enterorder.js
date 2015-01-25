
jQuery('#enterorder').ready(function() {
    var quote = null;
    var temOrder = null;
    var requested = false;
    $( "#priceblock" ).hide();

    $( "#instrument" ).buttonset();
    $("#symbol,#quantity,#orderid,#price").attr('value', '');
         

    if(order != null){
       // console.log(order);
         $("#symbol").attr('value', order.symbol);
         $('#quantity').attr('value', order.quantity);
         $("#ex").attr('value',order.ex);
         $("#ordertype").attr('value', order.ordertype);
         $("#pricetype").attr('value', order.pricetype);
         $("#term").attr('value', order.term);
         

        if($("#pricetype").attr('value') != Constants.Order.PRICE_MARKET) // market
            {
                $( "#priceblock" ).show();
                $('#price').attr('value', order.price); 
                $('#pricetype').change();
            }

        if(order.hasOwnProperty('orderid')) 
            $("#orderid").attr('value', order.orderid);
        
        getQuote($("#symbol").attr('value'), $("#ex").val());
           
       // temOrder = order;
       // order = null;
    }else{

        getQuote("",$("#ex").val());
    }
    getPower();

    $('#pricetype').change(function(){
       // console.log("Change event fired!!!");
       if($(this).val() == Constants.Order.PRICE_LIMIT) // 0 == limit
       {
           $('#priceblock').show();
           $('#pricetitle').text("Limit Price");

       }
       else if($(this).val() == Constants.Order.PRICE_STOP) // 1 == stop
       {
           $("#priceblock").show();
           $('#pricetitle').text("Stop Price");

       }
       else
       {
           $('#priceblock').hide();
       }
    });
               
             
$( "#symbol" ).autocomplete({
    source: "publicdatahandle?action="+Constants.PublicData.SYMBOL_LOOKUP+"&ex="+$('#ex').val(),
    minLength: 3,
    select: function( event, ui ) {
            /* we can fire some event like get the price for the symbol*/
        if(ui.item){

            event.preventDefault();
            var i = ui.item.value.lastIndexOf(':');
            var j = ui.item.value.lastIndexOf(')');
            if(i != -1 && j != -1){
                var code = ui.item.value.substr(i+1,j-i-1);
                $("#symbol").attr('value',code);
                
                i = ui.item.value.lastIndexOf('(');
                $('#company').text(ui.item.value.substr(0,i-1));
                $('#dq').text('');
            }
            
           
                getQuote($("#symbol").attr('value'), $("#ex").val());
           
        }

    },
    change: function(){
        if(!requested)
        {   
           
                getQuote($("#symbol").attr('value'), $("#ex").val());
          
        }


    }


});

function getQuote(symbol, ex)
{
        requested = true;
        quote = null;
        $.ajax({
        type: "post",
        url: "quotehandle?action="+Constants.PublicData.QUOTE+"&symbol="+symbol+'&ex='+ex,
        dataType: "json",
        error:function(){
            alert("error occured!!!");
        },
        success:function(data){
           // console.log(data);
           //quote = data;
           requested = false;
            if(data.status == 'success')
            {
                quote = data.quote;
                    $('#quote-company').html(quote.name);
                    $('#quote-symbol').html('('+quote.exchange+':'+quote.symbol+')');
                    $('#quote-price').html(quote.price);
                    
                    var change = parseFloat(quote.change);
                    var changeString = "";
                    if(change < 0)
                       changeString = '<span style="color:red">'+quote.change+' ('+quote.percentagechange+')'+'</span>';

                    else
                       changeString = '<span style="color:green">'+quote.change+' ('+quote.percentagechange+')'+'</span>';
                    $('#quote-change').html(changeString);
                    $('#quote-time').html(quote.time);
                    $('#quote-volume').html(quote.volume);
                    $('#quote-range').html(quote.high+'/'+quote.low);
                
             
            }
            else{
                 $('#quote-company').html("Invalid Symbol or NOT Supported");
                    $('#quote-symbol').html("");
                    $('#quote-price').html("");
                    $('#quote-change').html("");
                    $('#quote-time').html("");
                    $('#quote-volume').html("");
                    $('#quote-range').html("");

            }

        }
    });
}

$('#ex').change(function(){
    $( "#symbol" ).autocomplete("option","source","publicdatahandle?action="+Constants.PublicData.SYMBOL_LOOKUP+ "&ex="+ $('#ex').val());
    getQuote($("#symbol").attr('value'), $("#ex").val());
});

$("#submitsignal" ).click(function(e){
                       e.preventDefault();
                       
                       if(quote == null){
                           addCommonMessage( "Invalid Symbol. (Please report us through feedback if you think its a valid symbol.)");
                           return;
                       }
                       
                       
                        var bValid = true;
                        var tips =  $( "#commonmessage" );
                        $('#symbol, #quantity, #price').removeClass( "ui-state-error" );
                        bValid = bValid && checkEmpty($('#symbol'), tips, "Symbol can not be empty.") && checkRegexp( $('#symbol'), /^[a-z]([0-9a-z_])+$/i, tips, "Invalid characters in Symbol." );
                        bValid = bValid && checkEmpty($('#quantity'), tips, "Quantity can not be empty.") && checkRange($('#quantity'),1,100000,tips,"Quantity should be within 1 and 1000000.") &&checkRegexp( $('#quantity'), /^([0-9])+$/i, tips, "Invalid quantity." );
                        // bValid = bValid && checkRegexp( tips, $('#quantity').attr('value'), /^([0-9])+$/, "Quantity should be a positive number." );
                        
                        if($("#pricetype").attr('value') != Constants.Order.PRICE_MARKET){ // not market
                            
                            bValid = bValid && checkEmpty($('#price'), tips, "For Limit and Stop order price field can not be empty.") && checkRegexp( $('#price'), /^([0-9.])+$/i, tips, "Invalid price." )&& checkMin($('#price'),1.0,tips,"Price has to be more than 1.");
                            
                        }

                        if(!bValid) return;
                        
                        
                       
                       
                       
                       
                       var totalPrice =0;
                       if(quote.price != null)
                            totalPrice = parseInt($('#quantity').val())*quote.price;
                       
                       if($("#pricetype").attr('value') != Constants.Order.PRICE_MARKET){ // not market
                           totalPrice = parseInt($('#quantity').val())*parseFloat($('#price').val());
                       }else{
                           $('#price').val(quote.price);
                       }
                       var brokeragefee = currstrategy.brokeragefee * 1.0;
                        bfTrace("bf:"+currstrategy.brokeragefee);
                        bfTrace("tp:"+totalPrice);
                        bfTrace("qt:"+$('#quantity').val());
                        bfTrace("qp:"+quote.price);
                       
                       if(currstrategy.brokeragefeetype == Constants.Strategy.BROKERAGE_FEE_PERCENTAGE)
                           brokeragefee = (currstrategy.brokeragefee * totalPrice)/100;
                      
                      var totalCost = totalPrice + brokeragefee;
                      bfTrace("tc:"+totalCost);
                      
                      if($("#ordertype").attr('value') == Constants.Order.ORDER_BUY && parseFloat(totalCost) > parseFloat(currstrategy.balance))
                      {
                          $('#error-dialog').dialog('open');
                          var msg = "Insufficient fund in strategy <span style='font-size:15px;color:#39C;'>" + currstrategy.strategyname
                              +".</span> <br>"+"Total cost of this order: "+totalCost.toFixed(2) + " "+Constants.Currency.CURRENCY_CODE[currstrategy.currency]
                          +"<br> Current balance in strategy: "+currstrategy.balance + Constants.Currency.CURRENCY_CODE[currstrategy.currency];
                          $('#error-msg').html(msg);
                          return;
                      }
                        $('#order-confirm').dialog('open');
                        $( "#order-confirm" ).dialog({ position: 'center' });
                       
                      // console.log(brokeragefee);
                       $('#oc-symbol').html($('#symbol').val());
                       $('#oc-quantity').html($('#quantity').val());
                       $('#oc-totalprice').html(totalPrice.toFixed(2));
                       $('#oc-brokeragefee').html(brokeragefee.toFixed(2));
                       
                       var str = "You are submitting an Order to <span style='color:#39C; fontsize:15px;'>"+currstrategy.strategyname+"</span>.<br>";
                       if(currstrategy.brokeragefeetype == Constants.Strategy.BROKERAGE_FEE_PERCENTAGE)
                           str += "A brokerage fee of "+currstrategy.brokeragefee+"% will be applied."
                       else
                           str += "A brokerage fee of "+currstrategy.brokeragefee+" "+Constants.Currency.CURRENCY_CODE[currstrategy.currency]+" will be applied."
                      $('#confirm-msg').html(str);
                       
                       
                   });
$( "#order-confirm" ).dialog({
			resizable: false,
                        autoOpen: false,
			minWidth:340,
                        position:'right',
			modal: true,
			buttons: {
				"Confirm Order": function() {
                                    var action = Constants.Order.ORDER_NEW;
                                    if(order != null && order.hasOwnProperty('orderid'))
                                        action = Constants.Order.ORDER_UPDATE;
                                    order = null;    
                                        var req = $('#et').serialize() +'&strategyid='+currstrategy.strategyid+ '&action='+action;
                                       // console.log("req:"+req);
                                    
                                        $.ajax({
                                            type: "post",
                                            url: "orderhandle",
                                            dataType: "json",
                                            data: req,
                                            error:function(){
                                                alert("error occured!!!");
                                            },
                                            success:function(data){
                                               // console.log(data);
                                                if(data.status == 'success')
                                                {
                                                   addCommonMessage( data.message)
                                                   //strategreqylist[currstrategy.strategyid].power =  data.power;
                                                   currstrategy.power = data.power;
                                                   var s = $('#buildtabs').tabs('option','selected');
                                                   $('#buildtabs').tabs('load',s);
                                                   //$('#power div').text(currstrategy.power + " "+currstrategy.currency);

                                                }
                                                else{
                                                    addCommonMessage( data.message);
                                                    var s = $('#buildtabs').tabs('option','selected');
                                                    $('#buildtabs').tabs('load',s);
                                                }

                                            }
                                        });
                                       
                                    $( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
                
function getPower(){
   $.ajax({
        type: "post",
        url: "strategyhandle?action=getpower&strategyid="+currstrategy.strategyid,
        dataType: "json",
        error:function(){
           addCommonMessage("Internal Server Error");
        },
        success:function(data){
           // console.log(data);
           quote = data;
           requested = false;
            if(data.status == 'success')
            {
                $('#power div').text(data.power + " "+Constants.Currency.CURRENCY_CODE[currstrategy.currency]);
                currstrategy.balance = data.power;
                strategylist[currstrategy.strategyid] = currstrategy;
            }
            else{
                if(data.errorCode == Constants.ExceptionCode.UNAUTHENTICATED_USER_ERROR)
                    userSignout("timeout");
                addCommonMessage(data.message);
            }

        }
   });
}




});

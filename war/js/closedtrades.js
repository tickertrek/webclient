$(document).ready(function() {

function formatClosedTrade(data){
    if(data.status=='success'){
        for(var i=0;i<data.rows.length;i++){
           
            //data.rows[i].cell[0] = '<a href="/#!/strategy/'+data.rows[i].cell[0]+'">'+strategylist[data.rows[i].cell[0]].strategyname;
            //
            data.rows[i].cell[0] = data.rows[i].cell[0] + '<br/>'+'@'+Constants.Exchange.EXCHANGE_CODE[data.rows[i].cell[9]];
            data.rows[i].cell[2] = dateFormatter(data.rows[i].cell[2]);
            //data.rows[i].cell[3] =  Constants.Order.PRICETYPE_CODE[data.rows[i].cell[10]] + '<br/>'+'@'+data.rows[i].cell[3] ;
            data.rows[i].cell[4] = Constants.Order.ORDER_CODE[data.rows[i].cell[4]];
            data.rows[i].cell[5] = dateFormatter(data.rows[i].cell[5]);
            data.rows[i].cell[7] = Constants.Order.ORDER_CODE[data.rows[i].cell[7]];
            data.rows[i].cell[8] = colorFormat(data.rows[i].cell[8]);
            //data.rows[i].cell[5] = Constants.Order.TERM_CODE[data.rows[i].cell[5]];
            /*var status = data.rows[i].cell[6];
            data.rows[i].cell[6] = Constants.Order.ORDER_STATUS_CODE[data.rows[i].cell[6]];
            if(status != Constants.Order.ORDER_EXECUTED){
                data.rows[i].cell[7] = "N/A";
                data.rows[i].cell[8] = "N/A";
            }else
            */
                
        }
        return data;
    }else{
       if(data.errorCode == Constants.ExceptionCode.UNAUTHENTICATED_USER_ERROR)
           userSignout("timeout");
       addCommonMessage(data.message); 
    }
}
         $("#closedtrades").flexigrid({
			url: 'publicdatahandle?action='+Constants.Trade.TRADE_LIST+'&strategyid='+currstrategy.strategyid,
                        //url:'data.php',
			dataType: 'json',
                        preProcess: formatClosedTrade,
			colModel : [
                                {display: 'Symbol', name : 'symbol', width : 60, sortable : true, align: 'right'},
                                {display: 'Quantity', name : 'quantity', width : 40, sortable : true, align: 'right'},
				{display: 'Opening<br>Date', name : 'opendate', width : 60, sortable : true, align: 'right'},
                                {display: 'Opening<br>Price', name : 'openprice', width : 80, sortable : true, align: 'right'},
                                {display: 'B/S', name : 'opentype', width : 30, sortable : true, align: 'center'},
                                {display: 'Closing<br>Date', name : 'closedate', width : 60, sortable : true, align: 'right'},
				{display: 'Closing<br>Price', name : 'closeprice', width : 70, sortable : true, align: 'right'},
				{display: 'B/S', name : 'closetype', width : 30, sortable : true, align: 'center'},
				{display: '<span style="color:green">Gain</span>(<span style="color:red">Loss</span>)', name : 'gainloss', width : 60, sortable : true, align: 'right'}				
				],
			searchitems : [
				{display: 'Symbol', name : 'symbol', isdefault: true},
                                {display: 'Close Date', name : 'closedate'}
				],
			sortname: "closedate",
			sortorder: "desc",
			usepager: true,
			title: 'Recently Closed Trades',
			useRp: true,
			rp: 15,
			showTableToggleBtn: true,
			width: 700,
			height : 'auto',
                        nowrap: false
			}
			);
                         


});


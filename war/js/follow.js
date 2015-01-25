



function removeFilter(si)
{
    $( '[id*="'+si+'"]' ).remove();
    $( '[href="'+si+'"]' ).attr("status","inactive");
   // $( "#search" ).position({of: '#filterlist', my: 'left top',at: 'right bottom', offset: '20 10', collision:'none none'});
}

var fetchSummary;

$(document).ready(function(){
    // need this function as its not possible to pass fetchSummary(info) function as the href or onClick handle

// Fetch Summary from the server for a perticular strategy and open the summary dialog on success


    $.ajax({
            type: "post",
            url: "publicdatahandle",
            dataType: "json",
            data:"action="+Constants.PublicData.FILTER_MENU,
            error:function(){
                alert("error occured!!!");
            },
            success:function(data){
            //    console.log(data);
                filtermenu = data;
                $("#filterlist").empty();
                addFilter("annualreturn", "Annual <br>Return");
                addFilter("profitfactor", "Profit <br>Factor");
                addFilter("maxdrawdown", "Max <br>Drawdown");
                //if(data.status == 'success')
                {

                }
            }
   });

                $( "#filter" ).tabs(); // the filter tabs basic and advanced
               // $( "#fm" ).accordion({autoHeight:true, navigation:true});

               // filter menu item click function; add a filter to filter list
                $('#fm div a').click(function( e ) {
                        e.preventDefault();
                        if($(e.target).attr('status') == 'inactive'){ //if the menu item is not active yet
                              var field = $(e.target).attr('href'); // href is the corresponding field in the db
                              var display = $(e.target).attr('display'); // filter title


                              addFilter(field, display);
                              $(e.target).attr('status', 'active');
                              
                          }
                          return false;
                       }); /// done with the click function this might go the the global space

                showChampList($('#f-champ-list'),220);


                function addFilter(field, display)
                {
                             //   console.log(display);

                              $("#filterlist").append(' <div style="clear:both;padding:10px;"><label id="title-'+field+'" style="width:75px;float:left;margin-right:10px">'+display+": "+'</label><input type="text" id="min-'+field+'" style="color:#f6931f; font-weight:bold;float:left;width:30px;margin-right:10px" /><div id="filter-'+field+'" field="'+field+'" display=\''+display+'\' style="width:175px;float:left;margin:5px"></div></input><input type="text" id="max-'+field+'" style="color:#f6931f; font-weight:bold;float:left;width:30px;margin-left:10px;" /><input type="button"  id="remove-'+field+'" value="Remove" onClick="removeFilter(\''+field+'\')" style="float:left; margin-left:10px;"> </div>');
                              // enable range slider

                              var min = Math.floor(filtermenu[field][1]/1);//filtermenu[si][2];
                              var max = Math.ceil(filtermenu[field][0]/1);//filtermenu[si][2];
                              $( '[id="filter-'+field+'"]' ).slider({
                                    range: true,
                                    min: min,
                                    max: max,
                                   // step: filtermenu[field][2],
                                    values: [ min, max ],
                                    slide: function( event, ui ) { // set the text showing the sliders numbers on slide event
                                            $( '[id="min-'+field+'"]' ).val( ui.values[0] );
                                            $( '[id="max-'+field+'"]' ).val( ui.values[1] );
                                    }
                                });
                                $( '[id="min-'+field+'"]' ).val( $( '[id="filter-'+field+'"]' ).slider("values",0) );
                                $( '[id="max-'+field+'"]' ).val( $( '[id="filter-'+field+'"]' ).slider("values",1) );
                                $( '[id="min-'+field+'"]' ).change(function(){$( '[id="filter-'+field+'"]' ).slider("values",0,$(this).val());});
                                $( '[id="max-'+field+'"]' ).change(function(){$( '[id="filter-'+field+'"]' ).slider("values",1,$(this).val());});

                }
                //filtertype == 0 added to the slelect list but not in the WHERE clause
                //filtertype == 1 added to the slelect list and WHERE clause is range
                //filtertype == 2 added to the slelect list and WHERE clause is value
                //filtertype == 3 basic search NOT added to the slelect list but WHERE AND/OR sortorder/type claase is customized basic search

                //$('#asearch, #bsearch').button();
                $('#asearch, #bsearch').click(function(e){
                    e.preventDefault();
                  //  console.log($(this).attr('id'));
                    var model = new Array();
                    var header = new Array();
                    // model is the header for the table; so strategy name is always gonna be there
                    model.push({display: 'Name', name : 'strategyname', width : 100, sortable : true, align: 'right'});
                    header.push( {field: 'strategyname',filtertype:"0"});
                    var dfield = {"annualreturn":{added:false,display:"Annual <br>Return"},"profitfactor":{added:false,display:"Profit <br>Factor"},"maxdrawdown":{added:false,display:"Max<br>Drawdown"},"age":{added:false,display:"Time Tracked<br>(days)"}};
                    //for each active filter
                    if($(this).attr('id') == 'asearch') // only for advanced search
                    $('[id*="filter-"]').each(function(){
                            var self = $(this);
                         //   console.log('frm search:' +self.attr('display'));
                            // header is for the server side filter and data fetching
                            header.push( {field: self.attr('field'),min:self.slider("values",0), max:self.slider("values",1),filtertype:"1"});
                            model.push({display: self.attr('display'), name : self.attr('field'), width : 50, sortable : true, align: 'right'});

                            if( dfield.hasOwnProperty(self.attr('field')) )
                                dfield[self.attr('field')].added = true;

                    });
                    // add some default field set
                    for(key in dfield)
                        {
                            if(!dfield[key].added){ // the default field is not been added
                            model.push({display: dfield[key].display, name : key, width : 60, sortable : true, align: 'right'});
                            header.push( {field: key,filtertype:"0"});
                        }

                    }
                     if($(this).attr('id') == 'asearch') // only for advanced search
                       {
                            // add additional filters for header (server)
                            if($('#af-market').attr('value') != 'all'){
                                header.push( {field: 'market',value:$('#af-market').attr('value'),filtertype:"2"});
                                model.push({display: "Market", name : "market", width : 50, sortable : false, align: 'right'});
                            }
                            if($('#af-instrument').attr('value') != 'all'){
                                header.push( {field: 'instrumentoptions',value:$('#af-instrument').attr('value'),filtertype:"2"});
                                model.push({display: "Trade", name : "instrumentoptions", width : 50, sortable : false, align: 'right'});
                            }
                        
                       }else{   // basic search

                           $('[name*="bs-"]:checked').each(function(){
                               var self = $(this);
                            //    console.log(self.attr('value'));
                                if(self.attr('value')!='all')
                                header.push( {field: self.attr('name'),value:self.attr('value'),filtertype:"3"});
                           })
                           
                         

                         //  createTable(model,'strategysearch?header='+JSON.stringify(header)+'&query='+$('#bs').serialize());
                         
                       }


                   // Any extra field just for colModel i.e. flexitable but not for server side code
                   model.push({display: 'Details', name : 'details', width : 100, sortable : true, align: 'center'});
                   // empty the serach block; destroying the stable and then add it otherwise
                   // the flexitable is not working....
                   $("#strategyblock").empty();
                   $("#strategyblock").append($("<div>").attr("id", "sresults"));
                   //instantiate a flexitable with model and new url
                       createTable(model,'publicdatahandle?action=search&header='+JSON.stringify(header));

                });
                ///////////////////////////////////////////////////////////////////
                // instantiate flexi table with default search criteria and colModel
                $('#bsearch').click();
                
                function createTable(model, searchurl){
                 //   console.log("createTable function called");
                    $("#sresults").flexigrid
			({
			url: searchurl,
			dataType: 'json',
                        preProcess: formatSearchResults,
			colModel:model,
			searchitems : [
				{display: 'Strategy Name', name : 'strategyname', isdefault: true}
				],
			sortname: "strategyname",
			sortorder: "asc",
			usepager: true,
			title: 'Search Results',
			useRp: true,
			rp: 10,
			showTableToggleBtn: true,
			width: 650,
			height:'auto',
                        nomsg:"No Streategy Found...."
			});
                } // end of create table

               
                //createTable([{display: 'Name', name : 'strategyname', width : 100, sortable : true, align: 'right'}, {display: 'Details', name : 'details', width : 100, sortable : true, align: 'center'}], 'strategysearch');
                // Format the search results returned by the servlet
                function formatSearchResults(data){
                         // set the global array
                         searchresults = {};
                         
                            
                         for(var i=0;i<data.rows.length;i++)
                            {
                                // stripping off few info from the search results
                                // "id" is strategyid; cell[0] is always strategyname
                                searchresults[data.rows[i].id] = {"strategyid" : data.rows[i].id ,
                                    "strategyname" : data.rows[i].cell[0], 
                                    "relation":Constants.Strategy.PUBLIC, 
                                    "type":Constants.Strategy.TYPE_GENERAL};
                                //bfTrace("Search:" + searchresults[data.rows[i].id].strategyid);
                                // adding formatting to columns of flexitable
                                data.rows[i].cell.push("<button class=\"ui-state-default ui-corner-all\" style=\"padding:6px;\" onclick=\"setHref('/#!/strategy/" + data.rows[i].id + "')\" >Details</button>");
                            }
                         return data;
                }

                // dialog that shows the summary of a strategy
  /*              $( "#summary-dialog" ).dialog({
			autoOpen: false,
			height: 300,
			width: 900,
			modal: true,
			buttons: {

				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				
			}
		});
           */

});


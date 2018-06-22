var upvote=require('./user_UpvoteValue.js');
var coalMineQuantity; // Quantity of total coal mines in the system
var ironMineQuantity; // Quantity of total iron mines in the system
var oilRigQuantity; // Quantity of total oil rigs in the system 
var coalPrice; // global variable to keep dynamic coal price 
var ironPrice; // global variable to keep dynamic iron price
var oilPrice; // global variable to keep dynamic oil price
var upvotingBotName='dworld-io'; // upvoting bot 
var maxUpvoteValue; // global variable to keep the current upvote value at 100% of the bot.
calculate_ResourcePrice();
 async function calculate_ResourcePrice(){
 	try{
		 var max_sbd=await upvote.get_UserSBD(upvotingBotName); // Async function call to get current voting value at 100% of the bot 
	 
		 /* Below values normally will be taken from the system.
	 	The quantites are cumulative quantites of the resource mines that each user has.
	 	For trial purposes, hypotetical unit values are entered.
	 	*/
	 	coalMineQuantity=1; // trial quantity of coal mines - take from database or JSON memo
	 	ironMineQuantity=1; //trial quantity of iron mines - take from database or JSON memo
	 	oilRigQuantity=1; //trial quantity of oil rigs - take from database or JSON memo
	 
		 var totalCoalProduction=coalMineQuantity*4; // Coal is produced 4 units in 2.4 hours ( if no merit or demerit )
	 	var totalIronProduction=ironMineQuantity*2; // Iron is produced 2 units in 2.4 hours ( if no merit or demerit )
	 	var totalOilProduction=oilRigQuantity; // Oil is produced 4 units in 2.4 hours ( if no merit or demerit )	 	 
	 	var totalUnitProduction=totalCoalProduction+totalIronProduction*4+totalOilProduction*16; // calculate the total units produced - convert to smalles unit-Coal
	 	var unitPrice= max_sbd/totalUnitProduction; // unit price is 100% upvote value of bot divided by total units produced in 2.4 hrs
	 
		coalPrice=unitPrice/2; // set coal price - coal mine price 10 Steem - produced 4 units/2.4 hours - Half of total upvote 
	 	ironPrice=4*coalPrice; // set ironPrice - iron mine price 20 Steem - produced 2 units/2.4 hours ( 4 x coal price )
	 	oilPrice=16*coalPrice; // set oil price - oil rig price 40 Steem - produced 1 units/2.4 hours ( 16 x coal price )
	
	
	 	console.log ("100 coal ",(coalPrice*100).toFixed(3)," SBD - Sales to System");
	 	console.log ("100 iron ",(ironPrice*100).toFixed(3)," SBD - Sales to System");
	 	console.log ("100 oil ",(oilPrice*100).toFixed(3)," SBD - Sales to System");
 	}
	catch(e){
		console.log(e);
	}
 }
 

 
 
	
    
 
 
 
 
 
	 
	
 

exports.get_UserSBD=async function(user){	
	var steem = require('steem'); 
 	try{
		var feed; // variable for feed price
	    var reward_balance; // variable for the current reward balance
	    var recent_claims; // varibale for the recent reward claims
	    var steem_reward_per_vest; // variable to calculate reward per vest as steem
	    var steem_power; // varable for user steem power
	    var delegated_steem_power; // variable for delegated - out steem power
	    var vesting_shares, delegated_vesting_shares, received_vesting_shares, total_vesting_shares, total_vesting_fund_steem = null; 	
		var s; // variable to return the upvote value in sbd.
		
		let globals=await steem.api.getDynamicGlobalPropertiesAsync() ; // async function for global properties	 from Steem API
	    let feed_price=await steem.api.getFeedHistoryAsync() ; // async function to get feed price from Steem API		
	    let result3=await steem.api.getRewardFundAsync('post') ; // async function to read reward fund status from Steem API    
	    var reward_balance = parseFloat(result3.reward_balance.split(" ")[0]); // reward balance as Steem
	    var recent_claims = parseFloat(result3.recent_claims); // Recent claims as vests
	    var rpv = (reward_balance / recent_claims); // steem per vest calculation for upvote value
		
		total_vesting_shares = globals.total_vesting_shares; // total vesting shares
	    total_vesting_fund_steem = globals.total_vesting_fund_steem; // global vesting fund as steem
	    feed = feed_price;// feed price
	    let response=await steem.api.getAccountsAsync([user]) ; // async function to get users values from Steem API	
	    vesting_shares = parseFloat(response[0].vesting_shares.split(' ')[0]);// users vesting shares
	    delegated_vesting_shares = parseFloat(response[0].delegated_vesting_shares.split(' ')[0]); // users vesting shares delegated out
	    received_vesting_shares = parseFloat(response[0].received_vesting_shares.split(' ')[0]);// user vesting shares delegated in
	    steem_power = (vesting_shares + received_vesting_shares - delegated_vesting_shares);// user net effective vests calculation
	    var feed_arr = feed_price.current_median_history.base; // lates feed price
	    feed = feed_arr.split(" ")[0];// stripped from SBD
		
	    var s=((rpv * steem_power * 0.2) * feed * 100000); // users upvote value at 100%	
		return (s);//return the value to calling function.
	}
	catch(e){
		console.log(e);
	}
 }



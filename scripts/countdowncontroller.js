function countdowncontroller() {
}

countdowncontroller.prototype = new countdowncontroller();

countdowncontroller.prototype.init = function () {
	$.ajax({ 
		type: 'GET', 
		url: 'http://pipes.yahoo.com/pipes/pipe.run?_id=7cb5bbbca74e5203f3f669a6112fb01f&_render=json', 
		dataType: 'json',
	    success: this.loadSuccess 
	});
}

countdowncontroller.prototype.loadSuccess = function (data) {
   	$.each(data.value.items[0].standing, function(index, element) {		
		var teams = element.team;
		for(var i = 0; i < teams.length; i++) {
			var team = teams[i];
			var teamMetadata = team['team-metadata'];
			if (teamMetadata) {
			
				var teamKey = teamMetadata['team-key'];	
				var isCubs = teamKey == "MLB.CHC";
			
				if (isCubs) {
					var teamStats = team['team-stats'];
					var gamesPlayed = teamStats['events-played'];
					var outcomeTotals = teamStats['outcome-totals'][0];
					var wins = outcomeTotals.wins;
					var losses = outcomeTotals.losses;	
					var gamesRemaining = 162 - gamesPlayed;
					var lossesNeeded = 100 - losses;

					$('#content').append("The Cubs are " + wins + "-" + losses + ", only " + lossesNeeded + " more to reach 100!");			
				}
			}
		}	
    });
}

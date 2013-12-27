// Critique Aggregation Javascript

$(document).ready(function(){
	
		// color.js object
		var Color = net.brehaut.Color;
		
		// Load Appropriateness JSON
		$.getJSON('custom/principle1.json', function(json) {
			
			// totalCritCount keeps track of the total number of critiques
			var totalCritCount = 0;

			for(var i=0; i<json.statement.length; i++) {
				var statement = json.statement[i];
				var table = $('<div></div>'); // Table that holds statement plus each critique inside
				var collapseTarget = "critiquesApprop" + i; // collapseTarget is the ID for the area holding all the critiques for this statement
				var collapseControlRow = $('<a data-toggle="collapse" class="toggler" data-target="#' + collapseTarget + '"></a>'); // collapseControlRow controls crit collapse and holds the statement name and percentage
				var statementTitleRow = $('<div class="statement row-fluid"></div>');
				
				if (statement.critique.length == 1) {
					var statementName = $('<div class="span6"><i class="icon-chevron-down"></i> ' + statement.name + ' (1 critique)</div>');
				} else {
					var statementName = $('<div class="span6"><i class="icon-chevron-down"></i> ' + statement.name + ' (' + statement.critique.length + ' critiques)</div>');
				}
				var percentage = $('<div class="percentage text-right pull-right">&nbsp;</div>');
			
				// Assigns a width to the percentage div based on the percentage of the statement, multiplied by 4.5
				//  for 100% to reach about halfway through the row
				$(percentage).css('width', statement.percentage*2.25);

				createStatementTitleRow(statementTitleRow, statementName, percentage, collapseControlRow, table);
				var critiquesCollapse = $('<div id="' + collapseTarget + '" class="in collapse approp-collapse"></div>');
				var avgExpTotal = 0; // avgExpTotal keeps track of expertise of each critique within a statement
				
				// creates a row for each critique
				for(var j=0; j<statement.critique.length; j++) {
					var critique = statement.critique[j];
					var commentRow = $('<div class="critique row-fluid"></div>');
					var expertiseScore = critique.expertise;
					var expertiseType = "unknown";

					avgExpTotal = createCritiqueRow(critique, commentRow, expertiseScore, expertiseType, avgExpTotal, critiquesCollapse);
				
					// If there is no comment for the critique, then (no comment) is used
					totalCritCount++;
				}
			
				// Adjust color of valence to reflect expertise
				var valence = statement.valence;
				var hue = determineHue(valence);

				// set lightness based on expertise
				var lightness = 125 - (avgExpTotal/statement.critique.length);
				if(lightness > 85) lightness = 85; // avoid pure white
				var col = Color('hsl('+ hue +', 65%, '+ lightness +'%)');
				$(percentage).css('background-color', col.toCSS());
				$(table).append(critiquesCollapse);
				$('#tab-approp').append(table);
			
			}
		
			// Add name of principle plus collapse/expand all
			var principleName = json.name;
			if (totalCritCount == 1)
				$('#title-approp').append('<div class="span8 principle-name">' + principleName + ' (1 total critique)</div><div class="span4 text-right"><a data-toggle="collapse" data-target=".approp-collapse" href="#">Collapse/Expand All</a></div>');
			else
				$('#title-approp').append('<div class="span8 principle-name">' + principleName + ' (' + totalCritCount + ' total critiques)</div><div class="span4 text-right"><a data-toggle="collapse" data-target=".approp-collapse" href="#">Collapse/Expand All</a></div>');
		});
		
		// Load Layout JSON
		$.getJSON('custom/principle2.json', function(json) {
			
			// totalCritCount keeps track of the total number of critiques
			var totalCritCount = 0;

			for(var i=0; i<json.statement.length; i++) {
				var statement = json.statement[i];
				var table = $('<div></div>'); // Table that holds statement plus each critique inside
				var collapseTarget = "critiquesLayout" + i; // collapseTarget is the ID for the area holding all the critiques for this statement
				var collapseControlRow = $('<a data-toggle="collapse" class="toggler" data-target="#' + collapseTarget + '"></a>'); // collapseControlRow controls crit collapse and holds the statement name and percentage
				var statementTitleRow = $('<div class="statement row-fluid"></div>');

				
				if (statement.critique.length == 1) {
					var statementName = $('<div class="span6"><i class="icon-chevron-down"></i> ' + statement.name + ' (1 critique)</div>');
				} else {
					var statementName = $('<div class="span6"><i class="icon-chevron-down"></i> ' + statement.name + ' (' + statement.critique.length + ' critiques)</div>');
				}
				var percentage = $('<div class="percentage text-right pull-right">&nbsp;</div>');
			
				// Assigns a width to the percentage div based on the percentage of the statement, multiplied by 4.5
				//  for 100% to reach about halfway through the row
				$(percentage).css('width', statement.percentage*2.25);

				createStatementTitleRow(statementTitleRow, statementName, percentage, collapseControlRow, table);
				var critiquesCollapse = $('<div id="' + collapseTarget + '" class="in collapse approp-collapse"></div>');
				var avgExpTotal = 0; // avgExpTotal keeps track of expertise of each critique within a statement
				
				// creates a row for each critique
				for(var j=0; j<statement.critique.length; j++) {
					var critique = statement.critique[j];
					var commentRow = $('<div class="critique row-fluid"></div>');
					var expertiseScore = critique.expertise;
					var expertiseType = "unknown";

					avgExpTotal = createCritiqueRow(critique, commentRow, expertiseScore, expertiseType, avgExpTotal, critiquesCollapse);
				
					// If there is no comment for the critique, then (no comment) is used
					totalCritCount++;
				}
			
				// Adjust color of valence to reflect expertise
				var valence = statement.valence;
				var hue = determineHue(valence);

				// set lightness based on expertise
				var lightness = 125 - (avgExpTotal/statement.critique.length);
				if(lightness > 85) lightness = 85; // avoid pure white
				var col = Color('hsl('+ hue +', 65%, '+ lightness +'%)');
				$(percentage).css('background-color', col.toCSS());
				$(table).append(critiquesCollapse);
				$('#tab-layout').append(table);
			
			}
		
			// Add name of principle plus collapse/expand all
			var principleName = json.name;
			if (totalCritCount == 1)
				$('#title-layout').append('<div class="span8 principle-name">' + principleName +' (1 total critique)</div><div class="span4 text-right"><a data-toggle="collapse" data-target=".layout-collapse" href="#">Collapse/Expand All</a></div>');
			else
				$('#title-layout').append('<div class="span8 principle-name">' + principleName + ' (' + totalCritCount + ' total critiques)</div><div class="span4 text-right"><a data-toggle="collapse" data-target=".layout-collapse" href="#">Collapse/Expand All</a></div>');
		});
		
		
	});

function determineExpertise(expertiseScore) {
		if (expertiseScore < 60 && expertiseScore >= 0)
			return "novice";
		else if (expertiseScore < 75 && expertiseScore >= 60)
			return "moderate";
		else if (expertiseScore >= 75 && expertiseScore < 100)
			return expertiseType = "expert";
};

function createStatementTitleRow(statementTitleRow, statementName, percentage, collapseControlRow, table) {
		$(statementTitleRow).append(statementName).append(percentage);
		$(collapseControlRow).append(statementTitleRow);
		$(table).append(collapseControlRow);
};

function createCritiqueRow(critique, commentRow, expertiseScore, expertiseType, avgExpTotal, critiquesCollapse){
		if (critique.comment == null)
			var comment = $('<div class="span9">(no comment)</div>');
		else
			var comment = $('<div class="span9">&quot;' + critique.comment + '&quot;</div>');
	
		avgExpTotal += expertiseScore;
		expertiseType = determineExpertise(expertiseScore);
	
		var expertise = $('<div class="expertise span3 text-right">' + expertiseType + ' (' + expertiseScore + ') </div>');
		$(commentRow).append(comment).append(expertise);
		$(critiquesCollapse).append(commentRow);

		return avgExpTotal;
};

function determineHue(valence) {
		var hue = 0;
		if(valence == 'positive')
			hue = 91;
		else if (valence == 'negative')
			hue = 360;
		return hue;
}
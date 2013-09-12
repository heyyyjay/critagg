<h1>Critique Aggregation Javascript</h1>
<p>This page demos javascript written by Jay Tolentino to display aggregated information on design critiques for the Crowd Critique (or CrowdCritter) research project at Carnegie Mellon University in August 2013. The following information is all fictional and not respresentative of the information used in the research study.</p>
<p><a href="http://ics.uci.edu/~jltolent/critagg/">View Live Demo</a></p>
<h4>About</h4>
<ul>
	<li>Tabs are of design <strong>principles</strong></li>
	<li>Within each tab are different, general <strong>statements</strong> that could be made by a critiquer.</li>
	<li>Within each statement are the individual <strong>critique comments</strong> related to the statement.</li>
	<li>The <strong>expertise</strong> of the individual critiquer which made that comment is on the right side.</li>
</ul>
<h4>Functionality</h4>
<ul>
	<li>Javascript takes in JSON files for each principle and uses that to populate the tabs.</li>
	<li>The bar on the right represents the amount of comments within a statement, relative to the total number of comments under a principle.</li>
	<li>A green bar represents a design "strength" and the red bar represents a design "weakness".</li>
	<li>The valence of a bar color is equivalent to the average amount of expertise for a statement. A more opaque color means higher average expertise.</li>
</ul>
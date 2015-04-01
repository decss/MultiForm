<!DOCTYPE html>
<html lang="en-US">
<head>
	<title></title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/form.css" type="text/css" />
	<link rel="stylesheet" href="js/jquery-ui.min.css" type="text/css" />
	
	<!-- jQuery -->
	<script src="js/jquery-1.9.1.min.js" type="text/javascript"></script>
	<script src="js/jquery-ui.min.js" type="text/javascript"></script>
	<!-- jQuery easing plugin -->
	<!-- <script src="http://thecodeplayer.com/uploads/js/jquery.easing.min.js" type="text/javascript"></script> -->
	<script src="js/form.js" type="text/javascript"></script>
</head>
<body>



	<!-- progressbar -->
	<div style="margin: 20px auto; width: 600px; text-align: center; min-height: 40px;">
		<div id="multiform-pbar"></div>
	</div>

	<!-- multistep form -->
	<form id="multiform">
		<fieldset>
			<div id="multiform-loading" style="postiton: absolute;"><img src="images/loader-32.gif"><br>Loading page</div>
			<div id="multiform-page"></div>
			<div id="multiform-buttons">
				<!--
				<input type="button" id="msprev" class="action-button" value="Previous">
				<input type="button" id="mssubm" class="action-button" value="Submit">
				<input type="button" id="msnext" class="action-button" value="Next">
				-->
        	</div>
		</fieldset>
	</form>

	


</body>
</html>
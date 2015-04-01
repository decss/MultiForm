<!DOCTYPE html>
<html lang="en-US">
<head>
    <title></title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/msform.css" type="text/css" />
    <!-- <link rel="stylesheet" href="js/jquery-ui.min.css" type="text/css" /> -->
    
    <!-- jQuery -->
    <script src="js/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="js/jquery-ui.min.js" type="text/javascript"></script>
    <!-- jQuery easing plugin -->
    <!-- <script src="http://thecodeplayer.com/uploads/js/jquery.easing.min.js" type="text/javascript"></script> -->
    <script src="js/jquery-ui.msform.js" type="text/javascript"></script>

    <style type="text/css">
        html {
            height: 100%;
            background: url('images/gs.png');
            background: 
                linear-gradient(rgba(196, 102, 0, 0.2), rgba(155, 89, 182, 0.2)), 
                url('images/gs.png');
        }
        body {
            font-family: montserrat, arial, verdana;
        }
    </style>
</head>
<body>



    <!-- progressbar -->
    <div style="margin: 20px auto; min-height: 20px;">
        <div id="msform-pbar"></div>
    </div>

    <!-- multistep form -->
    <form id="msform">
        <fieldset>
            <div id="msform-loading" style="postiton: absolute;"><img src="images/loader-32.gif"><br>Loading page</div>
            <div id="msform-page"></div>
            <div id="msform-buttons">
                
                <input type="button" id="msprev" class="action-button" value="Previous">
                <input type="button" id="msnext" class="action-button" value="Next">
                <input type="button" id="mssubm" class="action-button" value="Submit">
                
            </div>
        </fieldset>
    </form>

    


</body>
</html>
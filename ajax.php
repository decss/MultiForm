<?php
/**
 * Config
 */
sleep(1);



/**
 * 
 */
function jsonResponse($jsonStatus = 'fail', $jsonData = null, $errorMsg = null)
{
    $statusArray = array('success', 'error', 'fail');
    if (!in_array($jsonStatus, $statusArray)) {
        $jsonStatus = 'fail';
    }


    $jsonInfo = array(
        ts          => time(),
        errorMsg    => $errorMsg
    );

    $jsonResponse = array(
        status  => $jsonStatus, 
        info    => $jsonInfo, 
        data    => $jsonData, 
    );

    $json = json_encode($jsonResponse);

    header('Content-Type: application/json');
    echo $json;
    exit;
}

$step    = intval($_GET[step]);
$actions = $_GET[actions];

if ($step < 1) {
    $step = 1;
}
if ($step > 3) {
    $step = 3;
}




$jsonData[config] = array(
    stepsCount  => 3,
    steps => array(
        array(step => 1, title => 'Account Setup', cls => 'active'),
        array(step => 2, title => 'Social Profiles'),
        array(step => 3, title => 'Account Setup'),
        array(step => 4, title => 'step 4'),
        array(step => 5, title => 'step 5'),
    ),
    buttons => array(
        prev    => '<input type="button" id="msprev" class="action-button" value="Previous">',
        subm    => '<input type="button" id="mssubm" class="action-button" value="Submit">',
        next    => '<input type="button" id="msnext" class="action-button" value="Next">',
    ),
    stepsEnabled  => array(
        1 => true,
        2 => true,
        3 => false,
    ),
    stepsRequired => array(
        1 => true,
        2 => true,
        3 => true,
    ),
);



for ($i = 1; $i <= rand(1, 9); $i++) { $br .= '<br>';}
$jsonData[page] = array(
    step  => $step,
    title => 'Step ' . $step,
    descr => 'some step description',
    html  => '<h2 class="fs-title">Create your account</h2>'
           . '<h3 class="fs-subtitle">This is step ' . $step . '</h3>'
           . '<input type="text" name="email" placeholder="Email" />'
           . '<input type="text" name="pass" placeholder="Password" />'
           . '<input type="text" name="cpass" placeholder="Confirm Password" />' . $br,
);



jsonResponse('success', $jsonData);

?>
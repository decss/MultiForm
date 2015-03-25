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

$step = intval($_GET[step]);
if ($step < 1) {
    $step = 1;
}
if ($step > 3) {
    $step = 3;
}

$jsonData[page] = array(
    title => 'Step ' . $step,
    descr => 'some step description',
    html  => '<h2 class="fs-title">Create your account</h2>'
           . '<h3 class="fs-subtitle">This is step ' . $step . '</h3>'
           . '<input type="text" name="email" placeholder="Email" />'
           . '<input type="text" name="pass" placeholder="Password" />'
           . '<input type="text" name="cpass" placeholder="Confirm Password" />',
);
$jsonData[nav] = array(
    html  => '<ul><li class="active" data-step="1">Account Setup</li><li data-step="2">Social Profiles</li><li data-step="3">Personal Details ' . time() . '</li></ul>'
);
// $jsonData[buttons] = array(
//     html  => '<input type="button" id="msprev" class="previous action-button" value="Previous"><input type="button" id="msnext" class="next action-button" value="Next">'
// );
$jsonData[options] = array(
    step  => $step,
    stepsCount => 3,
    stepsEnabled => array(
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

jsonResponse('success', $jsonData);

?>
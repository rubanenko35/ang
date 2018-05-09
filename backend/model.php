<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$data = require __DIR__ . '/data.php';
$count = count($data); //15

function getItems($page, $perPage)
{
    global $data;
    global $count;
    
    $first = ($page - 1) * $perPage;
    if ($first < 0 || $first > $count) {
        return [];
    }

    return array_slice($data, $first, $perPage);
}

function getTotal($page)
{
    global $count;
    return $count;
}


<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require __DIR__ . '/model.php';

$page = isset($_GET['page']) ? $_GET['page'] : 1;
$perPage = isset($_GET['per_page']) ? $_GET['per_page'] : 4;

sleep(2 );

echo json_encode([
    'entities' => getItems($page, $perPage),
    'total' => getTotal($page)
]);

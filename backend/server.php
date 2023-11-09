<?php
// Konfigurasi koneksi
$pdo = null;
$host = "localhost";
$user = "root";
$password = "";
$db = "admin_makkode";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");


function conectar()
{
    try {
        $GLOBALS['pdo'] = new PDO("mysql:host=" . $GLOBALS['host'] . ";dbname=" . $GLOBALS['db'], $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        // echo "Error al conectar con la base " . $db . "<br>";
        echo $e->getMessage(); // Gunakan getMessage() untuk mendapatkan pesan kesalahan
        die();
    }
}

function desconectar()
{
    $GLOBALS['pdo'] = null;
}

// Definisi metode CRUD
function metGet($query)
{
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp->setFetchMode(PDO::FETCH_ASSOC);
        $stmp->execute();
        desconectar();
        return $stmp;
    } catch (Exception $e) {
        print "error" . $e;
    }
}

function metPost($query, $idAI)
{
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp->execute();
        $i_ai = metGet($idAI)->fetch(PDO::FETCH_ASSOC);
        $result = array_merge($i_ai, $_POST);
        $stmp->closeCursor();
        desconectar();
        return $result;
    } catch (Exception $e) {
        print "error" . $e;
    }
}

function metPut($query)
{
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp->execute();
        $result = array_merge($_GET, $_POST);
        $stmp->closeCursor();
        desconectar();
        return $result;
    } catch (Exception $e) {
        print "error" . $e;
    }
}

function metDelete($query)
{
    try {
        conectar();
        $stmp = $GLOBALS['pdo']->prepare($query);
        $stmp->execute();
        $stmp->closeCursor();
        desconectar();
        return $_GET['id'];
    } catch (Exception $e) {
        print "error" . $e;
    }
}

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $query = "SELECT * FROM portfolios WHERE id_project=" . $_GET['id'];
        $result = metGet($query);
        echo json_encode($result->fetch(PDO::FETCH_ASSOC));
    } else {
        $query = "SELECT * FROM portfolios";
        $result = metGet($query);
        echo json_encode($result->fetchAll());
    }
    exit();
}

if (isset($_POST)) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $name_project = $_POST['name_project'];
        $information_project = $_POST['information_project'];
        $img1_project = $_POST['img1_project'];
        $img2_project = $_POST['img2_project'];

        $query = "INSERT INTO portfolios (name_project, information_project, img1_project, img2_project) VALUES ('$name_project', '$information_project', '$img1_project', '$img2_project')";
        $query_ai = "SELECT MAX(id_project) as id FROM portfolios";
        $result = metPost($query, $query_ai);
        echo json_encode($result);

        header("HTTP/1.1 200 OK");
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $id = $_GET['id'];

        // 4 variable ini selalu bernilai undifined value key ketika melakukan put dataz sudah saya cek jangan sampai ada yang typo tapi tetap saja 
        $name_project = $_GET['name_project'];
        $information_project = $_GET['information_project'];
        $img1_project = $_GET['img1_project'];
        $img2_project = $_GET['img2_project'];

        $query = "UPDATE portfolios SET name_project='$name_project', information_project='$information_project', img1_project='$img1_project', img2_project='$img2_project' WHERE id_project='$id'";

        $result = metPut($query);
        echo json_encode($result);

        header("HTTP/1.1 200 OK");
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $id = $_GET['id'];
        $query = "DELETE FROM portfolios WHERE id_project='$id'";
        $result = metDelete($query);
        echo json_encode($result);

        header("HTTP/1.1 200 OK");
        exit();
    }
}

header("HTTP/1.1 400 Bad Request");

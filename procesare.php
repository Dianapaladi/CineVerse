<?php
session_start();
header('Content-Type: application/json');

$fisier_baza_date = "utilizatori.json";

if (!file_exists($fisier_baza_date)) {
    file_put_contents($fisier_baza_date, json_encode([]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $actiune = $_POST['actiune'] ?? '';

    $continut = file_get_contents($fisier_baza_date);
    $utilizatori = json_decode($continut, true) ?? [];

    if ($actiune === 'register') {
        $username = trim($_POST['username'] ?? '');
        $email    = trim($_POST['email'] ?? '');
        $parola   = $_POST['parola'] ?? '';

        if (empty($username) || empty($email) || empty($parola)) {
            echo json_encode(["status" => "eroare", "mesaj" => "Toate câmpurile sunt obligatorii!"]);
            exit;
        }

        foreach ($utilizatori as $u) {
            if ($u['email'] === $email) {
                echo json_encode(["status" => "eroare", "mesaj" => "Acest email este deja înregistrat!"]);
                exit;
            }
        }

        $utilizatori[] = [
            "username" => $username,
            "email"    => $email,
            "parola"   => password_hash($parola, PASSWORD_DEFAULT)
        ];

        file_put_contents($fisier_baza_date, json_encode($utilizatori, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "succes", "mesaj" => "Cont creat cu succes! Te poți autentifica."]);
        exit;

    } elseif ($actiune === 'login') {
        $email  = trim($_POST['email'] ?? '');
        $parola = $_POST['parola'] ?? '';

        if (empty($email) || empty($parola)) {
            echo json_encode(["status" => "eroare", "mesaj" => "Introdu email-ul și parola!"]);
            exit;
        }

        foreach ($utilizatori as $u) {
            if ($u['email'] === $email) {
                if (password_verify($parola, $u['parola'])) {
                    $_SESSION['user'] = [
                        'username' => $u['username'],
                        'email'    => $u['email']
                    ];
                    echo json_encode([
                        "status" => "succes",
                        "mesaj"  => "Autentificare reușită! Bine ai venit, " . $u['username'] . "!"
                    ]);
                    exit;
                }
            }
        }

        echo json_encode(["status" => "eroare", "mesaj" => "Email sau parolă incorectă!"]);
        exit;

    } elseif ($actiune === 'schimba_parola') {
        if (!isset($_SESSION['user'])) {
            echo json_encode(["status" => "eroare", "mesaj" => "Nu ești autentificat!"]);
            exit;
        }

        $parola_veche = $_POST['parola_veche'] ?? '';
        $parola_noua  = $_POST['parola_noua'] ?? '';

        if (empty($parola_veche) || empty($parola_noua)) {
            echo json_encode(["status" => "eroare", "mesaj" => "Completează toate câmpurile!"]);
            exit;
        }

        if (strlen($parola_noua) < 6) {
            echo json_encode(["status" => "eroare", "mesaj" => "Parola nouă trebuie să aibă minim 6 caractere!"]);
            exit;
        }

        $email = $_SESSION['user']['email'];
        $gasit = false;

        foreach ($utilizatori as &$u) {
            if ($u['email'] === $email) {
                if (!password_verify($parola_veche, $u['parola'])) {
                    echo json_encode(["status" => "eroare", "mesaj" => "Parola actuală este incorectă!"]);
                    exit;
                }
                $u['parola'] = password_hash($parola_noua, PASSWORD_DEFAULT);
                $gasit = true;
                break;
            }
        }
        unset($u);

        if ($gasit) {
            file_put_contents($fisier_baza_date, json_encode($utilizatori, JSON_PRETTY_PRINT));
            echo json_encode(["status" => "succes", "mesaj" => "Parola a fost schimbată cu succes!"]);
        } else {
            echo json_encode(["status" => "eroare", "mesaj" => "Utilizatorul nu a fost găsit!"]);
        }
        exit;
    } elseif ($actiune === 'update_profil') {

    if (!isset($_SESSION['user'])) {
        echo json_encode([
            "status" => "eroare",
            "mesaj" => "Nu ești autentificat!"
        ]);
        exit;
    }

    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');

    if (empty($username) || empty($email)) {
        echo json_encode([
            "status" => "eroare",
            "mesaj" => "Completează toate câmpurile!"
        ]);
        exit;
    }

    $emailCurent = $_SESSION['user']['email'];

    foreach ($utilizatori as &$u) {

        if ($u['email'] === $emailCurent) {

            $u['username'] = $username;
            $u['email'] = $email;

            $_SESSION['user'] = [
                'username' => $username,
                'email' => $email
            ];

            file_put_contents(
                $fisier_baza_date,
                json_encode($utilizatori, JSON_PRETTY_PRINT)
            );

            echo json_encode([
                "status" => "succes",
                "mesaj" => "Profil actualizat cu succes!"
            ]);
            exit;
        }
    }

    echo json_encode([
        "status" => "eroare",
        "mesaj" => "Utilizator negăsit!"
    ]);
    exit;
}
elseif ($actiune === 'sterge_cont') {

    if (!isset($_SESSION['user'])) {
        echo json_encode([
            "status" => "eroare",
            "mesaj" => "Nu ești autentificat!"
        ]);
        exit;
    }

    $emailCurent = $_SESSION['user']['email'];

    foreach ($utilizatori as $index => $u) {

        if ($u['email'] === $emailCurent) {

            unset($utilizatori[$index]);

            $utilizatori = array_values($utilizatori);

            file_put_contents(
                $fisier_baza_date,
                json_encode($utilizatori, JSON_PRETTY_PRINT)
            );

            session_unset();
            session_destroy();

            echo json_encode([
                "status" => "succes",
                "mesaj" => "Cont șters cu succes!"
            ]);
            exit;
        }
    }

    echo json_encode([
        "status" => "eroare",
        "mesaj" => "Utilizator negăsit!"
    ]);
    exit;
    } else {
        echo json_encode(["status" => "eroare", "mesaj" => "Acțiune necunoscută!"]);
        exit;
    }

} else {
    echo json_encode(["status" => "eroare", "mesaj" => "Acces nepermis!"]);
}
?>
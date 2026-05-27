<?php

$numere = [11, 7, 5, 18, 24, 9, 13, 3, 20, 11];

$pare = 0;
$impare = 0;

for ($i = 0; $i < count($numere); $i++) {

    if ($numere[$i] % 2 == 0) {
        $pare++;
    } else {
        $impare++;
    }
}

echo "Numere pare: " . $pare . "\n";
echo "Numere impare: " . $impare;

?>
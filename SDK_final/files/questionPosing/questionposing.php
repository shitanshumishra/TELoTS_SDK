

<?php

$y=$_GET["question"];

include("config.php");
$sql = $dbh->prepare("INSERT INTO `questionposing`(`QUESTIONS`) VALUES ('$y')");
 $sql->execute();

?>
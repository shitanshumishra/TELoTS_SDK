<html>
<head>
<style>
table, th, td {
    border: 0.1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 10px;
}
</table>

</style>
</head>
<body><table style="width:100%">
  <tr></tr>
<?php
include("config.php");
 $sql = $dbh->prepare("SELECT * FROM `questionposing` ");
 $sql->execute();
$dbarrayrow=array('question' =>"questionx");
$dbarray=array
          (
           $dbarrayrow
            );
unset($dbarray[0]);
$i=0;
  while($r=$sql->fetch())
  {
  	$i=$i+1;
      $dbarrayrow=array ('question' =>$r['QUESTIONS']);
      array_push($dbarray, $dbarrayrow);
}

foreach ($dbarray as $value) {

?>
  <tr>
    <td><?php print $value['question']; ?></td>
  </tr>
<?php
}
?>
</body>
</html>
<?php
require_once __DIR__ . '/vendor/autoload.php';
use \PhpOffice\PhpWord\Style\Language;

$doc = new \PhpOffice\PhpWord\PhpWord();
$doc->getSettings()->setThemeFontLang(new Language(Language::DE_DE));

$cat1 = htmlspecialchars($_POST['cat1']);
$cat2 = ""; // Set only if required htmlspecialchars($_POST['cat2']);
$header = htmlspecialchars($_POST['header']);
$arti = htmlspecialchars($_POST['arti']);
$comment = htmlspecialchars($_POST['comment']);
$dox = htmlspecialchars($_POST['dox']);
$sender = htmlspecialchars($_POST['sender']);

$section = $doc->addSection();
$section->addText($cat1, array('name' => 'Tahoma', 'size' => 20));
$section->addText('');

if (strcmp($cat1, 'Asylrecht und internationaler Schutz') == 0 || strcmp($cat1, 'Aufenthaltsrecht') == 0 || strcmp($cat1, 'Anwaltspraxis') == 0) {
	$cat2 = htmlspecialchars($_POST['cat2']);
	$section->addText($cat2, array('name' => 'Tahoma', 'size' => 16));
	$section->addText();
}

$section->addText($header, array('name' => 'Times New Roman', 'size' => 14, 'bold' => true));
$section->addText();

$section->addText($arti, array('name' => 'Times New Roman', 'size' => 12));
$section->addText();

if (strcmp($comment, '') != 0) {
	$textrun = $section->addTextRun();
	$textrun->addText('Anmerkung der Redaktion: ', array('name' => 'Times New Roman', 'size' => 12, 'bold' => true, 'italic' => true));
	$textrun->addText($comment, array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
	$section->addText();
}

if (strcmp($dox, '') != 0) {
	$section->addText('Dokument:', array('name' => 'Times New Roman', 'size' => 12, 'bold' => true, 'italic' => true));
	$section->addText();
	$section->addText($dox . ' (Dokument Nr. xxxx)', array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
	if (strcmp($sender, '') != 0) {
		$section->addText('Einsender*in: ' . $sender, array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
	}
}

$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($doc, 'Word2007');
$objWriter->save('artikel.docx');

header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment;filename=\"artikel.docx\"");
header("Location: artikel.docx");
?>

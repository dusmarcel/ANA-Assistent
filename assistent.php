<?php
require_once __DIR__ . '/vendor/autoload.php';
use \PhpOffice\PhpWord\Style\Language;

$doc = new \PhpOffice\PhpWord\PhpWord();
$doc->getSettings()->setThemeFontLang(new Language(Language::DE_DE));

function post_string($key) {
	return isset($_POST[$key]) && $_POST[$key] !== null ? htmlspecialchars($_POST[$key]) : '';
}

function post_string_list($key) {
	if (!isset($_POST[$key]) || !is_array($_POST[$key])) {
		return array();
	}
	$list = array();
	foreach ($_POST[$key] as $value) {
		$list[] = $value !== null ? htmlspecialchars($value) : '';
	}
	return $list;
}

$cat1 = post_string('cat1');
$cat2 = ""; // Set only if required
$header = post_string('header');
$arti = post_string('arti');
$comment = post_string('comment');
$dox_list = post_string_list('dox');
$sender_list = post_string_list('sender');
$sender_label_list = post_string_list('sender_label');

$section = $doc->addSection();
$section->addText($cat1, array('name' => 'Tahoma', 'size' => 20));
$section->addTextBreak();

if (strcmp($cat1, 'Asylrecht und internationaler Schutz') == 0 || strcmp($cat1, 'Aufenthaltsrecht') == 0 || strcmp($cat1, 'Anwaltspraxis') == 0) {
	$cat2 = htmlspecialchars($_POST['cat2']);
	$section->addText($cat2, array('name' => 'Tahoma', 'size' => 16));
	$section->addTextBreak();
}

$section->addText($header, array('name' => 'Times New Roman', 'size' => 14, 'bold' => true));
$section->addTextBreak();

$section->addText($arti, array('name' => 'Times New Roman', 'size' => 12));
$section->addTextBreak();

if (strcmp($comment, '') != 0) {
	$textrun = $section->addTextRun();
	$textrun->addText('Anmerkung der Redaktion: ', array('name' => 'Times New Roman', 'size' => 12, 'bold' => true, 'italic' => true));
	$textrun->addText($comment, array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
	$section->addTextBreak();
}

if (count($dox_list) > 0) {
	$doc_entries = array();
	for ($i = 0; $i < count($dox_list); $i++) {
		$dox = $dox_list[$i];
		$sender = isset($sender_list[$i]) ? $sender_list[$i] : '';
		$sender_label = isset($sender_label_list[$i]) ? $sender_label_list[$i] : 'Einsender*in';
		if (strcmp($dox, '') != 0) {
			$doc_entries[] = array('dox' => $dox, 'sender' => $sender, 'sender_label' => $sender_label);
		}
	}

	if (count($doc_entries) === 1) {
		$section->addText('Dokument:', array('name' => 'Times New Roman', 'size' => 12, 'bold' => true, 'italic' => true));
		$section->addTextBreak();
		$section->addText($doc_entries[0]['dox'] . ' (Dokument Nr. xxxx)', array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
		if (strcmp($doc_entries[0]['sender'], '') != 0) {
			$section->addText($doc_entries[0]['sender_label'] . ': ' . $doc_entries[0]['sender'], array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
		}
		$section->addTextBreak();
	} elseif (count($doc_entries) > 1) {
		$section->addText('Dokumente:', array('name' => 'Times New Roman', 'size' => 12, 'bold' => true, 'italic' => true));
		$section->addTextBreak();
		for ($i = 0; $i < count($doc_entries); $i++) {
			$suffix = chr(ord('a') + $i);
			$section->addText($doc_entries[$i]['dox'] . ' (Dokument Nr. xxxx' . $suffix . ')', array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
			if (strcmp($doc_entries[$i]['sender'], '') != 0) {
				$section->addText($doc_entries[$i]['sender_label'] . ': ' . $doc_entries[$i]['sender'], array('name' => 'Times New Roman', 'size' => 12, 'italic' => true));
			}
			$section->addTextBreak();
		}
	}
}

$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($doc, 'Word2007');
$objWriter->save('artikel.docx');

header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment;filename=\"artikel.docx\"");
header("Location: artikel.docx");
?>

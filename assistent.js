//use strict;

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

document.addEventListener('DOMContentLoaded', function () {
		
	const art = document.querySelector('#art');
	const cat1 = document.querySelector('#cat1');
	const cat2 = document.querySelector('#cat2');
	const header = document.querySelector('#header');
	const arti = document.querySelector('#arti');
	const cnt_arti = document.querySelector('#cnt_arti');
	const comment = document.querySelector('#comment');
	const cnt_comment = document.querySelector('#cnt_comment');	
	const doc = document.querySelector('#doc');
	const sender = document.querySelector('#sender');
	//const add_doc = document.querySelector('#add_doc');
	//const create = document.querySelector('#create');
	const sub = document.querySelector('#sub');
	const html_string = document.querySelector('#html_string');
			
	cat1.addEventListener('change', SetCat2Options);
	arti.addEventListener('input', ArtiInput);
	comment.addEventListener('input', CommentInput);
	//add_doc.addEventListener('click', AddDocClick);	
	//create.addEventListener('click', CreateClick);
	sub.addEventListener('click', SubClick);
	
	function buildHTML () {
			let t = "<h2>" + escapeHtml(cat1.value) + "</h2>";
			if (cat1.selectedIndex == 1 || cat1.selectedIndex == 2 || cat1.selectedIndex == 5) t = t + "<h3>" + escapeHtml(cat2.value) + "</h3>";
			t = t + "<h1>" + escapeHtml(header.value) + "</h1>";
			t = t + "<p>" + escapeHtml(arti.value) + "</p>";
			if (comment.value != "") {
				t = t + '<p style="font-style:italic"><span style="font-weight:bold">Anmerkung der Redaktion:</span> ' + escapeHtml(comment.value) + '</p>';
			}
			if (doc.value != "") {
				t = t + "<p>Dokument:</p>";
				t = t + "<p>" + escapeHtml(doc.value) + " (Dokument Nr. XXXX)</p>";
				if (sender.value != "") {
					t = t + '<p><span style="font-weight:bold">Einsender*in:</span> ' + escapeHtml(sender.value) + '</p>';
				}
			}
			return t;
	}

	function SetCat2Options () {
		cat2.length = 0;
		
		switch (cat1.selectedIndex) {
			
			case 1:
				cat2.options[0] = new Option ("Bitte wählen");
				cat2.options[1] = new Option ("Dublin-Verfahren");
				cat2.options[2] = new Option ("Verfahren vor dem BAMF");
				cat2.options[3] = new Option ("Materielles Asylrecht");
				cat2.options[4] = new Option ("Folge- und Zweitantrag");
				cat2.options[5] = new Option ("Drittstaatenfälle");
				cat2.options[6] = new Option ("Widerruf");
				cat2.options[7] = new Option ("Prozessrecht");
				cat2.options[8] = new Option ("Unionsrecht");
				break;
				
			case 2:
				cat2.options[0] = new Option ("Bitte wählen");
				cat2.options[1] = new Option ("Einreise und Visumsverfahren");
				cat2.options[2] = new Option ("Aufenthaltstitel");
				cat2.options[3] = new Option ("Arbeitserlaubnisrecht");
				cat2.options[4] = new Option ("Duldung");
				cat2.options[5] = new Option ("Aufenthaltsbeendigung");
				cat2.options[6] = new Option ("Abschiebungshaft");
				cat2.options[7] = new Option ("Einreise- und Aufenthaltsverbot");
				cat2.options[8] = new Option ("Irregulärer Aufenthalt");
				cat2.options[9] = new Option ("Freizügigkeitsrecht");
				cat2.options[10] = new Option ("Prozessrecht");
				cat2.options[11] = new Option ("Unionsrecht");				
				break;
			
			case 5:
				cat2.options[0] = new Option ("Bitte wählen");
				cat2.options[1] = new Option ("Gebühren- und Kostenrecht");
				cat2.options[2] = new Option ("Mitteilungen des GA");
				cat2.options[3] = new Option ("Nachrichten und Infos");
				cat2.options[4] = new Option ("Internetlinks/ -angebote / Hinweise auf Publikationen, Fortbildungsveranstaltungen und Seminare");
				break;
		}
	}

	function ArtiInput () {
		
		if (arti.value.length <= 750) {
			
			cnt_arti.style.color = "black";
			cnt_arti.style.fontWeight = "normal";
			cnt_arti.innerText = arti.value.length + ' Zeichen';
			
		} else {

			cnt_arti.style.color = "red";
			cnt_arti.style.fontWeight = "bold";
			cnt_arti.innerText = arti.value.length + ' Zeichen!!!';
			
		}
	}
	
	function CommentInput () {

		if (comment.value.length <= 1250) {
			
			cnt_comment.style.color = "black";
			cnt_comment.style.fontWeight = "normal";
			cnt_comment.innerText = comment.value.length + ' Zeichen';
			
		} else {

			cnt_comment.style.color = "red";
			cnt_comment.style.fontWeight = "bold";
			cnt_comment.innerText = comment.value.length + ' Zeichen!!!';
			
		}		
	}
	
//	function AddDocClick () {
//		
//		alert ("Diese Funktion ist leider noch nicht einsatzbereit....");	
//	}
	
	// function CreateClick () {
				
	// 	if (cat1.selectedIndex == 0) alert ("Bitte wähle eine Kategorie!");
	// 	else if ((cat1.selectedIndex == 1 || cat1.selectedIndex == 2 || cat1.selectedIndex == 5) && cat2.selectedIndex == 0) alert ("Bitte wähle eine Unterkategorie!");
	// 	else if (header.value == "") alert ("Bitte gib eine Überschrift an!");
	// 	else if (arti.value == "") alert ("Bitte gib einen Beitrag ein!");
	// 	else {
	// 		let t = '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />';
	// 		t = "<title>" + escapeHtml(header.value) + "</title></head><body>"
	// 		t = t + buildHTML();
	// 		t = t + "</body></html>";
			
	// 		let w = window.open("about:blank", "Artikel");
	// 		w.document.write(t);
	// 		w.focus();
	// 	}
	// }
	
	function SubClick () {
				
		if (cat1.selectedIndex == 0) alert ("Bitte wähle eine Kategorie!");
		else if ((cat1.selectedIndex == 1 || cat1.selectedIndex == 2 || cat1.selectedIndex == 5) && cat2.selectedIndex == 0) alert ("Bitte wähle eine Unterkategorie!");
		else if (header.value == "") alert ("Bitte gib eine Überschrift an!");
		else if (arti.value == "") alert ("Bitte gib einen Beitrag ein!");
		else {
			html_string.value = buildHTML();
			art.submit();
		}
	}
});
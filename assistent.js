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
	const docs = document.querySelector('#docs');
	const add_doc = document.querySelector('#add_doc');
	const preview = document.querySelector('#preview');
	//const create = document.querySelector('#create');
	const sub = document.querySelector('#sub');
	//const html_string = document.querySelector('#html_string');
			
	cat1.addEventListener('change', SetCat2Options);
	arti.addEventListener('input', ArtiInput);
	comment.addEventListener('input', CommentInput);
	add_doc.addEventListener('click', AddDocClick);	
	preview.addEventListener('click', PreviewClick);
	sub.addEventListener('click', SubClick);

	function buildDocRows () {
		const rows = [];
		const nodes = docs.querySelectorAll('.doc-row');
		nodes.forEach(function (row) {
			const dox = row.querySelector('input[name="dox[]"]');
			const senderLabel = row.querySelector('select[name="sender_label[]"]');
			const sender = row.querySelector('input[name="sender[]"]');
			const doxValue = dox ? dox.value.trim() : '';
			const senderValue = sender ? sender.value.trim() : '';
			const labelValue = senderLabel ? senderLabel.value : 'Einsender*in';
			if (doxValue !== '') {
				rows.push({
					dox: doxValue,
					sender: senderValue,
					label: labelValue
				});
			}
		});
		return rows;
	}

	function buildHTML () {
		let t = '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8" />' +
			'<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
			'<title>Vorschau</title>' +
			'<style>' +
			'body{font-family:"Times New Roman",Times,serif;margin:24px;line-height:1.35;color:#111}' +
			'h1{font-size:14pt;font-weight:bold;margin:0 0 10px 0}' +
			'h2{font-family:Tahoma,Arial,sans-serif;font-size:20pt;margin:0 0 10px 0}' +
			'h3{font-family:Tahoma,Arial,sans-serif;font-size:16pt;margin:0 0 10px 0}' +
			'p{font-size:12pt;margin:0 0 10px 0;white-space:pre-wrap}' +
			'.italic{font-style:italic}' +
			'.bold{font-weight:bold}' +
			'</style></head><body>';

		t += '<h2>' + escapeHtml(cat1.value) + '</h2>';
		if (cat1.selectedIndex == 1 || cat1.selectedIndex == 2 || cat1.selectedIndex == 5) {
			t += '<h3>' + escapeHtml(cat2.value) + '</h3>';
		}
		t += '<h1>' + escapeHtml(header.value) + '</h1>';
		t += '<p>' + escapeHtml(arti.value) + '</p>';

		if (comment.value != '') {
			t += '<p class="italic"><span class="bold">Anmerkung der Redaktion: </span>' + escapeHtml(comment.value) + '</p>';
		}

		const docRows = buildDocRows();
		if (docRows.length === 1) {
			t += '<p class="italic bold">Dokument:</p>';
			t += '<p class="italic">' + escapeHtml(docRows[0].dox) + ' (Dokument Nr. xxxx)</p>';
			if (docRows[0].sender !== '') {
				t += '<p class="italic">' + escapeHtml(docRows[0].label) + ': ' + escapeHtml(docRows[0].sender) + '</p>';
			}
		} else if (docRows.length > 1) {
			t += '<p class="italic bold">Dokumente:</p>';
			for (let i = 0; i < docRows.length; i++) {
				const suffix = String.fromCharCode('a'.charCodeAt(0) + i);
				t += '<p class="italic">' + escapeHtml(docRows[i].dox) + ' (Dokument Nr. xxxx' + suffix + ')</p>';
				if (docRows[i].sender !== '') {
					t += '<p class="italic">' + escapeHtml(docRows[i].label) + ': ' + escapeHtml(docRows[i].sender) + '</p>';
				}
			}
		}

		t += '</body></html>';
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
				cat2.options[8] = new Option ("Prekärer Aufenthalt");
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
	
	function AddDocClick () {
		const row = document.createElement('p');
		row.className = 'doc-row';
		row.innerHTML = '<input type="text" name="dox[]" size="160" placeholder="Dokument" /> ' +
			'<select name="sender_label[]">' +
				'<option value="Einsender*in" selected>Einsender*in</option>' +
				'<option value="Einsenderin">Einsenderin</option>' +
				'<option value="Einsender">Einsender</option>' +
			'</select> ' +
			'<input type="text" name="sender[]" size="80" placeholder="Einsender*in (optional)" /> ' +
			'<button type="button" class="remove-doc">Entfernen</button>';
		docs.appendChild(row);
	}

	docs.addEventListener('click', function (event) {
		if (event.target && event.target.classList.contains('remove-doc')) {
			event.target.parentElement.remove();
		}
	});
	
	function PreviewClick () {
		if (cat1.selectedIndex == 0) alert ("Bitte wähle eine Kategorie!");
		else if ((cat1.selectedIndex == 1 || cat1.selectedIndex == 2 || cat1.selectedIndex == 5) && cat2.selectedIndex == 0) alert ("Bitte wähle eine Unterkategorie!");
		else if (header.value == "") alert ("Bitte gib eine Überschrift an!");
		else if (arti.value == "") alert ("Bitte gib einen Beitrag ein!");
		else {
			const t = buildHTML();
			const w = window.open("about:blank", "Vorschau");
			if (w) {
				w.document.write(t);
				w.document.close();
				w.focus();
			}
		}
	}
	
	function SubClick () {				
		if (cat1.selectedIndex == 0) alert ("Bitte wähle eine Kategorie!");
		else if ((cat1.selectedIndex == 1 || cat1.selectedIndex == 2 || cat1.selectedIndex == 5) && cat2.selectedIndex == 0) alert ("Bitte wähle eine Unterkategorie!");
		else if (header.value == "") alert ("Bitte gib eine Überschrift an!");
		else if (arti.value == "") alert ("Bitte gib einen Beitrag ein!");
		else art.submit();
	}
});

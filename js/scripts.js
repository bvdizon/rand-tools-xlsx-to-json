window.addEventListener('load', (e) => {
	const imageDisplay = document.getElementById('image-display');
	fetch('./Book1.xlsx').then((response) => response.blob()).then((blob) => readXlsxFile(blob)).then((rows) => {
		displayPhotos(rows);
		copyMarkup();
	});

	function displayPhotos(data) {
		data.forEach((item) => {
			if (item[1] == 'Bayside') {
				console.log(item);
				let html = `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${item[4]}" alt="${item[5]}">

                    <div class="card-body">
                        <textarea class="card-text form-control invisible" >
&#x3C;a href=&#x22;${item[4]};&#x22; class=&#x22;glightbox&#x22; rel=&#x22;noindex nofollow&#x22;&#x3E;
&#x3C;img class=&#x22;lazyload&#x22; data-src=&#x22;${item[4]}; alt=&#x22;${item[5]}&#x22;&#x3E;
&#x3C;/a&#x3E;</textarea>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary copy-markup">Copy</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-muted">${item[1]}</small>
                        </div>
                    </div>
                </div>
            </div>       
        `;
				imageDisplay.innerHTML += html;
			}
		});
	}

	function copyMarkup() {
		let copyButtons = document.querySelectorAll('.copy-markup');
		copyButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				console.log(button.parentElement.parentElement.previousElementSibling);
				let markupToCopy = button.parentElement.parentElement.previousElementSibling;
				markupToCopy.select();
				markupToCopy.setSelectionRange(0, 99999);
				navigator.clipboard.writeText(markupToCopy.value);

				let isMarkupCopied = false;
				markupToCopy.insertAdjacentHTML(
					'beforebegin',
					`<div class="alert alert-success" role="alert"> Mark Up has been copied.</div>`
				);
			});
		});
	}
});

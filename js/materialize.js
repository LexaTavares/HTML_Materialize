
function publishEvent(container) {
	if (container !== undefined && container !== null) {
		return false;
	}
	
	let card = new Card('event');
	card.addTitle();
	let id = card.title.trim().split(' ')[0];
	card.addField('date', 'P', 'flow-text');

	let mapContainer = document.createElement('DIV');
	mapContainer.classList.add('s12', 'map-container');
	mapContainer.id = 'map-' + id;

	card.content.appendChild(mapContainer);
	container.appendChild(card.content);
	createMap(id);
	cleanModal('modalEvent');
	return true;

}

function loadFiles(inputFile, container) {
	if (inputFile.files.length > 0) {
		var archivo = inputFile.files[0];
		var lector = new FileReader();
		switch (archivo.type) {
		case 'image/png':
		case 'image/jpeg':
		case 'image/gif':
			lector.readAsDataURL(archivo);
			lector.onload = readImage;
			break;
		case 'text/plain':
			lector.readAsText(archivo, 'UTF-8');
			lector.onload = readText;
			break;
		case 'audio/*':
			lector.readAsArrayBuffer(archivo);
			lector.onload = readAudio;
			break;
		case 'video/mpeg':
		case 'video/mp4':
		case 'video/quicktime':
			lector.readAsArrayBuffer(archivo);
			lector.onload = readVideo;
			break;
		default:
			break;
		}
	}

	function readImage(evento) {
		var image = new Image();
		image.src = evento.target.result;
		image.classList.add('image-responsive', 'col', 's12');
		container.appendChild(image);

	}

	function readAudio(encodedfile) {

		var audio = new Audio();
		audio.setAttribute('src', URL.createObjectURL(archivo));
		audio.controls = true;
		container.appendChild(audio);
	}

	function readVideo(encodedfile) {
		var video = document.createElement('video');
		video.setAttribute('src', URL.createObjectURL(archivo));
		video.controls = true;
		container.appendChild(video);
	}

	function readText(evento) {
		var contenido = evento.target.result;
		document.write(contenido);
	}
};

function publish(container, type) {
	switch (type) {
	case 'text':
		{
			publishText(container);
			break;
		}
	case 'image':
		{
			publishImage(container);
			break;
		}
	case 'event':
		{
			publishEvent(container);
			break;
		}
	case 'media':
		{
			publishMedia(container);
			break;
		}
	default:
		break;
	}
}

$(document).ready(function () {
	$('.modal').modal();

	$('.datepicker').pickadate({
		selectMonths: true, 		selectYears: 15,
		onStart: () => {
			$('.picker').appendTo('body');
		}
	});

	$('[data-publication]').on('click', function (event) {
		let container = document.getElementById('main');
		let type = $(event.currentTarget).data('publication');
		publish(container, type);
	});
});

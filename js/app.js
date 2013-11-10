/*var arr = {};
$('.row > div').each(function(){
    var t = $(this).text().replace(/\s+/g, '').slice( 1 ).split('(');
    arr[ t[0] ] = t[1].slice(3, -2);
});*/

(function() {
    "use strict";

    var iconData = {},
        icon = "",
        canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        size = 128,
        color = '3289c7',
        $canvas = $('#canvas'),
        $base64 = $('#base64'),
        $download = $('#download');

    $.getJSON("js/font-awesome-data.json", function(data) {
        iconData = data;
        $.each( iconData, function( key, value ) {
            var $element = $('<div title="' + key + '" class="icon-preview col-md-2"><i class="fa ' + key + '"></i> ' + key + '</div>');
            $('#icons').append($element);
            if(icon.length === 0) {
                icon = key;
                $element.addClass('active');
            }
        });

        $('.icon-preview').click(function() {
            $('.icon-preview.active').removeClass('active');
            $(this).addClass('active');
            icon = $(this).text().replace(/\s+/g, '');
            $download.attr('download', icon+'.png');
            updateCanvas();
        });
        updateCanvas();
    });

	

	$('#colorpicker').colpick({
		flat: true,
		layout: 'rgbhex',
		submit: false,
		onChange: function(hsb,hex) {
			color = hex;
			updateCanvas();
		}
	});

	$('#sizepicker > input').change(function() {
		size = $(this).val();
		updateCanvas();
	}).val(size);

	function updateCanvas() {
		canvas.width = size;
		canvas.height = size;

		$canvas.css({
			width: size,
			height: size
		});

		context.webkitImageSmoothingEnabled = true;
		context.clearRect ( 0 , 0 , size, size );
		context.font = size+'px FontAwesome';
		context.fillStyle = color;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(String.fromCharCode('0x'+iconData[icon]), size/2, size/2, size);
		$base64.val( canvas.toDataURL("image/png;base64") );
        $download.attr('href', canvas.toDataURL("image/png;base64") );
	};
})();
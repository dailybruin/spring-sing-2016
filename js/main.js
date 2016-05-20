var onlanding = 1;

Handlebars.registerHelper("formatBodyText", function(t) {
	t = t.trim();
	var re = new RegExp('[\r\n]+', 'g');
    // return (t.length>0?'<p>'+t.replace(re,'</p><p>')+'</p>':null);
    if (t.length > 0) {
    	var ret_val = '';
	    for (var i = 0; i < t.length; i++) { 
	        if (t.codePointAt(i) > 127) {
	            ret_val += '&#' + t.codePointAt(i) + ';';
	        } else {
	            ret_val += t.charAt(i);
	        }
	    }
    	return ('<p>'+ret_val.replace(re,'</p><p>')+'</p>');

    }
    else {
    	return (null);
    }
});


$(document).ready(function() {
	// Landing page switcher
	$("#closelanding").click(function() { hide_landing(); });

	$("#landing").swipe({
		swipeUp:function(event,direction,distance,duration) {
			hide_landing();
		},
		swipeDown:function(event,direction,distance,duration) {
			hide_landing();
		}
	})

	$('#landing').on('DOMMouseScroll mousewheel swipedown', function ( event ) {
	  if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
	    hide_landing();
	  }
	});

	$("#toptitle").click(function() {
		console.log("hi");
		$("#landing").slideDown(700);
		$("#landing").children().each(function() {
			$(this).fadeIn(500);
		})
		$("#top-div").hide();
	});
	

	$(document).foundation();
});

function isSmall() {
  return matchMedia(Foundation.media_queries.small).matches &&
    !matchMedia(Foundation.media_queries.medium).matches;
}

function isMedium() {
  return matchMedia(Foundation.media_queries.medium).matches &&
    !matchMedia(Foundation.media_queries.large).matches;
}

function hide_landing()
{
	$("#landing").slideUp(700);
	$("#landing").children().each(function() {
		$(this).fadeOut(500);
	})
	$("#top-div").show();
}

function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
}
window.onload = function () { 
	addRules();
}

document.addEventListener( "DOMNodeInserted", addRules );

function addRules() {
	
  var	baseLeft = (getCookie('baseLeft') === undefined ) ? 'calc(30% - 15px)': 'calc(' + getCookie('baseLeft') + '% - 15px)' ,
		baseRight = (getCookie('baseRight') === undefined ) ? '70%': getCookie('baseRight') + '%',
		
		client_body = document.getElementById('client_body'),
		col_messages = document.getElementById('col_messages'),
        col_flex = document.getElementById('col_flex');

	if (client_body !== undefined){
 	
	}

	if (col_messages !== undefined){
  }

	if (col_flex !== undefined){

  }
    
  if (col_messages !== undefined && document.getElementsByClassName('slider')[0] === undefined){
    col_messages.insertAdjacentHTML("afterEnd", "<div class='slider' style='height: 100%; width: 15px; cursor: col-resize;'></div>");
  }
    
  if (document.getElementsByClassName('slider')[0] !== undefined){
    resize();
  }
}


function resize(){
	var sliderElem = document.getElementById('client_body'),
		thumbElem = document.getElementsByClassName('slider')[0],
		
		col_messages = document.getElementById('col_messages'),
        col_flex = document.getElementById('col_flex');

	thumbElem.onmousedown = function(e) {
		var thumbCoords = getCoords(thumbElem),
			shiftX = e.pageX - thumbCoords.left,
			sliderCoords = getCoords(sliderElem);

      document.onmousemove = function(e) {
        var newLeft = e.pageX - shiftX - sliderCoords.left;

        if (newLeft < 0) {
          newLeft = 0;
        }
        
        var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        var baseLeft = (newLeft/(sliderElem.offsetWidth/100)),
          baseRight = 100-(newLeft/(sliderElem.offsetWidth/100));

        if (col_messages !== undefined){
         // col_messages.style.flexBasis = 'calc(' + baseLeft + '% - 15px)';
        }

        if (col_flex !== undefined){
          col_flex.style.flexBasis = baseRight + '%';
        }

        setCookie('baseLeft', baseLeft, {expires: 3600 * 24 * 31 * 12, path: '/'});
        setCookie('baseRight', baseRight, {expires: 3600 * 24 * 31 * 12, path: '/'});
      }

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };

      return false; 
    };

    thumbElem.ondragstart = function() {
      return false;
    };

    function getCoords(elem) { 
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    }
}


function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}


function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

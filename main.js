window.onload = function () { 
	addRules();
}

document.addEventListener( "DOMNodeInserted", addRules );

function addRules() {
	
  var baseLeft = (getCookie('baseLeft') === undefined ) ? 'calc(30% - 15px)': 'calc(' + getCookie('baseLeft') + '% - 15px)' ,
		baseRight = (getCookie('baseRight') === undefined ) ? '70%': getCookie('baseRight') + '%',
		
		taskslist = document.getElementsByClassName('MyTasksPageView-list')[0],
		projectlist = document.getElementsByClassName('ProjectPageView-list')[0],
		listMountNode = document.getElementsByClassName('MyTasksPageView-listMountNode')[0], 
		
		definelist = ( taskslist || projectlist || listMountNode ),
		gridPane = document.getElementsByClassName('PotListPage-gridPane')[0],
    detailsPane = document.getElementsByClassName('PotListPage-detailsPane')[0];

	if (definelist !== undefined){
		definelist.style.justifyContent = 'Left';  	
	}

	if (gridPane !== undefined){
		gridPane.style.flexBasis = baseLeft;
		gridPane.style.minWidth = '320px';
  }

	if (detailsPane !== undefined){
    detailsPane.style.flexBasis = baseRight;
    detailsPane.style.marginLeft = '0';
    detailsPane.style.minWidth = '420px';
  }
    
  if (gridPane !== undefined && document.getElementsByClassName('slider')[0] === undefined){
    gridPane.insertAdjacentHTML("afterEnd", "<div class='slider' style='height: 100%; width: 15px; cursor: col-resize;'></div>");
  }
    
  if (document.getElementsByClassName('slider')[0] !== undefined){
    resize();
  }
}


function resize(){
	var taskslist = document.getElementsByClassName('MyTasksPageView-list')[0],
		projectlist = document.getElementsByClassName('ProjectPageView-list')[0],
		listMountNode = document.getElementsByClassName('MyTasksPageView-listMountNode')[0], 
	
		sliderElem = ( taskslist || projectlist || listMountNode ),
		thumbElem = document.getElementsByClassName('slider')[0],
		
		gridPane = document.getElementsByClassName('PotListPage-gridPane')[0],
    detailsPane = document.getElementsByClassName('PotListPage-detailsPane')[0];

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

        if (gridPane !== undefined){
          gridPane.style.flexBasis = 'calc(' + baseLeft + '% - 15px)';
        }

        if (detailsPane !== undefined){
          detailsPane.style.flexBasis = baseRight + '%';
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

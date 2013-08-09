function loadScript(url, callback)
{
   var head = document.getElementsByTagName('script')[0]; 
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.parentNode.insertBefore(script, head);
   //head.appendChild(script);
}

var loadMuzzleyLib = function() {
	loadScript("muzzley-client-0.1.0.min.js",loadMuzzleyWidget);
};

var loadMuzzleyWidget = function() {

var debug=false;

$(document).ready(function(){

// MUZZLEY
  var myAppToken = 'cfba161e72f9ee7a';

   muzzley.on('error', function(err) {
        console.log("Error: " + err);
      });

      muzzley.connectApp(myAppToken, function(err, activity) {
        if (err) return console.log("Connect error: " + err);

        // Usually you'll want to show this Activity's QR code image
        // or its id so that muzzley users can join.
        // They are in the `activity.qrCodeUrl` and `activity.activityId`
        // properties respectively.
        if (debug) console.log(activity);
        document.getElementById('qrCodeContainer').src = activity.qrCodeUrl;

        activity.on('participantQuit', function(participant) {
          // A participant quit
        });

        activity.on('participantJoin', function(participant) {
          // A participant joined. Tell him to transform into a gamepad.
          participant.changeWidget('swipeNavigator', function (err) {
            if (err) return console.log("ChangeWidget error: " + err );
          });

          participant.on('action', function (action) {
            // The action object represents the participant's interaction.
            // In this case it might be "button 'a' was pressed".
            if (debug) console.log(action);
			
			// 270 - 40 - down - b
			// 0 - 39 - right - c
			// 90 - 38 - up - d
			// 180 - 37 - left - a
			var dist = 200;
			
			if(action.c == 'swipe' && action.v == 'l') scroll(dist,0);
			else if(action.c == 'swipe' && action.v == 'u' ) scroll(0,dist);
			else if(action.c == 'swipe' && action.v == 'r' ) scroll(-dist,0);
			else if(action.c == 'swipe' && action.v == 'd' ) scroll(0,-dist);
	
	
			if(action.c == 'ba' && action.v == 'a' ) scroll(-dist,0);
			else if(action.c == 'bd' && action.v == 'd' ) scroll(0,-dist);
			else if(action.c == 'bc' && action.v == 'c' ) scroll(dist,0);
			else if(action.c == 'bb' && action.v == 'b' ) scroll(0,dist);


			
			if(action.c == 'jl' && action.v == '180' ) scroll(-dist,0);
			else if(action.c == 'jl' && action.v == '90' ) scroll(0,-dist);
			else if(action.c == 'jl' && action.v == '0' ) scroll(dist,0);
			else if(action.c == 'jl' && action.v == '270' ) scroll(0,dist);

		  });

          participant.on('quit', function (action) {
            // You can also check for participant quit events
            // directly in each participant object.
          });

        });
      });
  
	function scroll(x,y) {
	
		$('html, body').animate({
			scrollTop: '+='+y,scrollLeft: '+='+x
		 }, 200);
		 
	}
})
};

loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js",loadMuzzleyLib);


 
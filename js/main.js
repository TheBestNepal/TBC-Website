// JS file for main site of TBN
// Do not mess with this file , strict rules by DeathGOD7

$(document).on('click', 'a[href^="#"]', function (e) {
	e.preventDefault();

	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top
	}, 900);
});

// This is for the click to copy
let t;
$(document).ready(()=>{
	t = $(".ip").html();
})
$(document).on("click",".ip",()=>{
	let copy = document.createElement("textarea");
	copy.style.position = "absolute";
	copy.style.left = "-99999px";
	copy.style.top = "0";
	copy.setAttribute("id", "ta");
	document.body.appendChild(copy);
	copy.textContent = t;
	copy.select();
	document.execCommand("copy");
	$(".ip").html("<span class='extrapad'>IP copied!</span>");
	setTimeout(function(){
		$(".ip").html(t);
		var copy = document.getElementById("ta");
		copy.parentNode.removeChild(copy);
	},1000);
});


// This is to check if its online
$(document).ready(()=>{
  var ip = $(".isonline").attr("data-ip");
  var port = $(".isonline").attr("data-port");

  $.get(`https://api.mcsrvstat.us/2/${ip}:${port}`, (result)=>{
    if (result.online) {
      $(".isonline").html("Currently Online :");
    } else {
      $(".isonline").html("Server is offline!");
    }
  });

  setInterval(()=>{
    $.get(`https://api.mcsrvstat.us/2/${ip}:${port}`, (result)=>{
      if (result.online) {
        $(".isonline").html("Currently Online :");
      } else {
        $(".isonline").html("Server is offline!");
      }
    });
  }, 1000);
});

// This is to fetch the player count
$(document).ready(()=>{
  var ip = $(".sip").attr("data-ip");
  var port = $(".sip").attr("data-port");

  $.get(`https://api.mcsrvstat.us/2/${ip}:${port}`, (result)=>{
    if (result.online) {
      $(".sip").html(result.players.online + " out of " + result.players.max);
    } else {
      $(".sip").html("");
    }
  });

  setInterval(()=>{
    $.get(`https://api.mcsrvstat.us/2/${ip}:${port}`, (result)=>{
      if (result.online) {
        $(".sip").html(result.players.online + " out of " + result.players.max);
      } else {
        $(".sip").html("");
      }
    });
  }, 1000);
});

//This is to get all online player name
$(document).ready(()=>{
  var ip = $(".plist").attr("data-ip");
  var port = $(".plist").attr("data-port");
  var playerslist = "";
  //var json = '{"names":["u1","u2"]}'
  //var q = JSON.parse(json);

  $.get(`https://api.mcsrvstat.us/2/${ip}:${port}`, (result)=>{
    if (result.online) {
      for (i in result.players.list){
		  playerslist += result.players.list[i] + ", ";
	  }
	  if(playerslist.length == 0){ playerslist = "No Online Players  " }
      $(".plist").html(playerslist.slice(0,-2));
    } else {
      $(".plist").html(">.<");
    }
  });

  setInterval(()=>{
    $.get(`https://api.mcsrvstat.us/2/${ip}:${port}`, (result)=>{
      if (result.online) {
		playerslist = "";
      	for (i in result.players.list){
		  playerslist += result.players.list[i] + ", ";
	  	}
		if(playerslist.length == 0){ playerslist = "No Online Players  " }
      	$(".plist").html(playerslist.slice(0,-2));
      } else {
        $(".plist").html(">.<");
      }
    });
  }, 1000);
});

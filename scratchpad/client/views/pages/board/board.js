var pad;
var remoteUser;

Template.board.events({
  "click #wipe": function(event) {
    pad.wipe(true);
  },
  "click #set-nickname": function(event) {
    var name = prompt('Enter your nickname');
    if (name && name.trim() != '') {
      pad.setNickname(name);
    }
  },
  "click #create-new": function(event) {
    var name = prompt('Enter your nickname');
    if (name && name.trim() != '') {
      pad.setNickname(name);
    }
  }
});

Template.board.rendered = function() {

    function refreshPalette(density){
        Meteor.defer(function(){

            $("#colorPicker").empty();

            var paletteLength = $(window).width() < $(window).height() ? $(window).width() : $(window).height();
            var colorLength = paletteLength/density;

            for( var i = 0; i < density; i++ ){
                var frequency = 6 / density;
                var r = Math.floor(Math.sin(frequency * i + 0) * (127) + 128);
                var g = Math.floor(Math.sin(frequency * i + 1) * (127) + 128);
                var b = Math.floor(Math.sin(frequency * i + 3) * (127) + 128);

                var fragment = $('<div class="color-fragment"></div>');
                fragment.css("background-color", "rgb("+r+","+g+','+b+')');
                fragment.hammer();
                fragment.on('tap', function(){
                    pad.setColor($(this).css("background-color"));
                });
                $("#colorPicker").append(fragment);
            }

            if( $(window).width() < $(window).height() ){
                $('#colorPicker').css('top', '');
                $('#colorPicker').css('bottom', '0');
                $('#colorPicker').css('width', '100%');
                $('#colorPicker').css('height', colorLength+'px');
                $('.color-fragment').css('width', colorLength+'px');
                $('.color-fragment').css('height', "100%");
            }else{
                $('#colorPicker').css('top', '0');
                $('#colorPicker').css('bottom', '');
                $('#colorPicker').css('width', colorLength+'px');
                $('#colorPicker').css('height', '100%');
                $('.color-fragment').css('height', colorLength+'px');
                $('.color-fragment').css('width', "100%");
            }



        });
    }

    refreshPalette(10);
    $(window).resize(function(){refreshPalette(10);});


  Deps.autorun(function() {
    if (pad) {
      pad.close();
      remoteUser.close();
    }
    Meteor.defer(function(){
      var padId = Session.get('padId');
      pad = new Pad(padId);
      remoteUser = new RemoteUser(padId, pad);
    });
  });
};

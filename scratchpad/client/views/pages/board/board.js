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

    function refreshPalette(thickness){
        Meteor.defer(function(){

            $("#colorPicker").empty();

            var aLaCon = $(window).width() < $(window).height() ? $(window).width() : $(window).height();

            for( var i = 0; i < Math.floor(aLaCon/50); i++ ){
                var fragment = $('<div class="color-fragment"></div>');
                fragment.css("background-color", getRandomColor());
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
                $('#colorPicker').css('height', thickness+'px');
                $('.color-fragment').css('width', thickness+'px');
                $('.color-fragment').css('height', "100%");
            }else{
                $('#colorPicker').css('top', '0');
                $('#colorPicker').css('bottom', '');
                $('#colorPicker').css('width', thickness+'px');
                $('#colorPicker').css('height', '100%');
                $('.color-fragment').css('height', thickness+'px');
                $('.color-fragment').css('width', "100%");
            }



        });
    }

    refreshPalette(50);
    $(window).resize(function(){refreshPalette(50);});


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

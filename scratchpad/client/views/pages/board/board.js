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

var pad;
var remoteUser;

Template.pad.rendered = function() {

  Deps.autorun(function() {
    if (pad) {
      pad.close();
      remoteUser.close();
    }
    var padId = Session.get('padId');
    pad = new Pad(padId);
    remoteUser = new RemoteUser(padId, pad);
  });

  $('body').on('click', '#wipe', function() {
    pad.wipe(true);
  });

  $('body').on('click', '#set-nickname', function() {
    var name = prompt('Enter your nickname');
    if (name && name.trim() != '') {
      pad.setNickname(name);
    }
  });

  $('body').on('click', '#create-new', function() {
    Router.go('/');
  });
};

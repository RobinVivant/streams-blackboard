
this.RemoteUser = function RemoteUser(padId, pad) {
    var users = {};

    LineStream.on(padId + ':dragstart', function(nickname, position, color) {

        if(  !users[nickname] ){
            var pointer = $($('#tmpl-nickname').html());
            pointer.text(nickname);
            positionPointer(pointer, position);
            $('body').append(pointer);
            users[nickname] = {
                color: color,
                from: position,
                pointer: pointer
            };
        }

        users[nickname].pointer.show();
        users[nickname].color = color;
        users[nickname].from = position;
    });

    LineStream.on(padId + ':dragend', function(nickname) {
        var user = users[nickname];
        if(user) {
            user.pointer.hide();
            //users[nickname] = undefined;
        }
    });

    LineStream.on(padId + ':drag', function(nickname, to) {
        var user = users[nickname];
        if(user) {
            pad.drawLine(user.from, to, user.color);
            positionPointer(user.pointer, to);
            user.from = to;
        }
    });

    LineStream.on(padId + ':wipe', function(nickname) {
        pad.wipe();
    });

    function positionPointer(pointer, position) {
        pointer.css({
            top: position.y + 10,
            left: position.x + 10
        });
    }

    this.close = function() {
        LineStream.removeAllListeners(padId + ':dragstart');
        LineStream.removeAllListeners(padId + ':dragend');
        LineStream.removeAllListeners(padId + ':drag');
        LineStream.removeAllListeners(padId + ':wipe');
    };
}
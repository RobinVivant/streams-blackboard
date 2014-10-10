Router.configure({
    layoutTemplate: 'layout_default'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        onBeforeAction: function(pause) {
            Router.go('pad', {id: Random.id()});
            pause();
        }
    });

    this.route('board', {
        path: '/:id',
        onBeforeAction: function(pause) {
            Session.set('padId', this.params.id);
        }
    });
});
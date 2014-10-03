Router.configure({
    layoutTemplate: 'default_layout'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        onBeforeAction: function(pause) {
            Router.go('pad', {id: Random.id()});
            pause();
        }
    });

    this.route('pad', {
        path: '/:id',
        onBeforeAction: function(pause) {
            Session.set('padId', this.params.id);
        }
    });
});
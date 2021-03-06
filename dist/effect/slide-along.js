(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '$',
            'velocity'
        ], factory);
    } else {
        var framework = window.Zepto || window.jQuery;
        factory(framework, framework.Velocity);
    }
}(function($, Velocity) {
    return function() {
        var plugin = this;
        var coverage = this._coverage();
        var $animators = plugin.$animators;

        var windowHeight;

        this.$pikabu
            .css({
                top: 0,
                bottom: 0,
                left: 0,
                right: coverage ? coverage : 'auto',
                width: coverage ? 'auto' : this.options.coverage,
                height: 'auto'
            });

        return {
            open: function() {
                // Force feed the initial value
                Velocity.animate(
                    $animators,
                    { translateX: [this.options.coverage, '0'] },
                    {
                        easing: plugin.options.easing,
                        duration: plugin.options.duration,
                        complete: function() {
                            plugin.animation.openComplete.call(plugin);
                        }
                    }
                );

                Velocity.animate(
                    plugin.$pikabu,
                    {
                        translateX: [0, '-20%']
                    },
                    {
                        easing: plugin.options.easing,
                        duration: plugin.options.duration
                    }
                );
            },
            close: function() {
                Velocity.animate(
                    $animators.add(plugin.$pikabu),
                    'reverse',
                    {
                        begin: function() {
                            plugin.animation.beginClose.call(plugin);
                        },
                        easing: plugin.options.easing,
                        duration: plugin.options.duration,
                        complete: function() {
                            plugin.animation.closeComplete.call(plugin);
                        }
                    }
                );
            }
        };
    };
}));

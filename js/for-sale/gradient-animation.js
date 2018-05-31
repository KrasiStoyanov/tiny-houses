/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-cssgradients-prefixes
 */
;
window.Modernizr = function(a, b, c) {
    function u(a) { i.cssText = a }

    function v(a, b) { return u(l.join(a + ";") + (b || "")) }

    function w(a, b) { return typeof a === b }

    function x(a, b) { return !!~("" + a).indexOf(b) }

    function y(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : w(f, "function") ? f.bind(d || b) : f } return !1 } var d = "2.8.3",
        e = {},
        f = b.documentElement,
        g = "modernizr",
        h = b.createElement(g),
        i = h.style,
        j, k = {}.toString,
        l = " -webkit- -moz- -o- -ms- ".split(" "),
        m = {},
        n = {},
        o = {},
        p = [],
        q = p.slice,
        r, s = {}.hasOwnProperty,
        t;!w(s, "undefined") && !w(s.call, "undefined") ? t = function(a, b) { return s.call(a, b) } : t = function(a, b) { return b in a && w(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function(b) { var c = this; if (typeof c != "function") throw new TypeError; var d = q.call(arguments, 1),
            e = function() { if (this instanceof e) { var a = function() {};
                    a.prototype = c.prototype; var f = new a,
                        g = c.apply(f, d.concat(q.call(arguments))); return Object(g) === g ? g : f } return c.apply(b, d.concat(q.call(arguments))) }; return e }), m.cssgradients = function() { var a = "background-image:",
            b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            c = "linear-gradient(left top,#9f9, white);"; return u((a + "-webkit- ".split(" ").join(b + a) + l.join(c + a)).slice(0, -a.length)), x(i.backgroundImage, "gradient") }; for (var z in m) t(m, z) && (r = z.toLowerCase(), e[r] = m[z](), p.push((e[r] ? "" : "no-") + r)); return e.addTest = function(a, b) { if (typeof a == "object")
            for (var d in a) t(a, d) && e.addTest(d, a[d]);
        else { a = a.toLowerCase(); if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (b ? "" : "no-") + a), e[a] = b } return e }, u(""), h = j = null, e._version = d, e._prefixes = l, e }(this, this.document);

/**
 * jQuery Gradientify plugin 1.0.0
 *
 * Provides animating CSS gradients.
 * Based on http://opticalcortex.com/animating-css-gradients/ by Mike Byrne.
 *
 * @author  Codefog <http://codefog.pl>
 * @author  Kamil Kuzminski <kamil.kuzminski@codefog.pl>
 * @license MIT License
 * @see     http://opticalcortex.com/animating-css-gradients/
 */
(function($, window, document, undefined) {
    'use strict';

    // Create the defaults once
    var pluginName = 'gradientify',
        defaults = {
            angle: '0deg', // Gradient angle
            fps: 60, // Frames per second
            gradients: {}, // Gradients
            transitionTime: 8, // Transition time,
            iterations: 1
        };

    // The actual plugin constructor
    function Gradientify (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.updateSettings = function (settings) {
            this.settings = $.extend({}, defaults, options, settings);

            this.init();
        };

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Gradientify.prototype, {
        init: function() {
            // Return if the browser does not support CSS gradients
            if (!Modernizr.cssgradients) {
                return;
            }

            // Where we are in the gradients array
            this.currentIndex = 0;

            // What index of the gradients array is next
            this.nextIndex = 1;

            // Steps counter
            this.stepsCount = 0;

            // Total amount of gradients to animate
            this.amountOfGradients = this.settings.gradients.length;

            // Counter for gradients that have already switched
            this.gradientSwitchedCount = 0;

            // Total amount of steps
            this.stepsTotal = Math.round(this.settings.transitionTime * this.settings.fps);

            // How much to alter each rgb value
            this.rgbSteps = {
                start: [0, 0, 0],
                stop: [0, 0, 0]
            };

            // The current rgb values, gets altered by rgb steps on each interval
            this.rgbValues = {
                start: [0, 0, 0],
                stop: [0, 0, 0]
            };

            // For looping through adding styles
            this.prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', ''];

            // Color helpers
            this.color1 = null;
            this.color2 = null;

            if (this.settings.gradients.length > 0) {
                // Initial step calculation
                this.calculateSteps();

                // Start timer
                this.timer();
            }
        },

        /**
         * Set next current and next index of gradients array
         *
         * @param {int} num
         *
         * @returns {int}
         */
        setNext: function(num) {
            return (num + 1 < this.settings.gradients.length) ? num + 1 : 0;
        },

        /**
         * Work out how big each rgb step is
         *
         * @param {int} a
         * @param {int} b
         *
         * @return {int}
         */
        calculateStepSize: function(a, b) {
            return (a - b) / this.stepsTotal;
        },

        /**
         * Populate the rgbValues and rgbSteps objects
         */
        calculateSteps: function() {
            console.log(this.settings.gradients)
            for (var key in this.rgbValues) {
                if (this.rgbValues.hasOwnProperty(key)) {
                    for (var i = 0; i < 3; i++) {
                        this.rgbValues[key][i] = this.settings.gradients[this.currentIndex][key][i];
                        this.rgbSteps[key][i] = this.calculateStepSize(this.settings.gradients[this.nextIndex][key][i], this.rgbValues[key][i]);
                    }
                }
            }
        },

        /**
         * Update current RGB values, update DOM element with new CSS background
         */
        updateGradient: function() {
            var i;

            // Update the current RGB values
            for (var key in this.rgbValues) {
                if (this.rgbValues.hasOwnProperty(key)) {
                    for (i = 0; i < 3; i++) {
                        this.rgbValues[key][i] += this.rgbSteps[key][i];
                    }
                }
            }

            // Generate CSS RGB values
            var t_color1 = 'rgb(' + (this.rgbValues.start[0] | 0) + ',' + (this.rgbValues.start[1] | 0) + ',' + (this.rgbValues.start[2] | 0) + ')';
            var t_color2 = 'rgb(' + (this.rgbValues.stop[0] | 0) + ',' + (this.rgbValues.stop[1] | 0) + ',' + (this.rgbValues.stop[2] | 0) + ')';

            // Has anything changed on this iteration?
            if (t_color1 != this.color1 || t_color2 != this.color2) {

                // Update cols strings
                this.color1 = t_color1;
                this.color2 = t_color2;

                // Update DOM element style attribute
                $(this.element).css('background-image', '-webkit-gradient(linear, left bottom, right top, from(' + this.color1 + '), to(' + this.color2 + '))');

                for (i = 0; i < 4; i++) {
                    $(this.element).css('background-image', this.prefixes[i] + 'linear-gradient(' + this.settings.angle + ', ' + this.color1 + ', ' + this.color2 + ')');
                }
            }

            // We did another step
            this.stepsCount++;

            // Did we do too many steps?
            if (this.stepsCount > this.stepsTotal) {
                // Reset steps count
                this.stepsCount = 0;

                // Set new indexes
                this.currentIndex = this.setNext(this.currentIndex);
                this.nextIndex = this.setNext(this.nextIndex);

                this.gradientSwitchedCount++;

                // Calculate steps
                this.calculateSteps();
            }
        },

        /**
         * Launch timer
         */
        timer: function() {
            // Launch the timer
            var timer = setInterval(function() {
                if (this.settings.iterations === 'infinite') {
                    this.updateGradient.apply(this);
                } else {
                    var totalAmountOfIterationsNeeded = (this.settings.iterations * this.amountOfGradients) - 1;
                    if (this.gradientSwitchedCount < totalAmountOfIterationsNeeded) {
                        this.updateGradient.apply(this);
                    } else {
                        this.gradientSwitchedCount = 0;

                        clearInterval(timer);
                    }
                }
            }.bind(this), Math.round(1000 / this.settings.fps));
        },
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        if (!this.length) {
            return this;
        }

        return new Gradientify(this, options);
    };

})(jQuery, window, document);
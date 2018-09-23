// filename: furigata.js
// dependecoes: jQuery (v ??? or higher)

// q.v.: https://learn.jquery.com/plugins/basic-plugin-creation/
// q,v,: https://learn.jquery.com/plugins/advanced-plugin-concepts/

(function ( $ ) {

    $.fn.furigana = function( options ) {

        var settings = $.extend(
            {}, 
            $.fn.furigana.defaults,
             options);

        // in the first version we only highlight ruby sections
        this.find("ruby").css("color", settings.ruby_color);
        this.find("rt").css("color", settings.rt_color);
        this.find("rt").css("background-color", settings.rt_backgroundColor);
        return this;
    };

}( jQuery ));

jQuery.fn.furigana.defaults = {
    ruby_color: "green",
    rt_color: "red",
    rt_backgroundColor: "yellow",
    show_level: 1
};
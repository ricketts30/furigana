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
        this.find("rt").css("color", settings.color);
        this.find("rt").css("background-color", settings.backgroundColor);
        return this;
    };

}( jQuery ));

jQuery.fn.furigana.defaults = {
    color: "inherit", 
    backgroundColor: "inherit", 
    obscure_color: "silver", 
    obscure_backgroundColor: "silver", 
    hide_level: 0,
    obscure_level: 1
};

/* todo: other attributes
obscure_color: (default to silver)
obscure_backgroundColor: (default to silver)
hide_level: (default of zero, the level at which (and below) to hide furigana)
obscure_level: (default of one, the level at which (and below) to obscure furigana)
(note other levels above obscure would be shown)
a <rt> without attributes or classes is considered to be level 1
*/
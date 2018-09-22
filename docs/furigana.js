// filename: furigata.js
// dependecoes: jQuery (v ??? or higher)

// q.v.: https://learn.jquery.com/plugins/basic-plugin-creation/

$.fn.furigana = function() {
    this.css( "color", "green" );
    return this;
}
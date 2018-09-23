// filename: furigata.js
// dependecoes: jQuery (v ??? or higher)

// q.v.: https://learn.jquery.com/plugins/basic-plugin-creation/

$.fn.furigana = function() {
    // in the first version we only highlight ruby sections
    this.find("ruby").css("color","green");
    this.find("rt").css("color","red");
    return this;
}
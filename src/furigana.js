// filename: furigana.js
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

jQuery.fn.furigana.filter = function(list, from, before){
    var retVal = [], counter = 0, size = -1, number = 0;
    if(list){
        size = list.length;
    }
    //console.log(`size: ${size}`);
    for(counter = 0; counter < size; counter++){
        number = list[counter];
        //console.log(`number: ${number}`);
        // note: if from == before then no number is valid!
        if(from && before){
            if(from < before){
                if(from <= number && before > number){
                    retVal.push(number);
                }
            }else if(from > before){
                if(from <= number || before > number){
                    retVal.push(number);
                }
            }
        }else if(from && number >= from){
            retVal.push(number);
        }else if(before && number < before){
            retVal.push(number);
        }else if(!from && !before){
            // if no from or before value is specified then select everything
            retVal.push(number);
        }
    }
    return retVal;
}; 

/* todo: other attributes
obscure_color: (default to silver)
obscure_backgroundColor: (default to silver)
hide_level: (default of zero, the level at which (and below) to hide furigana)
obscure_level: (default of one, the level at which (and below) to obscure furigana)
(note other levels above obscure would be shown)
a <rt> without attributes or classes is considered to be level 1
*/
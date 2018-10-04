// filename: furigana.js
// dependecoes: jQuery (v ??? or higher)

// q.v.: https://learn.jquery.com/plugins/basic-plugin-creation/
// q,v,: https://learn.jquery.com/plugins/advanced-plugin-concepts/

(function ( $ ) {

    $.fn.furigana = function( options ) {

        let settings = $.extend(
            {}, 
            $.fn.furigana.defaults,
             options);

        // formatting:
        this.find("rt").css("color", settings.color);
        this.find("rt").css("background-color", settings.backgroundColor);

        // obscuring:
        let numbers = $.fn.furigana.filter(
            settings.number_list, 
            settings.obscure_from, 
            settings.obscure_before);
        for(let x = 0, y = numbers.length; x < y; x++){
            let expr = "rt[rt-lvl='" + numbers[x] + "']";
            this.find(expr).css(
                { 
                    cursor: settings.obscure_cursor, 
                    backgroundColor: settings.obscure_backgroundColor , 
                    color: settings.obscure_color 
                }).on( "click", function() {
                        $( this ).css(
                            { 
                                cursor: 'inherit', 
                                backgroundColor: settings.backgroundColor, 
                                color: settings.color 
                            })
                    });
        }

        // hiding:
        numbers = $.fn.furigana.filter(
            settings.number_list, 
            settings.hide_from, 
            settings.hide_before);
        for(let x = 0, y = numbers.length; x < y; x++){
            let expr = "rt[rt-lvl='" + numbers[x] + "']";
            this.find(expr).hide();
        }

        // replacing:
        numbers = $.fn.furigana.filter(
            settings.number_list, 
            settings.replace_from, 
            settings.replace_before);
        for(let x = 0, y = numbers.length; x < y; x++){
            let expr = "rt[rt-lvl='" + numbers[x] + "']";
            this.find(expr).each(function(index) {
                let rt = $(this).text();
                $(this).closest('ruby').text(rt);
            });
        }

        return this;
    };

}( jQuery ));

jQuery.fn.furigana.defaults = {
    color: "inherit", 
    backgroundColor: "inherit", 
    obscure_color: "silver", 
    obscure_backgroundColor: "silver", 
    hide_from: null,
    hide_before: null,
    obscure_from: null,
    obscure_before: null,
    obscure_cursor: 'pointer',
    replace_from: null,
    replace_before: null,
    number_list: [0,1,2,3,4,5,6,7,8,9]
};

jQuery.fn.furigana.filter = function(list, from, before){
    var retVal = [], counter = 0, size = -1, number = 0;
    if(list){
        size = list.length;
    }
    // if both are null then return empty []
    if(from || before){
        for(counter = 0; counter < size; counter++){
            number = list[counter];
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
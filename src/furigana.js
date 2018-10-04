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
                }).on( "click", function(event) {
                        event.stopPropagation();
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

        // magnifying:
        // q.v.: http://jsfiddle.net/SRw67/
        this.find("ruby").on( "click", function(event) {
            event.stopPropagation();
            let fragment = "<ruby>" + $(this).html() + "</ruby>";
            let divFragment = $("<div style='z-index:50; position:absolute; border: " + settings.magnify_borderStyle + ";'><a>" + settings.magnify_close_text + "</a><br><span style='font-size: xx-large; padding: 10px;'>" + fragment + "</span></div>");
            divFragment.find("a").on("click", function(event) {
                $(this).closest("div").remove();
            });
            divFragment.css(
                { 
                    backgroundColor: settings.magnify_backgroundColor,
                    marginLeft : event.pageX + "px"
                });
            divFragment.find("a").css(
                { 
                    color: settings.magnify_close_color, 
                    cursor: settings.obscure_cursor
                });
            $(this).after(divFragment);
        });

        return this;
    };

}( jQuery ));

jQuery.fn.furigana.defaults = {
    color: "inherit", 
    backgroundColor: "inherit", 
    hide_before: null,
    hide_from: null,
    obscure_backgroundColor: "silver", 
    obscure_before: null,
    obscure_color: "silver",
    obscure_cursor: 'pointer',
    obscure_from: null,
    magnify_backgroundColor: "cornsilk",
    magnify_before: 10,
    magnify_borderStyle: "1px dashed blue",
    magnify_close_color: "red",
    magnify_close_text: "[&bull;]",
    magnify_from: 0,
    number_list: [0,1,2,3,4,5,6,7,8,9],
    replace_before: null,
    replace_from: null
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

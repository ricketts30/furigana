
QUnit.module("furigana.filter");

var fg_filter_list = [0,1,2,3,4,5,6,7,8,9,10,11];

//jQuery.fn.furigana.filter(list, from, before) returns []

QUnit.test( "filter empty list returns empty list", function( assert ) {
    console.log("==filter empty list returns empty list==");
    var retVal = jQuery.fn.furigana.filter([], 1, 40);
    console.log("retVal:");
    console.log(retVal);
    assert.ok( retVal.length == 0, "Passed!" );
});

QUnit.test( "filter list [0..11] from 5 and before 10 returns [5,6,7,8,9]", function( assert ) {
    console.log("==filter list [0..11] from 5 and before 10 returns [5,6,7,8,9]==");
    var retVal = jQuery.fn.furigana.filter(fg_filter_list, 5, 10);
    console.log("retVal:");
    console.log(retVal);
    assert.ok( retVal.length == 5, "Passed!" );
    assert.ok( retVal[0] == 5, "Passed!" );
    assert.ok( retVal[4] == 9, "Passed!" );
});

QUnit.test( "filter list [0..11] from 5 and before null returns [5..11]", function( assert ) {
    console.log("==filter list [0..11] from 5 and before null returns [5..11]==");
    var retVal = jQuery.fn.furigana.filter(fg_filter_list, 5, null);
    console.log("retVal:");
    console.log(retVal);
    assert.ok( retVal.length == 7, "Passed!" );
    assert.ok( retVal[0] == 5, "Passed!" );
    assert.ok( retVal[6] == 11, "Passed!" );
});

QUnit.test( "filter list [0..11] from null and before 5 returns [0..4]", function( assert ) {
    console.log("==filter list [0..11] from null and before 5 returns [0..4]==");
    var retVal = jQuery.fn.furigana.filter(fg_filter_list, null, 5);
    console.log("retVal:");
    console.log(retVal);
    assert.ok( retVal.length == 5, "Passed!" );
    assert.ok( retVal[0] == 0, "Passed!" );
    assert.ok( retVal[4] == 4, "Passed!" );
});

QUnit.test( "filter list [0..11] from 9 and before 3 returns [0,1,2,9,10,11]", function( assert ) {
    console.log("==filter list [0..11] from 9 and before 3 returns [0,1,2,9,10,11]==");
    var retVal = jQuery.fn.furigana.filter(fg_filter_list, 9, 3);
    console.log("retVal:");
    console.log(retVal);
    assert.ok( retVal.length == 6, "Passed!" );
    assert.ok( retVal[0] == 0, "Passed!" );
    assert.ok( retVal[1] == 1, "Passed!" );
    assert.ok( retVal[2] == 2, "Passed!" );
    assert.ok( retVal[3] == 9, "Passed!" );
    assert.ok( retVal[4] == 10, "Passed!" );
    assert.ok( retVal[5] == 11, "Passed!" );
});

QUnit.test( "filter list [0..11] from 5 and before 5 returns []", function( assert ) {
    console.log("==filter list [0..11] from 5 and before 5 returns []==");
    var retVal = jQuery.fn.furigana.filter(fg_filter_list, 5, 5);
    console.log("retVal:");
    console.log(retVal);
    assert.ok( retVal.length == 0, "Passed!" );
});

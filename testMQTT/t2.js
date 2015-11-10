/**
 * Created by ricardomendes on 04/11/15.
 */
var Combinatorics = require('js-combinatorics');
cmb = Combinatorics.permutation([1,2,3,4,5,6,7,8,9]); // assumes 4
var combinations = cmb.toArray();

for(var i in combinations){
    if(parseInt(combinations[i][0])+parseInt(combinations[i][1])+parseInt(combinations[i][2])+parseInt(combinations[i][3])==17 &&
        parseInt(combinations[i][2])+parseInt(combinations[i][4])+parseInt(combinations[i][5]) ==17 &&
        parseInt(combinations[i][1])+parseInt(combinations[i][4])+parseInt(combinations[i][6])+parseInt(combinations[i][7])==17 &&
        parseInt(combinations[i][3])+parseInt(combinations[i][5])+parseInt(combinations[i][7])+parseInt(combinations[i][8])==17) {
        console.log(combinations[i]);
    }
}
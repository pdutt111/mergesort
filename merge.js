/**
 * Created by pariskshitdutt on 08/03/15.
 */

//handles the message which it recieves from the master process
process.on('message', function(msg) {
    //performs the merge
    var result=merge(msg.first,msg.second);
    //sends message to the master with the merged arrays
    process.send({result:result});

});


/**
 * performs the merge of two arrays and returns the combined array
 * @param arr1
 * @param arr2
 * @returns {Array}
 */
function merge(arr1, arr2) {
    var result = [], left1 = arr1.length, left2 = arr2.length;
    while (left1 > 0 && left2 > 0) {
        if (arr1[0]<arr2[0]) {
            result.push(arr1.shift());
            left1--;
        } else {
            result.push(arr2.shift());
            left2--;
        }
    }
    if (left1 > 0) {
        result.push.apply(result, arr1);
    } else {
        result.push.apply(result, arr2);
    }
    return result;
}

/**
 * Created by pariskshitdutt on 08/03/15.
 */

/**
 * imports required by the code
 * async module needs to be installed using npm
 */
var async=require('async');
var cluster = require('cluster');

/**
 * cluster module setup creates merge.js as child processes
 */
    cluster.setupMaster({
        exec : __dirname+"/merge.js"
    });

/**
 * performs mergesort and returns the sorted array in callback
 * @param unsorted array
 * @param callback returns err and sorted array
 */

    module.exports.mergeSort=function mergeSort(arr,callback) {

        var len = arr.length, firstHalf, secondHalf;        //different variables required

        if (len >= 2) {

            firstHalf = arr.slice(0, len / 2);      //slices the array in first half
            secondHalf = arr.slice(len / 2, len);   //slices the array in second half

            //performs both the recursive calls and combines and
            // gives back a combined callback whick spawns a worker which performs the merge

            async.parallel([
                function(callback){mergeSort(firstHalf,callback)},
                function(callback){mergeSort(secondHalf,callback)}
            ], function(err,results){
                //spawns a worker thread using cluster module
                var worker=cluster.fork();
                //passes the spliced arrays to the worker for processing
                worker.send({first:results[0],second:results[1]});
                //handles the messages recieved from the worker
                worker.on('message', function(msg) {

                    //completes the merge and passes the result to the callback
                    callback(null,msg.result);
                    //the job of the worker is done here so its killed
                    worker.kill();
                });
            });

        } else {
            //passes the single object array to the callback because its already sorted
            callback(null,arr);
        }
    }


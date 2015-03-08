merge-sort-async
================

performs mergesort completely async and uses cluster module to perform merge sort</br></br>
installation:

        npm install merge-sort-async

usage:</br>

        var sort=require('merge-sort-async');
        sort.mergeSort([9,4,5,3,2,3],function(err,result){
        console.log(result);
        })

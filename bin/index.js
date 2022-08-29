#! /usr/bin/env node

console.log('hello world');

//extra cheese thin crust pizza
const pizza=new Item(
    {
        //16 inch hand tossed crust
        code:'16SCREEN',
        options:{
            //sauce, whole pizza : normal
            X: {'1/1' : '1'}, 
            //cheese, whole pizza  : double 
            C: {'1/1' : '1'},
            //pepperoni, whole pizza : double 
            P: {'1/2' : '1'},
            J: {'1/1': '1'}
        }
    }
);
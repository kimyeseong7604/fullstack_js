console.log(a);
try {
    console.log(b);
    console.log(c);
} catch {};

var a = 1;
const b = 2;
let c;

function foo(arg){
    arg();
}

function bar(){
    console.log('bar');
}

foo(bar);

function koo(arg){
    console.log(arguments);
}

koo(1, 2, 3, 4);

const goo = new Function ("console.log('goo3')")

goo();

const qoo = () => {
    console.log('qoo3');
}

qoo();

(function foo(){
    console.log('foo');
})();

function foo(arg)
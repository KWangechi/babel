/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */
(function(t,e){function n(t,e){return new r(t,e||null)}function r(t,e){function n(n,r){if(u===h)throw new Error("Generator is already running");if(u===s)throw new Error("Generator has already finished");for(;;){var o=i.delegate;if(o){try{var f=o.generator[n](r);n="next",r=void 0}catch(d){i.delegate=null,n="throw",r=d;continue}if(!f.done)return u=c,f;i[o.resultName]=f.value,i.next=o.nextLoc,i.delegate=null}if("next"===n){if(u===a&&"undefined"!=typeof r)throw new TypeError("attempt to send "+JSON.stringify(r)+" to newborn generator");u===c?i.sent=r:delete i.sent}else if("throw"===n){if(u===a)throw u=s,r;i.dispatchException(r)}u=h;try{var p=t.call(e,i);u=i.done?s:c;var f={value:p,done:i.done};if(p!==l)return f;i.delegate&&"next"===n&&(r=void 0)}catch(y){"next"===n?i.dispatchException(y):r=y}}}var r=this,i=new o,u=a;r.next=n.bind(r,"next"),r.throw=n.bind(r,"throw")}function o(){this.reset()}var i=Object.prototype.hasOwnProperty;if(!t.wrapGenerator){t.wrapGenerator=n,"undefined"!=typeof exports&&(exports.wrapGenerator=n);var a="suspendedStart",c="suspendedYield",h="executing",s="completed",l={};n.mark=function(t){return t.constructor=e,t},"GeneratorFunction"!==e.name&&(e.name="GeneratorFunction"),n.isGeneratorFunction=function(t){var n=t&&t.constructor;return n?e.name===n.name:!1},r.prototype.toString=function(){return"[object Generator]"},o.prototype={constructor:o,reset:function(){this.next=0,this.sent=void 0,this.tryStack=[],this.done=!1,this.delegate=null;for(var t,e=0;i.call(this,t="t"+e)||20>e;++e)this[t]=null},stop:function(){if(this.done=!0,i.call(this,"thrown")){var t=this.thrown;throw delete this.thrown,t}return this.rval},keys:function(t){return Object.keys(t).reverse()},pushTry:function(t,e,n){e&&this.tryStack.push({finallyLoc:e,finallyTempVar:n}),t&&this.tryStack.push({catchLoc:t})},popCatch:function(t){var e=this.tryStack.length-1,n=this.tryStack[e];n&&n.catchLoc===t&&(this.tryStack.length=e)},popFinally:function(t){var e=this.tryStack.length-1,n=this.tryStack[e];n&&i.call(n,"finallyLoc")||(n=this.tryStack[--e]),n&&n.finallyLoc===t&&(this.tryStack.length=e)},dispatchException:function(t){var e=[],n=!1;if(this.done)throw t;this.thrown=t,this.next="end";for(var r=this.tryStack.length-1;r>=0;--r){var o=this.tryStack[r];if(o.catchLoc){this.next=o.catchLoc,n=!0;break}o.finallyLoc&&(e.push(o),n=!0)}for(;o=e.pop();)this[o.finallyTempVar]=this.next,this.next=o.finallyLoc},delegateYield:function(t,e,n){return this.delegate={generator:t,resultName:e,nextLoc:n},l}}}}).apply(this,Function("return [this, function GeneratorFunction(){}]")());
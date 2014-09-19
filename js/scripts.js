
$(document).ready(function() {

  $( "#account form" ).submit(function( event ) {
    event.preventDefault();
    var posting = $.post( "http://insamling.postnummeruppror.nu/api/0.0.4/account/set", $("#account form").serializeJSON() );
    posting.done(function( data ) {
      alert("Konto skapat!");
      location.reload();
    });
  });


  $( "#report form" ).submit(function( event ) {
    event.preventDefault();
    var posting = $.post( "http://insamling.postnummeruppror.nu/api/0.0.4/location_sample/create", $("#report form").serializeJSON() );
    posting.done(function( data ) {
      alert("Tack för din rapport!");
      location.reload();
    });
  });

});


var map;

function locate() {

$("#postalCode").focus();
  map = L.map('map');


  new L.TileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    subdomains: "abc",
    attribution: 'Kartdata och kartbilder från <a href="http://www.openstreetmap.se">OpenStreetMap Sverige</a>. Kart-API från <a href="http://leafletjs.org">Leaflet</a>.',
    maxZoom: 18
  }).addTo(map);

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

  map.locate({setView: true, maxZoom: 16});
}

function onLocationFound(e) {

  $("#latitude").val(e.latlng.lat);
  $("#longitude").val(e.latlng.lng);
  $("#accuracy").val(e.accuracy);

  var radius = e.accuracy;
  L.marker(e.latlng).addTo(map).bindPopup("Din plats").openPopup();
  L.circle(e.latlng, radius).addTo(map);

  document.getElementById("knappen").disabled=false;

}

function onLocationError(e) {
  alert(e.message);
}



var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();


/**
 * jQuery serializeObject
 * @copyright 2014, macek <paulmacek@gmail.com>
 * @link https://github.com/macek/jquery-serialize-object
 * @license BSD
 * @version 2.3.2
 */

!function(e,i){if("function"==typeof define&&define.amd)define(["jquery","exports"],function(r,t){i(e,t,r)});else if("undefined"!=typeof exports){var r=require("jquery");i(e,exports,r)}else e.FormSerializer=i(e,{},e.jQuery||e.Zepto||e.ender||e.$)}(this,function(e,i,r){function t(e){function i(e,i,r){return e[i]=r,e}function r(e,r){for(var a,s=e.match(n.key);void 0!==(a=s.pop());)if(n.push.test(a)){var o=t(e.replace(/\[\]$/,""));r=i([],o,r)}else n.fixed.test(a)?r=i([],a,r):n.named.test(a)&&(r=i({},a,r));return r}function t(e){return void 0===d[e]&&(d[e]=0),d[e]++}function a(i){if(!n.validate.test(i.name))return this;var t=r(i.name,i.value);return u=e.extend(!0,u,t),this}function s(i){if(!e.isArray(i))throw new Error("formSerializer.addPairs expects an Array");for(var r=0,t=i.length;t>r;r++)this.addPair(i[r]);return this}function o(){return u}function f(){return JSON.stringify(o())}var u={},d={};this.addPair=a,this.addPairs=s,this.serialize=o,this.serializeJSON=f}var n={validate:/^[a-z][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,key:/[a-z0-9_]+|(?=\[\])/gi,push:/^$/,fixed:/^\d+$/,named:/^[a-z0-9_]+$/i};return t.patterns=n,t.serializeObject=function(){return this.length>1?new Error("jquery-serialize-object can only serialize one form at a time"):new t(r).addPairs(this.serializeArray()).serialize()},t.serializeJSON=function(){return this.length>1?new Error("jquery-serialize-object can only serialize one form at a time"):new t(r).addPairs(this.serializeArray()).serializeJSON()},"undefined"!=typeof r.fn&&(r.fn.serializeObject=t.serializeObject,r.fn.serializeJSON=t.serializeJSON),i.FormSerializer=t,t});






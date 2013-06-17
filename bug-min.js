/*
 Bug.js - https://github.com/Auz/Bug
 Released under MIT-style license.
 Original Screen Bug http://screen-bug.googlecode.com/git/index.html
*/
var BugDispatch={options:{minDelay:500,maxDelay:1E4,minBugs:2,maxBugs:20,minSpeed:1,maxSpeed:3,imageSprite:"fly-sprite.png",fly_width:13,fly_height:14,num_frames:5,monitorMouseMovement:!1,eventDistanceToBug:40,minTimeBetweenMultipy:1E3,mouseOver:"random"},initialize:function(a){this.options=mergeOptions(this.options,a);this.options.minBugs>this.options.maxBugs&&(this.options.minBugs=this.options.maxBugs);this.modes=["die","multiply","fly","flyoff"];this.transform=null;this.transformFns={MozTransform:function(a){this.bug.style.MozTransform=
a},WebkitTransform:function(a){this.bug.style.webkitTransform=a},OTransform:function(a){this.bug.style.OTransform=a},MsTransform:function(a){this.bug.style.msTransform=a},KhtmlTransform:function(a){this.bug.style.KhtmlTransform=a},W3Ctransform:function(a){this.bug.style.transform=a}};this.transforms={Moz:this.transformFns.MozTransform,webkit:this.transformFns.WebkitTransform,O:this.transformFns.OTransform,ms:this.transformFns.MsTransform,Khtml:this.transformFns.KhtmlTransform,w3c:this.transformFns.W3Ctransform};
if("transform"in document.documentElement.style)this.transform=this.transforms.w3c;else for(var b=["Moz","webkit","O","ms","Khtml"],c=0,c=0;c<b.length;c++)if(b[c]+"Transform"in document.documentElement.style){this.transform=this.transforms[b[c]];break}if(this.transform){this.bugs=[];for(var b="multiply"===this.options.mouseOver?this.options.minBugs:this.random(this.options.minBugs,this.options.maxBugs,!0),c=0,d=this,c=0;c<b;c++){a={imageSprite:this.options.imageSprite,fly_width:this.options.fly_width,
fly_height:this.options.fly_height,num_frames:this.options.num_frames,wingsOpen:0.5<Math.random()?!0:!1,walkSpeed:this.random(this.options.minSpeed,this.options.maxSpeed)};var e=SpawnBug();e.initialize(this.transform,a);this.bugs.push(e)}for(c=0;c<b;c++)a=this.random(this.options.minDelay,this.options.maxDelay,!0),e=this.bugs[c],setTimeout(function(a){return function(){a.flyIn()}}(e),a),d.add_events_to_bug(e);this.options.monitorMouseMovement&&(window.onmousemove=function(){d.check_if_mouse_close_to_bug()})}},
add_events_to_bug:function(a){var b=this;a.bug&&(a.bug.addEventListener?a.bug.addEventListener("mouseover",function(){b.on_bug(a)}):a.bug.attachEvent&&a.bug.attachEvent("onmouseover",function(){b.on_bug(a)}))},check_if_mouse_close_to_bug:function(a){if(a=a||window.event){var b=0,c=0;a.client&&a.client.x?(b=a.client.x,c=a.client.y):a.clientX?(b=a.clientX,c=a.clientY):a.page&&a.page.x?(b=a.page.x-(document.body.scrollLeft+document.documentElement.scrollLeft),c=a.page.y-(document.body.scrollTop+document.documentElement.scrollTop)):
a.pageX&&(b=a.pageX-(document.body.scrollLeft+document.documentElement.scrollLeft),c=a.pageY-(document.body.scrollTop+document.documentElement.scrollTop));a=this.bugs.length;for(var d=0,d=0;d<a;d++){var e=this.bugs[d].getPos();e&&Math.abs(e.top-c)+Math.abs(e.left-b)<this.options.eventDistanceToBug&&!this.bugs[d].flyperiodical&&this.near_bug(this.bugs[d])}}},near_bug:function(a){this.on_bug(a)},on_bug:function(a){if(a.alive){var b=this.options.mouseOver;"random"===b&&(b=this.modes[this.random(0,this.modes.length-
1,!0)]);if("fly"===b)a.stop(),a.flyRand();else if("flyoff"===b)a.stop(),a.flyOff();else if("die"===b)a.die();else if("multiply"===b&&!this.multiplyDelay&&this.bugs.length<this.options.maxBugs){var c=SpawnBug(),b={imageSprite:this.options.imageSprite,fly_width:this.options.fly_width,fly_height:this.options.fly_height,num_frames:this.options.num_frames,wingsOpen:0.5<Math.random()?!0:!1,walkSpeed:this.random(this.options.minSpeed,this.options.maxSpeed)},d=a.getPos,e=this;c.initialize(this.transform,
b);c.drawBug(d.top,d.left);c.flyRand();a.flyRand();this.bugs.push(c);this.multiplyDelay=!0;setTimeout(function(){e.add_events_to_bug(c);e.multiplyDelay=!1},this.options.minTimeBetweenMultipy)}}},random:function(a,b,c){var d=a-0.5+Math.random()*(b-a+1);d>b?d=b:d<a&&(d=a);return c?Math.round(d):d}},BugController=function(){this.initialize.apply(this,arguments)};BugController.prototype=BugDispatch;
var Bug={options:{wingsOpen:!1,walkSpeed:2,flySpeed:40,edge_resistance:50},initialize:function(a,b){this.options=mergeOptions(this.options,b);this.NEAR_TOP_EDGE=1;this.NEAR_BOTTOM_EDGE=2;this.NEAR_LEFT_EDGE=4;this.NEAR_RIGHT_EDGE=8;this.directions={};this.directions[this.NEAR_TOP_EDGE]=270;this.directions[this.NEAR_BOTTOM_EDGE]=90;this.directions[this.NEAR_LEFT_EDGE]=0;this.directions[this.NEAR_RIGHT_EDGE]=180;this.directions[this.NEAR_TOP_EDGE+this.NEAR_LEFT_EDGE]=315;this.directions[this.NEAR_TOP_EDGE+
this.NEAR_RIGHT_EDGE]=225;this.directions[this.NEAR_BOTTOM_EDGE+this.NEAR_LEFT_EDGE]=45;this.directions[this.NEAR_BOTTOM_EDGE+this.NEAR_RIGHT_EDGE]=135;this.large_turn_angle_deg=this.angle_rad=this.angle_deg=0;this.near_edge=!1;this.edge_test_counter=10;this.fly_counter=this.large_turn_counter=this.small_turn_counter=0;this.toggle_stationary_counter=50*Math.random();this.stationary=!1;this.bug=null;this.wingsOpen=this.options.wingsOpen;this.transform=a;this.flyIndex=this.walkIndex=0;this.alive=!0;
this.rad2deg_k=180/Math.PI;this.deg2rad_k=Math.PI/180;this.makeBug();this.angle_rad=this.deg2rad(this.angle_deg);this.angle_deg=this.random(0,360,!0)},go:function(){if(this.transform){this.drawBug();var a=this;this.going=setInterval(function(){a.animate()},40)}},stop:function(){this.going&&(clearTimeout(this.going),this.going=null);this.flyperiodical&&(clearTimeout(this.flyperiodical),this.flyperiodical=null)},animate:function(){0>=--this.toggle_stationary_counter&&this.toggleStationary();if(!this.stationary){if(0>=
--this.edge_test_counter&&this.bug_near_window_edge()&&(this.angle_deg%=360,0>this.angle_deg&&(this.angle_deg+=360),15<Math.abs(this.directions[this.near_edge]-this.angle_deg))){var a=this.directions[this.near_edge]-this.angle_deg,b=360-this.angle_deg+this.directions[this.near_edge];this.large_turn_angle_deg=Math.abs(a)<Math.abs(b)?a:b;this.edge_test_counter=10;this.large_turn_counter=100;this.small_turn_counter=30}0>=--this.large_turn_counter&&(this.large_turn_angle_deg=this.random(1,150,!0),this.next_large_turn());
if(0>=--this.small_turn_counter)this.angle_deg+=this.random(1,10),this.next_small_turn();else{a=this.random(1,5,!0);if(0<this.large_turn_angle_deg&&0>a||0>this.large_turn_angle_deg&&0<a)a=-a;this.large_turn_angle_deg-=a;this.angle_deg+=a}this.angle_rad=this.deg2rad(this.angle_deg);a=Math.cos(this.angle_rad)*this.options.walkSpeed;b=-Math.sin(this.angle_rad)*this.options.walkSpeed;this.moveBug(a,b);this.walkFrame();this.transform("rotate("+(90-this.angle_deg)+"deg)")}},makeBug:function(){if(!this.bug){var a=
this.wingsOpen?"0":"-"+this.options.fly_height+"px",b=document.createElement("div");b["class"]="bug";b.style.background="transparent url("+this.options.imageSprite+") no-repeat 0 "+a;b.style.width=this.options.fly_width+"px";b.style.height=this.options.fly_height+"px";b.style.position="fixed";b.style.zIndex="9999999";this.bug=b;this.setPos()}},setPos:function(a,b){this.bug.top=a||this.random(this.options.edge_resistance,document.documentElement.clientHeight-this.options.edge_resistance);this.bug.left=
b||this.random(this.options.edge_resistance,document.documentElement.clientWidth-this.options.edge_resistance);this.bug.style.top=this.bug.top+"px";this.bug.style.left=this.bug.left+"px"},drawBug:function(a,b){this.bug||this.makeBug();a&&b&&this.setPos(a,b);this.inserted||(this.inserted=!0,document.body.appendChild(this.bug))},toggleStationary:function(){this.stationary=!this.stationary;this.next_stationary();var a=this.options.wingsOpen?"0":"-"+this.options.fly_height+"px";this.bug.style.backgroundPosition=
this.stationary?"0 "+a:"-"+this.options.fly_width+"px "+a},walkFrame:function(){this.bug.style.backgroundPosition=-1*this.walkIndex*this.options.fly_width+"px "+(this.options.wingsOpen?"0":"-"+this.options.fly_height+"px");this.walkIndex++;this.walkIndex>=this.options.num_frames&&(this.walkIndex=0)},moveBug:function(a,b){this.bug.style.top=(this.bug.top+=b)+"px";this.bug.style.left=(this.bug.left+=a)+"px"},fly:function(a){var b=parseInt(this.bug.style.top,10),c=parseInt(this.bug.style.left,10),d=
c-a.left,e=b-a.top,f=Math.atan(e/d);50>Math.abs(d)+Math.abs(e)&&(this.bug.style.backgroundPosition=-2*this.options.fly_width+"px -"+2*this.options.fly_height+"px");30>Math.abs(d)+Math.abs(e)&&(this.bug.style.backgroundPosition=-1*this.options.fly_width+"px -"+2*this.options.fly_height+"px");if(10>Math.abs(d)+Math.abs(e))this.bug.style.backgroundPosition="0 0",this.stop(),this.go();else{var g=Math.cos(f)*this.options.flySpeed,f=Math.sin(f)*this.options.flySpeed;if(c>a.left&&0<g||c>a.left&&0>g)g*=-1,
Math.abs(d)<Math.abs(g)&&(g/=4);if(b<a.top&&0>f||b>a.top&&0<f)f*=-1,Math.abs(e)<Math.abs(f)&&(f/=4);this.bug.style.top=b+f+"px";this.bug.style.left=c+g+"px"}},flyRand:function(){this.stop();var a={};a.top=this.random(this.options.edge_resistance,document.documentElement.clientHeight-this.options.edge_resistance);a.left=this.random(this.options.edge_resistance,document.documentElement.clientWidth-this.options.edge_resistance);this.startFlying(a)},startFlying:function(a){this.bug.left=a.left;this.bug.top=
a.top;var b=parseInt(this.bug.style.top,10),c=parseInt(this.bug.style.left,10),c=a.left-c;this.angle_rad=Math.atan((a.top-b)/c);this.angle_deg=this.rad2deg(this.angle_rad);this.angle_deg=0<c?90+this.angle_deg:270+this.angle_deg;this.angle_rad=this.deg2rad(this.angle_deg);this.transform("rotate("+(90-this.angle_deg)+"deg)");var d=this;this.flyperiodical=setInterval(function(){d.fly(a)},10)},flyIn:function(){this.bug||this.makeBug();this.stop();var a=Math.round(4*Math.random()-0.5),b=document,c=b.documentElement,
d=b.getElementsByTagName("body")[0],b=window.innerWidth||c.clientWidth||d.clientWidth,c=window.innerHeight||c.clientHeight||d.clientHeight;3<a&&(a=3);0>a&&(a=0);var d={},e;0===a?(d.top=-20,d.left=Math.random()*b):1===a?(d.top=Math.random()*c,d.left=b+50):2===a?(d.top=c+50,d.left=Math.random()*b):(d.top=Math.random()*c,d.left=-40);d["background-position"]=-3*this.options.fly_width+"px -"+2*this.options.fly_height+"px";for(e in d)this.bug.style[e]=d[e];this.drawBug();a={};a.top=this.random(this.options.edge_resistance,
document.documentElement.clientHeight-this.options.edge_resistance);a.left=this.random(this.options.edge_resistance,document.documentElement.clientWidth-this.options.edge_resistance);this.startFlying(a)},flyOff:function(){this.stop();var a=this.random(0,3),b={},c=document,d=c.documentElement,e=c.getElementsByTagName("body")[0],c=window.innerWidth||d.clientWidth||e.clientWidth,d=window.innerHeight||d.clientHeight||e.clientHeight;0===a?(b.top=-200,b.left=Math.random()*c):1===a?(b.top=Math.random()*
d,b.left=c+200):2===a?(b.top=d+200,b.left=Math.random()*c):(b.top=Math.random()*d,b.left=-200);this.startFlying(b)},die:function(){this.stop();var a=this.random(0,2);this.bug.style.backgroundPosition="-"+2*a*this.options.fly_width+"px -"+3*this.options.fly_height+"px";this.alive=!1;this.drop(a)},drop:function(a){var b=this.getPos().top,c=document,d=c.documentElement,c=c.getElementsByTagName("body")[0],e=window.innerHeight||d.clientHeight||c.clientHeight,e=e-this.options.fly_height,f=this.random(0,
20,!0),g=Date.now(),h=this;this.dropTimer=setInterval(function(){h.dropping(g,b,e,f,a)},20)},dropping:function(a,b,c,d,e){a=Date.now()-a;b+=0.002*a*a;b>=c?(clearTimeout(this.dropTimer),this.angle_deg=0,this.angle_rad=this.deg2rad(this.angle_deg),this.transform("rotate("+(90-this.angle_deg)+"deg)"),this.bug.style.top=null,this.bug.style.bottom="-1px",this.twitch(e)):(this.angle_deg=(this.angle_deg+d)%360,this.angle_rad=this.deg2rad(this.angle_deg),this.transform("rotate("+(90-this.angle_deg)+"deg)"),
this.bug.style.top=b+"px")},twitch:function(a,b){b||(b=0);var c=this;(0===a||1===a)&&setTimeout(function(){c.bug.style.backgroundPosition="-"+(2*a+b%2)*c.options.fly_width+"px -"+3*c.options.fly_height+"px";c.twitch(a,++b)},this.random(100,1E3))},rad2deg:function(a){return a*this.rad2deg_k},deg2rad:function(a){return a*this.deg2rad_k},random:function(a,b,c){a=Math.round(a-0.5+Math.random()*(b-a+1));return c?0.5<Math.random()?a:-a:a},next_small_turn:function(){this.small_turn_counter=Math.round(10*
Math.random())},next_large_turn:function(){this.large_turn_counter=Math.round(40*Math.random())},next_stationary:function(){this.toggle_stationary_counter=this.random(50,300)},bug_near_window_edge:function(){this.near_edge=0;this.bug.top<this.options.edge_resistance?this.near_edge|=this.NEAR_TOP_EDGE:this.bug.top>document.documentElement.clientHeight-this.options.edge_resistance&&(this.near_edge|=this.NEAR_BOTTOM_EDGE);this.bug.left<this.options.edge_resistance?this.near_edge|=this.NEAR_LEFT_EDGE:
this.bug.left>document.documentElement.clientWidth-this.options.edge_resistance&&(this.near_edge|=this.NEAR_RIGHT_EDGE);return this.near_edge},getPos:function(){return this.inserted&&this.bug&&this.bug.style?{top:parseInt(this.bug.style.top,10),left:parseInt(this.bug.style.left,10)}:null}},SpawnBug=function(){var a={},b;for(b in Bug)Bug.hasOwnProperty(b)&&(a[b]=Bug[b]);return a},mergeOptions=function(a,b,c){"undefined"==typeof c&&(c=!0);a=c?cloneOf(a):a;for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);
return a},cloneOf=function(a){if(null==a||"object"!=typeof a)return a;var b=a.constructor(),c;for(c in a)a.hasOwnProperty(c)&&(b[c]=cloneOf(a[c]));return b};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
function el_animation(el){
  // variables
  var sticker_img = "dinasour";
  var sticker_msg = ["GET","T-WRECKED"]

  var fontSize = 110
  var textGradient = el.ctx.createLinearGradient(0,600, 0,  600);
  textGradient.addColorStop(0, '#F9E078');
  textGradient.addColorStop(1, '#d36c25');


  // creation
  var bgY= -el.height*0.1;
  var bg = el.image({zIndex: 8, id: "dinosaur", url: "images/dino_big.png", x: -330, y: bgY - 200 });
	var bgFake = el.image({opacity: 0, zIndex: 9, globalCompositeOperation: "source-atop", id: "dinosaur", x: -330, y: bgY - 200});
var textY= el.height*0.28;

var textStrokeStyle = {font:fontSize+"px museo900",lineWidth:16,fillStyle:"rgba(0,0,0,0.5)",strokeStyle:"#ffffff"}
var textStyle = {font:fontSize+"px museo900",  fillStyle:'#960505'}
var textStyle2 = {font:fontSize+"px museo900",  fillStyle:'#960505'}
var messageText = [];
  for(msg in sticker_msg){
    var message = sticker_msg[msg]
    var messageScale = 15/(message.length+6);
    messageText.push(
    el.text({zIndex:1,scale:messageScale, y:textY + (fontSize*msg)*messageScale,text:message,style:textStrokeStyle}),
      el.text({zIndex:1,scale:messageScale, y:textY + (fontSize*msg)*messageScale,text:message,style:textStyle}),
      el.text({zIndex:9,scale:messageScale,globalCompositeOperation:'lighter', y:textY + (fontSize*msg)*messageScale,text:message,style:textStyle2})
    )
  }


  var flameSize=130;
   var test= el.image({id:"test",width:32,height:32, radialGradient: {
	 	size: flameSize,
		inner: "rgba(248,64,32,1)",
		outer: "rgba(128,64,32,0)"
	 }});
   var particles={obj:[],count:180}
   for(var i=0;i<particles.count;i++){
     var smoke= el.image({
       zIndex:4,
       id:"test",width:flameSize,height:flameSize,
       globalCompositeOperation:"lighter"}
     )
     particles.obj.push( smoke );
   }
   var flameWidth = el.width*0.7;
   var smokeTL = new TimelineMax()
     var smoketeTl={};
     for(var i=0;i<particles.count;i++){
     var startRand= {
       x:(i/particles.count)*flameWidth -flameWidth*0.5,
       y:el.height*0.4,
      scale:Math.random()*2};
     var endRnd={velocity:Math.random()*150,angle:-90+Math.random()*20-10}
      smoketeTl[i] = new TimelineMax({repeat:0})
     .set(particles.obj[i],  {x:startRand.x,y:startRand.y,scale:startRand.scale},0)
     .from(particles.obj[i],0.6,{opacity:0.0001,ease:Sine.easeOut},0)
     .from(particles.obj[i],0.2,{scale:0.001,ease:Sine.easeOut},0)
     .to(particles.obj[i],0.2,{opacity:0,ease:Sine.easeIn},1.2+Math.random()*0.5)
     .to(particles.obj[i], 2, {physics2D:{velocity:700+endRnd.velocity, angle:endRnd.angle, gravity:200}},0);

     smokeTL.add(smoketeTl[i],-Math.random()*2)

     }
	el.ready().then(function () {
		var bot_message_tl= new TimelineMax({onUpdate:el.update})
		.from(bg,1,{scale:6,ease:Elastic.easeOut.config(0.3,0.2)},0)
		.to(bg,0.2,{opacity:0.00},1)
		.set(bgFake,{opacity:1},1)
		.from(messageText,1,{y:600,ease:Expo.easeOut},0)
		.add(smokeTL,0)
		.to(messageText,0.5,{y:"+=800",ease:Expo.easeIn},2.6)


		var canvas_container = el.ctx.canvas;
		canvas_container.addEventListener('click',function(){ bot_message_tl.play(0);});
	}).catch(function (e) {
		console.log("READY FAILED", e);
	});
}

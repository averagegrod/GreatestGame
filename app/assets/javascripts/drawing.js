$(function(){
// Problem: No user interaction causes a change to the application
// Solution: When user interacts cause appropriate change

var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

// When a user clicks on a contol list item
$(".controls").on("click", "li",function(){
   // Deselct sibling elements
  $(this).siblings().removeClass("selected");
  // Select clicked element 
  $(this).addClass("selected");
  
  // cache the color of the selected element
  color = $(this).css("background-color");
});


// When New Color is clicked 
$("#revealColorSelect").click(function(){
   // Show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
});


// update the new color span
function changeColor(){
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();  
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

// When color sliders are changed 
$("input[type=range]").change(changeColor);


// When Add Color is pressed
$("#addNewColor").click(function(){
  // Append the color to the conrtols ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  $newColor.click();
  // Select the new color
});
  

// On canvas mouse events
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  // Draw lines
  if(mouseDown){
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
});

$canvas.mouseup(function(){
  mouseDown = false;
});

$canvas.mouseleave(function(){
  $canvas.mouseup();
});

});
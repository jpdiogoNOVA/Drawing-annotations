function setup() {
    const canvas = createCanvas(640, 480);
    canvas.parent('myCanvas');
    background("#fbf8f3");
  }
  
  function draw() {
    if (mouseIsPressed) {
      pen();
    }
  }
  
  function pen() {
    // set the color and weight of the stroke
    stroke(0, 0, 0, 255);
    strokeWeight(2);
  
    // draw a line from current mouse point to previous mouse point
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function brush_click() {
  document.querySelectorAll('.brush_row').forEach(b => b.addEventListener('click', event => {
    console.log("Brush clicked.");
    let img = b.children[0];
    let previous_src = img.src;
    if(b.classList.contains('brush_selected')) {
      // remove alignment through class removal and exchange image
      img.src = previous_src.split('-')[0]+'.png';
      b.classList.remove('brush_selected');
    }
    else {
      document.querySelectorAll('.brush_selected').forEach(s => {
        s.classList.remove('brush_selected');
        // remove previously selected brushes and rollback image
        let active_previous_src = s.children[0].src;
        s.children[0].src = active_previous_src.split('-')[0]+'.png';
      });
      // add alignment through new class and exchange image
      b.classList.add('brush_selected');
      img.src = previous_src.split('.png')[0]+'-active.png';
    }
  }));
  
}

function keepBrushesOpen() {
  $(document).ready(function() {
    $('#dropdownLine').on('click.bs.dropdown', function(event) {
      event.stopPropagation();
    });
  
    $('.brush_row').on('click', function(event) {
      event.stopPropagation();
      // Add your own custom logic here for handling the brush row clicks
    });
  });
}

keepBrushesOpen();
brush_click();
  
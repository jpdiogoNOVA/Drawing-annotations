let active_brush = '';

function setup() {
    const canvas = createCanvas(640, 480);
    canvas.parent('myCanvas');
    background("#fbf8f3");
  }
  
  function draw() {
    if (mouseIsPressed) {

      switch(active_brush) {
        case '':
          pen();
        break;
        case 'marker_brush':
          marker();
        break;
        case 'fountain_pen':
          fountain_pen();
        break;
        case 'felt_tip_pen':
          feltip_pen();
        break;
        case 'spray_paint':
          spray_paint();
        break;
      }
    }

  }
  
/* Drawing styles */
function pen() {
    // set the color and weight of the stroke
    stroke(0, 0, 0, 255);
    strokeWeight(2);
  
    // draw a line from current mouse point to previous mouse point
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function marker() {
  // set the color and brush style
  fill(255, 200, 103, 40)
  noStroke()
  
	// draw a circle at the current mouse point, with diameter of 50 pixels
  circle(mouseX, mouseY, 50)
}

function feltip_pen() {
  // set the color and brush style
  fill(60, 180, 0, 150);
  noStroke();

  // move the origin (0,0) to the current mouse point
  translate(mouseX, mouseY);

  // find the angle of the direction the mouse is moving in
  // then rotate the canvas by that angle
  const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX);
  rotate(angle);

  // set minumum width and height of the toothpick-shaped ellipse
	const minSize = 4;
	
	// find the distance between current mouse point and previous mouse point
	const distance = dist(mouseX, mouseY, pmouseX, pmouseY);
	
	// draw the toothpick-shaped ellipse
	ellipse(0, 0, distance * 2 + minSize, minSize);
}

function fountain_pen() {
  // set the color and brush style
  stroke(0, 0, 0, 255);
  strokeWeight(1);
	const width = 5;

  // set the number of times we lerp the line in the for loop
  const lerps = 16;

	// repeat the slanted line with lerping
  for (let i = 0; i <= lerps - 1; i++) {

		// find the lerped x and y coordinates between the mouse points
    const x = lerp(mouseX, pmouseX, i / lerps);
    const y = lerp(mouseY, pmouseY, i / lerps);

		// draw a slanted line
    line(x - width, y - width, x + width, y + width);
  }
}

function spray_paint() {
  // set the color and brush style
  stroke(0, 0, 0, 255)
  strokeWeight(1)

	// find the speed of the mouse movement
  const speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY)

	// set minimum radius and spray density of spraypaint brush
	const minRadius = 10
	const sprayDensity = 80
  
  // find radius of the spray paint brush and radius squared
  const r = speed + minRadius
  const rSquared = r * r

	// set the number of times we lerp the points in the for loop
	const lerps = 10

  // repeat the random points with lerping
  for (let i = 0; i < lerps; i++) {
    
    // find the lerped X and Y coordinates
    const lerpX = lerp(mouseX, pmouseX, i / lerps)
    const lerpY = lerp(mouseY, pmouseY, i / lerps)
    
    // draw a bunch of random points within a circle
    for (let j = 0; j < sprayDensity; j++) {

      // pick a random position within the circle
      const randX = random(-r, r)
      const randY = random(-1, 1) * sqrt(rSquared - randX * randX)

      // draw the random point
      point(lerpX + randX, lerpY + randY)
    }
  }
}

function brush_click() {
  document.querySelectorAll('.brush_row').forEach(b => b.addEventListener('click', event => {
    console.log("Brush clicked.");
    let img = b.children[0];
    let previous_src = img.src;
    if(b.classList.contains('brush_selected')) {
      // remove alignment through class removal and exchange image
      img.src = previous_src.split(/-(?!.*-)/)[0]+'.png';
      b.classList.remove('brush_selected');

      active_brush = '';
    } else {
      // remove previously selected brushes and rollback image
      document.querySelectorAll('.brush_selected').forEach(s => {
        s.classList.remove('brush_selected');
        let active_previous_src = s.children[0].src;
        s.children[0].src = active_previous_src.split(/-(?!.*-)/)[0]+'.png';
      });

      // add alignment through new class and exchange image
      b.classList.add('brush_selected');
      img.src = previous_src.split('.png')[0]+'-active.png';

      active_brush = b.id;
    }
  }));
}


function marker() {
  // set the color and brush style
  fill(255, 200, 103, 40)
  noStroke()
  
	// draw a circle at the current mouse point, with diameter of 50 pixels
  circle(mouseX, mouseY, 50)


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
  
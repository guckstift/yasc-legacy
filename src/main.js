import Display from "./display.js";
import Map from "./map.js";
import Camera from "./camera.js";
import Mouse from "./mouse.js";

let display = new Display();
let map = new Map(display, 16);
let camera = new Camera(display);
let mouse = new Mouse(display);
let pickCoord = undefined;

map.setHeight(2, 2, 1);

display.frame = function ()
{
	camera.update();
	map.draw(camera, pickCoord);
}

mouse.down.right = e => {
	mouse.lock();
};

mouse.up.any = e => {
	mouse.unlock();
};

mouse.move = e => {
	if(mouse.locked) {
		camera.pos[0] += mouse.rel[0] / camera.scale;
		camera.pos[1] -= mouse.rel[1] / camera.scale;
		pickCoord = undefined;
	}
	else {
		pickCoord = map.pick(camera, mouse.pos[0], mouse.pos[1]);
	}
};

mouse.wheel.up = e => {
	camera.scale *= 1.25;
};

mouse.wheel.down = e => {
	camera.scale /= 1.25;
};

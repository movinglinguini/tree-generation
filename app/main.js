import { ENGINE } from './ctx/engine.js';
import { ringedPlanetUpdate, drawRingedPlanet } from './examples/ringed-planet.js';
import { drawCactus } from './examples/cactus.js';
import { drawSpiral, updateSpiral }  from './examples/spiral.js';

function main() {
	ENGINE.setContainerEl(document.querySelector('.renderer'));

	// draw some examples
	// drawRingedPlanet(ENGINE);
	// drawCactus(ENGINE);
	// drawSpiral(ENGINE);
	// ENGINE.renderObject(grid);

	drawSpiral(ENGINE);

	buildExampleMenu();
}

function buildExampleMenu() {
	
}

window.onload = main;

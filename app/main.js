import { ENGINE } from './ctx/engine.js';
import { ringedPlanetUpdate, drawRingedPlanet } from './examples/ringed-planet.js';
import { drawCactus } from './examples/cactus.js';
import { drawSpiral, updateSpiral }  from './examples/spiral.js';

function main() {
	ENGINE.setContainerEl(document.querySelector('.renderer'));

	// draw some examples
	// drawRingedPlanet(ENGINE);
	// drawCactus(ENGINE);
	drawSpiral(ENGINE);

	const grid = new THREE.GridHelper(1000, 100);
	// ENGINE.renderObject(grid);

	ENGINE.onUpdate = (delta) => {
		// ringedPlanetUpdate(delta);
		updateSpiral(delta);
	}
}

window.onload = main;
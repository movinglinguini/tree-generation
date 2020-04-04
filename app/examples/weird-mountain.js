import { PointMesh } from '../classes/UpdatableMesh.class.js';
import { Utils } from '../utils/utils.js';

const mountainMesh = new PointMesh();

function mountainRule() {
	const firstPoint = new THREE.Vector3();

	// for x iterations around `first point`
	const radius = 200;
	const iters = 400;
	const height = 30;

	const points = [];

	for (let i = 0; i < iters; i += 1) {
		for (let k = 0; k < iters / 2; k += 1) {
			const sphCoords = {
				phi: (Math.PI* (i / iters)),
				theta: (2 * Math.PI) * (i / iters),
				radius: Math.abs(Math.sin(k) * radius),
			}

			points.push(...Utils.vector3ToPointBuffer(Utils.sphericalToVector3(sphCoords)));
		}
	}

	return points;
}

export function drawMountain(ENGINE) {
	// point generation rule
	const points = mountainRule();
	
	const pointMaterial = new THREE.PointsMaterial({ size: 2, color: 0xcc7964 })
	mountainMesh.addPoints(points, pointMaterial);

	ENGINE.renderObject(mountainMesh.getMesh());
	ENGINE.addUpdateRoutine((delta) => mountainMesh.doUpdateRoutine(delta), 'mountain-update');
}

export function updateMountain() {}

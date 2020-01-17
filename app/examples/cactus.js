import { Utils } from '../utils/utils.js';
import { PointMesh } from '../classes/ProcMesh.class.js';

let cactusMesh = null;
const rotationSpeed = 2;

export function drawCactus(ENGINE) {
	const baseRadius = 15;
	const levelLimit = 5;
	const pointLimit = 500;

	cactusMesh = new PointMesh();
	const cactusOffset = new THREE.Vector3();
	const points = [];
	for (let i = 0; i < levelLimit; i += 1) {
		const levelRadius = (baseRadius * ((levelLimit - i) / levelLimit) * Utils.clamp(Math.random(), .75, 1));

		console.log('Level Radius: ', levelRadius);
		console.log('Cactus Offset: ', cactusOffset);

		for (let p = 0; p < pointLimit; p += 1) {
			const sph = Utils.getRandomSphericalCoord({
				radiusFunc(x) {
					return levelRadius;
				},
			}, { asVector3: true });

			points.push(...Utils.vector3ToPointBuffer(sph.add(cactusOffset)));
		}
		const offsetMovement = Utils.getRandomSphericalCoord({
			radiusFunc(x) {
				return levelRadius;
			},
			phiFunc(x) {
				return Math.min(x, Math.PI * .75);
			},
		}, { asVector3: true });

		console.log('Moving offset by vector: ', offsetMovement);
		cactusOffset.add(offsetMovement);
	}

	cactusMesh.addPoints(points, new THREE.PointsMaterial({ color: 0xF2A5EA, sizeAttenuation: false, size: 2 }));
	ENGINE.renderObject(cactusMesh.getMesh());
}

export function updateCactus(delta) {
	const rotation = THREE.Matrix4().makeRotationY(delta * rotationSpeed);
	cactusMesh.getMesh().applyMatrix(rotation);
}

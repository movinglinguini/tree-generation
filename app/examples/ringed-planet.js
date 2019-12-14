import { Utils } from '../utils/utils.js';

const pointMeshRotationSpeed = Math.PI * .0001;
const pointMeshTilt = new THREE.Matrix4().makeRotationZ(15 * Math.PI / 180);
const inverseTilt = new THREE.Matrix4().getInverse(pointMeshTilt);
const ringMeshRotationSpeed = Math.PI * .0001;
const ringMeshTilt = pointMeshTilt;
const ringMeshTiltInverse = inverseTilt;

let pointMesh = null;
let ringMesh = null;

export function drawRingedPlanet(ENGINE) {
	// draw a bunch of points on a sphere
	const radius = 100;
	const twoPi = Math.PI * 2;
	const points = [];
	let phi = 0.01;
	const amtBands = 25;
	while (phi < Math.PI) {

		for (let i = 0; i < 75; i += 1) {
			const theta = Math.random() * twoPi;
			const coord = Utils.sphericalToVector3(radius, phi, theta);
			points.push(coord.x, coord.y, coord.z);
		}

		phi += Math.PI / amtBands;

	}

	const geom = new THREE.BufferGeometry();
	geom.setAttribute('position', new THREE.BufferAttribute( Float32Array.from(points), 3 ));
	pointMesh = new THREE.Points(geom, new THREE.PointsMaterial({ color: 0xF2A5EA, sizeAttenuation: true, size: 2 }));
	ENGINE.renderObject(pointMesh);

	// draw a red ring around the sphere
	let ringRadius = radius * ((Math.random() * .75) + 1);
	const halfPi = Math.PI / 2;
	const ringPoints = [];
	for (let k = 0; k <= 5; k += 1) {
		for (let i = 0; i < 500; i += 1) {
			const theta = Math.random() * twoPi;
			const wobble = ((Math.random()) - .5) * .01;
			const coord = Utils.sphericalToVector3(ringRadius - wobble, halfPi + wobble, theta);
			ringPoints.push(coord.x, coord.y, coord.z,  coord.x, coord.y - .05, coord.z, coord.x, coord.y + .05, coord.z);
		}

		ringRadius = ringRadius + (Math.random() * (ringRadius * .25));
	}

	const ringGeom = new THREE.BufferGeometry();
	ringGeom.setAttribute('position', new THREE.BufferAttribute( Float32Array.from(ringPoints), 3 ));
	ringMesh = new THREE.Points(ringGeom, new THREE.PointsMaterial({ color: 0xEBF2A5, sizeAttenuation: true, size: 2 }));
	ENGINE.renderObject(ringMesh);

	pointMesh.applyMatrix(pointMeshTilt);	
	ringMesh.applyMatrix(ringMeshTilt);
}

export function ringedPlanetUpdate(delta) {
	const pointMeshRotation = 
		new THREE.Matrix4().makeRotationY(pointMeshRotationSpeed * delta);

	const ringMeshRotation =
		new THREE.Matrix4().makeRotationY(ringMeshRotationSpeed * delta);

	const pointMeshTransformation = new THREE.Matrix4()
		.multiply(pointMeshTilt)
		.multiply(pointMeshRotation)
		.multiply(inverseTilt);

	const ringMeshTransformation = new THREE.Matrix4()
		.multiply(ringMeshTilt)
		.multiply(ringMeshRotation)
		.multiply(ringMeshTiltInverse)
		
	pointMesh.applyMatrix(pointMeshTransformation);
	ringMesh.applyMatrix(ringMeshTransformation);
}


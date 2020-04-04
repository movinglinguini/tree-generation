import { Utils } from '../utils/utils.js';
import { PointMesh } from '../classes/UpdatableMesh.class.js';

let spiralMesh = null;
let rotationSpeed = .0001;
let radius = 150;
let pulsateSpeed = 0.0001;

export function drawSpiral(ENGINE) {
	const spin = 50;
	const steps = spin * 20;

	const points = [];
	const invPoints = [];
	spiralMesh = new PointMesh();
	for (let i = 0; i < steps; i += 1) {
		const sph = Utils.getRandomSphericalCoord({
			radiusFunc(x) {
				return radius //* Utils.makeRandomNumberBetween(.95, 1.025);
			},
			phiFunc(x) {
				return (i * (Math.PI / steps)) //* Utils.makeRandomNumberBetween(.94, 1.025);
			},
			thetaFunc(x) {
				return spin * (i * Math.PI / steps);
			},
		}, { asVector3: true });

		const invSph = { ...sph };
		invSph.theta = invSph.theta * -1;

		points.push(...Utils.vector3ToPointBuffer(sph));
		invPoints.push(...Utils.vector3ToPointBuffer(invSph));
	}

	const pointMaterial = new THREE.PointsMaterial({ size: 2, color: 0xcc7964 })
	spiralMesh.addPoints(points, pointMaterial);
	spiralMesh.addPoints(invPoints, pointMaterial);

	ENGINE.renderObject(spiralMesh.getMesh());
	ENGINE.renderObject(spiralMesh.getMesh(1));
	spiralMesh.setMeshUpdateRoutine({
		rotationSpeed,
		elapsedTime: 0,
		oldScale: new THREE.Matrix4(),
		oldInvScale: new THREE.Matrix4(),
	}, updateSpiral);
	ENGINE.addUpdateRoutine((delta) => spiralMesh.doUpdateRoutine(delta), 'spiral-update');
}

let elapsedTime = 0;
let currentRadius = radius;
let oldScale = new THREE.Matrix4();
let oldInvScale = new THREE.Matrix4();

export function updateSpiral(delta) {
	const rotationSpeed = this.getParamValue('rotationSpeed');
	const rotation = new THREE.Matrix4().makeRotationY(delta * rotationSpeed);

	// const rotation1 = new THREE.Matrix4().makeRotationZ(delta * rotationSpeed * 3);
	// const rotation2 = new THREE.Matrix4().makeRotationX(delta * rotationSpeed * 3);
	const scaleSize = Math.cos(elapsedTime * pulsateSpeed) + 0.000001;
	const invScaleSize = Math.sin(elapsedTime * (pulsateSpeed)) + 0.000001;


	this.setParam('elapsedTime', delta, '+=');
	const newScale = new THREE.Matrix4().makeScale(scaleSize, scaleSize, scaleSize);
	const newInvScale = new THREE.Matrix4().makeScale(invScaleSize, invScaleSize, invScaleSize);
	const oldScale = this.getParamValue('oldScale');

	const transformation = new THREE.Matrix4()
		// .multiply(oldScale.getInverse(oldScale))
		.multiply(rotation)
		// .multiply(rotation1)
		// .multiply(newScale);

	this.setParam('oldScale', newScale);

	const oldInvScale = this.getParamValue('oldInvScale');

	const invTransformation = new THREE.Matrix4()
		// .multiply(oldInvScale.getInverse(oldInvScale))
		// .multiply(newInvScale)
		.multiply(rotation.getInverse(rotation))
		// .multiply(rotation2);

	this.setParam('oldInvScale', newInvScale);

	const spiralMesh = this.getParamValue('mesh');
	spiralMesh.getMesh().applyMatrix(transformation);
	spiralMesh.getMesh(1).applyMatrix(invTransformation);
}

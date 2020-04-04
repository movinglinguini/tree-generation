import { UpdateRoutine } from './UpdateRoutine.class.js';

export class Mesh {
	constructor(vertexArr) {
		this.meshArr = [];
	}

	getMesh(meshIndex = 0) {
		return this.meshArr[meshIndex];
	}

	addMesh(mesh, mIndex = -1) {
		if (mIndex === -1) {
			this.meshArr.push(mesh);
		} else {
			this.meshArr[mIndex] = mesh;
		} 

		return this.getMesh(mIndex === -1 ? this.meshArr.length - 1 : mIndex);
	}
}

export class UpdatableMesh extends Mesh {
	constructor(vertexArr) {
		super(vertexArr);
		this._updateRoutine = new UpdateRoutine();
	}

	setMeshUpdateRoutine(parameters, routine) {
		parameters['mesh'] = this;
		this._updateRoutine = new UpdateRoutine(parameters, routine);
	}

	doUpdateRoutine(delta) {
		this._updateRoutine.doRoutine(delta);
	}
}

export class PointMesh extends UpdatableMesh {
	constructor(vertexArr) {
		super(vertexArr);
	}

	addPoints(pointArr, materialDef = new THREE.PointsMaterial({ size: 2, sizeAttenuation: false })) {
		const geom = new THREE.BufferGeometry();
		geom.setAttribute('position', new THREE.BufferAttribute( Float32Array.from(pointArr), 3 ));
		// this.meshArr.push(
		// 	new THREE.Points(geom, materialDef)
		// );

		return this.addMesh(new THREE.Points(geom, materialDef));
	}
}
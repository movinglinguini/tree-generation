export class ProcMesh {
	constructor(pointArr) {
		this.meshArr = [];
	}

	addPoints(pointArr, materialDef = new THREE.PointsMaterial({ size: 2, sizeAttenuation: false })) {
		const geom = new THREE.BufferGeometry();
		geom.setAttribute('position', new THREE.BufferAttribute( Float32Array.from(pointArr), 3 ));
		this.meshArr.push(
			new THREE.Points(geom, materialDef)
		);

		return this.meshArr[this.meshArr.length - 1];
	}

	getMesh(meshIndex = 0 ) {
		return this.meshArr[meshIndex];
	}
}
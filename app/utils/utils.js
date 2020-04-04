export const Utils = {
	sphericalToVector3(sphCoords) {
		return new THREE.Vector3().setFromSpherical(new THREE.Spherical(sphCoords.radius, sphCoords.phi, sphCoords.theta));
	},
	vector3ToPointBuffer(vector3) {
		return [ vector3.x, vector3.y, vector3.z ];
	},
	getRandomSphericalCoord(funcs = {
		radiusFunc: (x) => { return x; },
		phiFunc: (x) => { return x; },
		thetaFunc: (x) => { return x; },
	}, config = {
		asVector3: false,
	}) {
		const sph = {
			radius: funcs.radiusFunc ? funcs.radiusFunc(Math.random()) : Math.random(),
			phi: funcs.phiFunc ? funcs.phiFunc(Math.random()) : Math.random() * Math.PI * 2,
			theta: funcs.thetaFunc ? funcs.thetaFunc(Math.random()) : Math.random() * Math.PI * 2,
		};

		if (config) {
			if (config.asVector3) {
				return this.sphericalToVector3(sph.radius, sph.phi, sph.theta);
			}
		}

		return sph;
	},
	clamp(x, min, max) {
		return Math.max(min, Math.min(x, max));
	},
	makeRandomNumberBetween(min = 0, max = 1) {
		return (Math.random() * (max - min)) + min;
	}
}


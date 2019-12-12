export const SceneManager = {
	camera: null,
	scene: new THREE.Scene(),
	setCamera(properties = {
		fov: 45,
		aspect: .5,
		near: 1,
		far: 1000,
		defaultPosition: {
			x: 10,
			y: 10,
			z: 0,
		},
	}) {
		if (!this.camera) {
			this.camera = new THREE.PerspectiveCamera(
				properties.fov || 45,
				properties.aspect,
				properties.near || 1,
				properties.far || 1000,
			);
			return;
		}

		this.camera.fov = properties.fov;
		this.camera.aspect = properties.aspect;
		this.camera.near = properties.near;
		this.camera.far = properties.far;

		this.camera.position.set(properties.defaultPosition.x, properties.defaultPosition.y, properties.defaultPosition.z);

		this.camera.updateProjectionMatrix();
	},
	addToScene(obj3d) {
		if (Array.isArray(obj3d)) {
			this.scene.add(...obj3d);
			return;
		}
		
		this.scene.add(obj3d);
	},
	removeFromScene(obj3d) {
		if (Array.isArray(obj3d)) {
			this.scene.remove(...obj3d);
			return;
		}
		
		this.scene.remove(obj3d);
	},
}

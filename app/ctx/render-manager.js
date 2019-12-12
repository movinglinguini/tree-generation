export const RenderManager = {
	renderer: new THREE.WebGLRenderer(),
	resizeRenderer(width, height) {
		this.renderer.setSize(width, height);
	},
	draw(container, scene, camera) {
		this.resizeRenderer(container.width, container.height);
		this.renderer.render(scene, camera);
	},
};

RenderManager.renderer.setPixelRatio(window.devicePixelRatio);

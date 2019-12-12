import { RenderManager as eRenderManager } from './render-manager.js';
import { SceneManager as eSceneManager } from './scene-manager.js';

export const ENGINE = {
	_container: {
		el: null,
		width: null,
		height: null,
	},
	_containerChangeFlag: false,
	_cameraControls: null,
	_lastDrawTime: new Date(),
	renderObject(threeObj) {
		eSceneManager.addToScene(threeObj);
	},
	destroyObject(threeObj) {
		eSceneManager.removeFromScene(threeObj);
	},
	setContainerEl(containerEl) {
		const domRect = containerEl.getBoundingClientRect();
		if (
			this._container.el !== containerEl
			|| this._container.width !== domRect.width
			|| this._container.height !== domRect.height
		) {
			this._containerChangeFlag = true;
		}

		this._container.el = containerEl;
		this._container.width = domRect.width;
		this._container.height = domRect.height;

		this.setCamera();
		this._container.el.appendChild(eRenderManager.renderer.domElement);
		this._cameraControls = new THREE.OrbitControls(eSceneManager.camera, eRenderManager.renderer.domElement);
		this._cameraControls.enableDamping = true;
	},
	draw() {
		requestAnimationFrame(this.draw.bind(this));
		if (!this._container.el) {
			console.log('Waiting for container...');
			return;
		}

		if (this._containerChangeFlag) {
			this.setCamera();
			this._containerChangeFlag = false;
		}

		const now = new Date().getTime();
		this.onUpdate(now - this._lastDrawTime);
		this._lastDrawTime = now;
		this._cameraControls.update();
		eRenderManager.draw(this._container, eSceneManager.scene, eSceneManager.camera);
	},

	setCamera() {
		eSceneManager.setCamera({
			fov: 45,
			aspect: (this._container.width / this._container.height),
			near: 1,
			far: 10000,
			defaultPosition: {
				x: 400, y: 200, z: 0,
			},
		});
	},

	onUpdate() {},
};

ENGINE._lastDrawTime = new Date().getTime();
ENGINE.draw();

import { RenderManager as eRenderManager } from './render-manager.js';
import { SceneManager as eSceneManager } from './scene-manager.js';

const ENGINE_UTILS = {
	deg2Rad: ( (deg) => deg * (Math.PI/ 180) ),
}

export const ENGINE = {
	_container: {
		el: null,
		width: null,
		height: null,
	},
	_containerChangeFlag: false,
	_cameraControls: null,
	_grids: {
		xz: new THREE.GridHelper(1000, 100),
		xy: new THREE.GridHelper(1000, 100).rotateX(ENGINE_UTILS.deg2Rad(90)),
	},
	_canDrawGrids: {
		xz: true,
		xy: false,
	},
	_lastDrawTime: new Date(),
	_updateRoutines: {},
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

		{
			Object.keys(this._canDrawGrids).forEach(k => {
				if (!this._canDrawGrids[k]) {
					this._grids[k].visible = false;
				}
			})
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

	onUpdate(delta) {
		Object.values(this._updateRoutines).forEach(routine => routine(delta));
	},

	addUpdateRoutine(newRoutine, newRoutineKey, allowReplace=false) {
		let canAddRoutine = (
			!this._updateRoutines[newRoutineKey]
			|| allowReplace
		);

		if (!canAddRoutine) {
			console.warn('Failed to add routine: ', newRoutineKey);
			return;
		}

		console.log('new routine::key:', newRoutineKey, 'func:', newRoutine);
		this._updateRoutines[newRoutineKey] = newRoutine;
	},

	utils: ENGINE_UTILS,
};

// eSceneManager.addToScene(ENGINE._grids.xz);
// eSceneManager.addToScene(ENGINE._grids.xy);

ENGINE._lastDrawTime = new Date().getTime();
ENGINE.draw();

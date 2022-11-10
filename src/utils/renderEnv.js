import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let camera, controls, scene, renderer;

const renderEnv = () => {
  const init = (durations) => {
    console.log(durations);
    const evnContainer = document.getElementById("env");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    THREE.Cache.enabled = true;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    evnContainer.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.x = -10;
    camera.position.y = 16;
    camera.position.z = 22;

    var geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
    var material = new THREE.MeshPhongMaterial({
      color: 0x383838,
      shininess: 0.1,
      metalness: 0.5,
    });

    var floor = new THREE.Mesh(geometry, material);
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = THREE.MathUtils.degToRad(90.0);
    floor.position.y = 0.5;

    scene.add(floor);
    floor.receiveShadow = true;
    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 6, 0);
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxDistance = 25;

    controls.maxPolarAngle = Math.PI / 2;

    /// text

    const fontLoader = new FontLoader();
    fontLoader.load(
      // resource URL
      "kalameh.json",

      // onLoad callback
      function (font) {
        const textGeo = new TextGeometry(`زور ${durations.remain} دﻮﺒﻧ`, {
          font: font,
          size: 2,
          height: 0.01,
          curveSegments: 12,
          bevelThickness: 0.2,
          bevelSize: 0.1,
          bevelEnabled: true,
        });
        textGeo.computeBoundingBox();
        var textMaterial = new THREE.MeshPhongMaterial({
          color: 0x000000,
          specular: 0xffffff,
          shininess: 0.5,
          metalness: 0.8,
        });
        const textMesh1 = new THREE.Mesh(textGeo, textMaterial);

        textMesh1.position.x = -6;
        textMesh1.position.y = 0.8;
        textMesh1.position.z = 7;
        textMesh1.rotation.x = -Math.PI / 2;
        textMesh1.castShadow = true;
        scene.add(textMesh1);
      }
    );

    const loader = new GLTFLoader();
    loader.load(
      "/tower.glb",
      function (gltf) {
        const theModel = gltf.scene;
        theModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        // Set the models initial scale
        theModel.scale.multiplyScalar(0.01);
        scene.add(theModel);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    loader.load(
      "/ak47.glb",
      function (gltf) {
        const theModel = gltf.scene;
        theModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        // Set the models initial scale
        // theModel.scale.multiplyScalar(1);
        theModel.position.y = 0.5;
        theModel.position.z = -4;
        theModel.rotation.x = Math.PI / 2;
        scene.add(theModel);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const shadowCameraRange = 13;
    // lights

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.castShadow = true;
    dirLight1.position.set(10, 10, 1);
    scene.add(dirLight1);
    dirLight1.castShadow = true;

    dirLight1.shadow.camera.left = -shadowCameraRange;
    dirLight1.shadow.camera.right = shadowCameraRange;
    dirLight1.shadow.camera.top = shadowCameraRange;
    dirLight1.shadow.camera.bottom = -shadowCameraRange;

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.position.set(-5, 10, -4);
    scene.add(dirLight2);
    // dirLight2.castShadow = true;

    dirLight2.shadow.camera.left = -shadowCameraRange;
    dirLight2.shadow.camera.right = shadowCameraRange;
    dirLight2.shadow.camera.top = shadowCameraRange;
    dirLight2.shadow.camera.bottom = -shadowCameraRange;

    const light = new THREE.PointLight(0xffffff, 8, 12, 1.2);
    light.position.set(2, 10, 20);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    window.addEventListener("resize", _onWindowResize);
    _run();
  };

  const _onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  const _render = () => {
    renderer.render(scene, camera);
  };
  const _run = () => {
    requestAnimationFrame(_run);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    _render();
    scene.rotation.y += 0.001;
  };
  return { init };
};

export default renderEnv;

window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        alpha: true,
    });
    // ウィンドウサイズ設定
    width = document.getElementById('mainCanvas').getBoundingClientRect().width;
    height = document.getElementById('mainCanvas').getBoundingClientRect().height;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 000000 ); // 背景色
    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 400, -1000);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = '3d/reimeiEarth.glb';

    // window size
    const w_height = window.innerHeight;

    let model = null;
    loader.load(url,function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            model.scale.set(10,10,10);

            scene.add(gltf.scene);


            // model["test"] = 100;
        },
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 1; // 光の強さ
    light.position.set(3, 10, 1);
    // シーンに追加
    scene.add(light);


    //環境光源(アンビエントライト)：すべてを均等に照らす、影のない、全体を明るくするライト
    const ambient = new THREE.AmbientLight(0xf8f8ff, 0.7);
    scene.add(ambient); //シーンにアンビエントライトを追加

    // 初回実行
    tick();

    function tick() {
        controls.update();

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    animate();

    function animate() {
        // window.requestAnimationFrame:再描画のタイミングで指定した関数が呼び出される
        // https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
        requestAnimationFrame( animate );
        render();
    }
    
    function render() {
    
        model.rotation.y += 0.005;	// y軸方向に回転
    
        // 再描画
        renderer.render(scene, camera); 
    
    }
}



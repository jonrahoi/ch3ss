var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.rotation.order = 'YXZ';
camera.position.y = -7;
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({ antialias: true });		

renderer.setClearColor("#ffffff");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

var light = new THREE.AmbientLight(0x404040);
scene.add(light);

var boardGeometry = new THREE.BoxGeometry(1, 1, 1);
var boardMaterial = new THREE.MeshLambertMaterial({color: 0xfdfdfd, transparent: true, opacity: 0.1});

var n = 5;
/* board (group of 125 cubes) is an Object3D while piecesGroup is a THREE.Group so that
the raycaster recognized the board as a child of the scene but not the pieces */
var board = new THREE.Object3D();

for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
        for (var z = 0; z < n; z++) {
            var cube = new THREE.Mesh(boardGeometry, boardMaterial.clone());
            cube.position.set(x - 2, y - 2, z - 2);
            board.add(cube);
        }
    }
}

scene.add(board);

var whiteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
var blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

var piecesGroup = new THREE.Group();

var pawnGeometry = new THREE.SphereGeometry(0.35, 16, 12);

for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 5; j++) {
        var whitePawn = new THREE.Mesh(pawnGeometry, whiteMaterial.clone());
        whitePawn.position.set(j - 2, -1, i - 2);
        piecesGroup.add(whitePawn);
    }
}

for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 5; j++) {
        var blackPawn = new THREE.Mesh(pawnGeometry, blackMaterial.clone());
        blackPawn.position.set(j - 2, 1, i + 1);
        piecesGroup.add(blackPawn);
    }
}

var rookGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);

function addRook(color, position) {
    var rook;

    if (color == "white") {
        rook = new THREE.Mesh(rookGeometry, whiteMaterial.clone());	
        rook.position.set(position, -2, -2);
    }

    if (color == "black") {
        rook = new THREE.Mesh(rookGeometry, blackMaterial.clone());
        rook.position.set(position, 2, 2);
    }

    piecesGroup.add(rook);
}

addRook("white", -2);
addRook("white", 2);
addRook("black", -2);
addRook("black", 2);

var bishopGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.5, 16);

function addBishop(color, position) {
    var bishop;

    if (color == "white") {
        bishop = new THREE.Mesh(bishopGeometry, whiteMaterial.clone());
        bishop.position.set(position, -2, -1);
    }

    if (color == "black") {
        bishop = new THREE.Mesh(bishopGeometry, blackMaterial.clone());
        bishop.position.set(position, 2, 1);
    }
    piecesGroup.add(bishop);
}

addBishop("white", -2);
addBishop("white", 1);
addBishop("black", -2);
addBishop("black", 1);

var knightGeometry = new THREE.OctahedronGeometry(0.35);

function addKnight(color, position) {
    var knight;

    if (color == "white") {
        knight = new THREE.Mesh(knightGeometry, whiteMaterial.clone());
        knight.position.set(position, -2, -2);
    }

    if (color == "black") {
        knight = new THREE.Mesh(knightGeometry, blackMaterial.clone());
        knight.position.set(position, 2, 2);
    }
    piecesGroup.add(knight);
}

addKnight("white", -1);
addKnight("white", 1);
addKnight("black", -1);
addKnight("black", 1);

var unicornGeometry = new THREE.IcosahedronGeometry(0.35);

function addUnicorn(color, position) {
    var unicorn;

    if (color == "white") {
        unicorn = new THREE.Mesh(unicornGeometry, whiteMaterial.clone());
        unicorn.position.set(position, -2, -1);
    }

    if (color == "black") {
        unicorn = new THREE.Mesh(unicornGeometry, blackMaterial.clone());
        unicorn.position.set(position, 2, 1);
    }
    piecesGroup.add(unicorn);
}

addUnicorn("white", -1);
addUnicorn("white", 2);
addUnicorn("black", -1);
addUnicorn("black", 2);

var kingGeometry = new THREE.TetrahedronGeometry(0.6);

whiteKing = new THREE.Mesh(kingGeometry, whiteMaterial.clone());
whiteKing.position.set(0, -2, -2);a
piecesGroup.add(whiteKing);

blackKing = new THREE.Mesh(kingGeometry, blackMaterial.clone());
blackKing.position.set(0, 2, 2);
piecesGroup.add(blackKing);

var queenGeometry = new THREE.ConeGeometry(0.25, 0.75, 16);

whiteQueen = new THREE.Mesh(queenGeometry, whiteMaterial.clone());
whiteQueen.position.set(0, -2, -1);
piecesGroup.add(whiteQueen);

blackQueen = new THREE.Mesh(queenGeometry, blackMaterial.clone());
blackQueen.position.set(0, 2, 1);
piecesGroup.add(blackQueen);

scene.add(piecesGroup);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(scene.children, true);

    intersects[0].object.material.emissive.set(0xff0000);
    intersects[0].object.material.opacity = 0.25;
}

function onKeyPress(event) {
    //window.alert(event.keyCode);
    if (event.keyCode == 97) {
        camera.position.y = -7;
        camera.lookAt(0, 0, 0);
    }

    if (event.keyCode == 100) {
        camera.position.y = 7;
        camera.lookAt(0, 0, 0);
    }
    //camera.rotation.x = 180 * Math.PI / 180;
}

var render = function() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('keypress', onKeyPress, false);

render();	
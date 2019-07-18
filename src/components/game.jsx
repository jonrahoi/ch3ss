import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols');
/*why does import and require both work??*/

export default class Game extends Component {
    componentDidMount() {
        // === THREE.JS CODE START ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.rotation.order = 'YXZ';
        camera.position.y = -7;
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor("#ffffff");
        renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(renderer.domElement);
        
        const controls = new OrbitControls(camera, renderer.domElement)

        const light = new THREE.AmbientLight(0x404040);
        scene.add(light);
        
        const boardGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boardMaterial = new THREE.MeshLambertMaterial({color: 0xfdfdfd, transparent: true, opacity: 0.1});

        const n = 5;
        const board = new THREE.Object3D();

        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                for (let z = 0; z < n; z++) {
                    const cube = new THREE.Mesh(boardGeometry, boardMaterial.clone());
                    cube.position.set(x - 2, y - 2, z - 2);
                    board.add(cube);
                }
            }
        }

        scene.add(board);

        const whiteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
        const blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

        const piecesGroup = new THREE.Group();

        const pawnGeometry = new THREE.SphereGeometry(0.35, 16, 12);

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                const whitePawn = new THREE.Mesh(pawnGeometry, whiteMaterial.clone());
                whitePawn.position.set(j - 2, -1, i - 2);
                piecesGroup.add(whitePawn);
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                const blackPawn = new THREE.Mesh(pawnGeometry, blackMaterial.clone());
                blackPawn.position.set(j - 2, 1, i + 1);
                piecesGroup.add(blackPawn);
            }
        }

        const rookGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);

        function addRook(color, position) {
            let rook;

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

        const bishopGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.5, 16);

        function addBishop(color, position) {
            let bishop;

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

        const knightGeometry = new THREE.OctahedronGeometry(0.35);

        function addKnight(color, position) {
            let knight;

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

        const unicornGeometry = new THREE.IcosahedronGeometry(0.35);

        function addUnicorn(color, position) {
            let unicorn;

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

        const kingGeometry = new THREE.TetrahedronGeometry(0.6);

        const whiteKing = new THREE.Mesh(kingGeometry, whiteMaterial.clone());
        whiteKing.position.set(0, -2, -2);
        piecesGroup.add(whiteKing);

        const blackKing = new THREE.Mesh(kingGeometry, blackMaterial.clone());
        blackKing.position.set(0, 2, 2);
        piecesGroup.add(blackKing);

        const queenGeometry = new THREE.ConeGeometry(0.25, 0.75, 16);

        const whiteQueen = new THREE.Mesh(queenGeometry, whiteMaterial.clone());
        whiteQueen.position.set(0, -2, -1);
        piecesGroup.add(whiteQueen);

        const blackQueen = new THREE.Mesh(queenGeometry, blackMaterial.clone());
        blackQueen.position.set(0, 2, 1);
        piecesGroup.add(blackQueen);

        scene.add(piecesGroup);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event) {
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( mouse, camera );
            let intersects = raycaster.intersectObjects(scene.children, true);

            let intersected = intersects[0];

            if (typeof intersected !== 'undefined') {
                intersected.object.material.emissive.set(0xff0000);
                intersected.object.material.opacity = 0.25;
            }
        }

        function onKeyPress(event) {
            //window.alert(event.keyCode);
            if (event.keyCode === 97) {
                camera.position.y = -7;
                camera.lookAt(0, 0, 0);
            }
        
            if (event.keyCode === 100) {
                camera.position.y = 7;
                camera.lookAt(0, 0, 0);
            }
            //camera.rotation.x = 180 * Math.PI / 180;
        }
        
        var renderScene = function () {
          requestAnimationFrame(renderScene);
          controls.update();
          renderer.render(scene, camera);
        };

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('keypress', onKeyPress, false);

        renderScene();
        // === THREE.JS CODE END ===
    }
    
    render() {
        return (
          <div ref={ref => (this.mount = ref)} />
        )
    }

    /*componentWillUnmount() {
        this.mount.removeChild(this.renderer.domElement);
    }*/
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
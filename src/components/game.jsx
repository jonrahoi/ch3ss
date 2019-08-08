import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Game } from "@rahoi/ch3ss_logic/dist/Game";
import { Knight } from "@rahoi/ch3ss_logic/dist/Knight";
import { King } from "@rahoi/ch3ss_logic/dist/King";
import { Bishop } from "@rahoi/ch3ss_logic/dist/Bishop";
import { Rook } from "@rahoi/ch3ss_logic/dist/Rook";
import { Unicorn } from "@rahoi/ch3ss_logic/dist/Unicorn";
import { Pawn } from "@rahoi/ch3ss_logic/dist/Pawn";
import { Queen } from "@rahoi/ch3ss_logic/dist/Queen";
import { BLACK, WHITE } from "@rahoi/ch3ss_logic/dist/constants";

const whiteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
const blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

const pawnGeometry = new THREE.SphereGeometry(0.35, 16, 12);
const rookGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
const bishopGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.5, 16);
const knightGeometry = new THREE.OctahedronGeometry(0.35);
const unicornGeometry = new THREE.IcosahedronGeometry(0.35);
const kingGeometry = new THREE.TetrahedronGeometry(0.6);
const queenGeometry = new THREE.ConeGeometry(0.25, 0.75, 16);

let SELECTED = null;
let currnetGame1 = new Game(1);
let From = '';
let To = '';
function addPieceToGroup(piece, group) {
    let newMaterial;
    let newGeometry;

    if (piece.color === WHITE) {
        newMaterial = whiteMaterial.clone();
    }
    if (piece.color === BLACK) {
        newMaterial = blackMaterial.clone();
    }

    if (piece instanceof Pawn) {
        newGeometry = pawnGeometry;
    }
    if (piece instanceof Knight) {
        newGeometry = knightGeometry;
    }

    if (piece instanceof Bishop) {
        newGeometry = bishopGeometry;
    }

    if (piece instanceof Unicorn) {
        newGeometry = unicornGeometry;
    }

    if (piece instanceof Rook) {
        newGeometry = rookGeometry;
    }

    if (piece instanceof Queen) {
        newGeometry = queenGeometry;
    }

    if (piece instanceof King) {
        newGeometry = kingGeometry;
    }

    const newPiece = new THREE.Mesh(newGeometry, newMaterial);
    const newPosition = piece.getPosition();

    newPiece.position.set(newPosition.getX() - 3, newPosition.getY() - 3, newPosition.getZ() - 3);

    group.add(newPiece);
}

export default class LiveGame extends Component {
    componentDidMount() {
        From = '122';
        To = '123';
        const scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.rotation.order = 'YXZ';
        camera.position.y = -7;
        camera.lookAt(0, 0, 0);

        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor("#ffffff");
        renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(renderer.domElement);

        const OrbitControls = require('three-orbitcontrols');
        let controls = new OrbitControls(camera, renderer.domElement);

        const light = new THREE.AmbientLight(0x404040);
        scene.add(light);

        const boardGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boardMaterial = new THREE.MeshLambertMaterial({color: 0xfdfdfd, transparent: true, opacity: 0.1});

        const boardDimension = 5;
        const board = new THREE.Object3D();

        for (let x = 0; x < boardDimension; x++) {
            for (let y = 0; y < boardDimension; y++) {
                for (let z = 0; z < boardDimension; z++) {
                    const cube = new THREE.Mesh(boardGeometry, boardMaterial.clone());
                    cube.position.set(x - 2, y - 2, z - 2);
                    board.add(cube);
                }
            }
        }

        scene.add(board);

        let currentGame = new Game();

        //currentGame.move(currentGame.getPositionFromString("122"), currentGame.getPositionFromString("123"));

        let currentPieces = currnetGame1.getPieces();
        let {pieces, liveGame} = this.props
        if(liveGame != undefined) {
            currentPieces = pieces
            //liveGame.move(currnetGame1.getPositionFromString("144"), currentGame.getPositionFromString("134"))

        }
        
        console.log("pieces in game component: " + pieces);
        
        let whitePiecesGroup = new THREE.Group();
        let blackPiecesGroup = new THREE.Group();

        for (var i = 0; i < currentPieces.length; i++) {
            if (currentPieces[i].color === WHITE) {
                addPieceToGroup(currentPieces[i], whitePiecesGroup);
            }
            
            if (currentPieces[i].color === BLACK) {
                addPieceToGroup(currentPieces[i], blackPiecesGroup);
            }
        }

        scene.add(whitePiecesGroup);
        scene.add(blackPiecesGroup);

        let mouse = new THREE.Vector2();

        window.addEventListener('mousedown', onMouseDown, false);

        animate();

        function animate() {
            requestAnimationFrame(animate);
	        render();		
	        update();
        }

        function update() {
            let ray = new THREE.Raycaster();
            ray.setFromCamera(mouse, camera);
            controls.update();
            // Update anything else that needs to be updated
        }

        function render() {
	        renderer.render( scene, camera );
        }

        function onMouseDown( event ) {
	        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            let ray = new THREE.Raycaster();
            ray.setFromCamera( mouse, camera );
            let intersects = ray.intersectObjects(scene.children, true);

            if (intersects.length > 0) {

                if (SELECTED !== null && SELECTED !== intersects[0].object) {
                    SELECTED.material.opacity = 1;
                    SELECTED.material.emissive.set(0x000000);
                }
                SELECTED = intersects[0].object;
                SELECTED.material.opacity = 0.25;
                SELECTED.material.emissive.set(0xff0000);
            }
        }
    }

    render() {
        console.log("From: " + From + " To: " + To + " in game");
        
        let {pieces, setLiveGame, setFromAndTo} = this.props
        // if(setFromAndTo != undefined) {
        //     setFromAndTo(From, To)
        // }
        
        console.log("pieces in game render: " + pieces);
        //setLiveGame(currnetGame1)
        return (
          <div className = "Gamespace" ref={ref => (this.mount = ref)} />
        )
    }

    /*componentWillUnmount() {
        
    }*/
}

const rootElement = document.getElementById("root");
ReactDOM.render(<LiveGame />, rootElement);

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Piece, Position} from "@rahoi/ch3ss_logic/dist/Piece"
import { Knight } from "@rahoi/ch3ss_logic/dist/Knight"
import { King } from "@rahoi/ch3ss_logic/dist/King"
import { Bishop } from "@rahoi/ch3ss_logic/dist/Bishop"
import { Rook } from "@rahoi/ch3ss_logic/dist/Rook"
import { Unicorn } from "@rahoi/ch3ss_logic/dist/Unicorn"
import { Pawn } from "@rahoi/ch3ss_logic/dist/Pawn"
import { Queen } from "@rahoi/ch3ss_logic/dist/Queen"
import possibleMove from './possibleMove';
const OrbitControls = require('three-orbitcontrols');

const whiteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
const blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

const piecesGroup = new THREE.Group();

const pawnGeometry = new THREE.SphereGeometry(0.35, 16, 12);

function addPawn(color, x, y, z) {
    let newPawn;

    if (color === "white") {
        newPawn = new THREE.Mesh(pawnGeometry, whiteMaterial.clone());
    }

    if (color === "black") {
        newPawn = new THREE.Mesh(pawnGeometry, blackMaterial.clone());
    }

    newPawn.position.set(x - 3, y - 3, z - 3);
    piecesGroup.add(newPawn);
}

const rookGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);

function addRook(color, x, y, z) {
    let newRook;

    if (color === "white") {
        newRook = new THREE.Mesh(rookGeometry, whiteMaterial.clone());
    }

    if (color === "black") {
        newRook = new THREE.Mesh(rookGeometry, blackMaterial.clone());
    }

    newRook.position.set(x - 3, y - 3, z - 3);
    piecesGroup.add(newRook);
}

const bishopGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.5, 16);

function addBishop(color, x, y, z) {
    let newBishop;

    if (color === "white") {
        newBishop = new THREE.Mesh(bishopGeometry, whiteMaterial.clone());
    }

    if (color === "black") {
        newBishop = new THREE.Mesh(bishopGeometry, blackMaterial.clone());
    }

    newBishop.position.set(x - 3, y - 3, z - 3);
    piecesGroup.add(newBishop);
}

const knightGeometry = new THREE.OctahedronGeometry(0.35);

function addKnight(color, x, y, z) {
    let knight;

    if (color === "white") {
        knight = new THREE.Mesh(knightGeometry, whiteMaterial.clone());
    }

    if (color === "black") {
        knight = new THREE.Mesh(knightGeometry, blackMaterial.clone());
    }

    knight.position.set(x - 3, y - 3, z - 3);
    piecesGroup.add(knight);
}

const unicornGeometry = new THREE.IcosahedronGeometry(0.35);

function addUnicorn(color, x, y, z) {
    let unicorn;

    if (color === "white") {
        unicorn = new THREE.Mesh(unicornGeometry, whiteMaterial.clone());
    }

    if (color === "black") {
        unicorn = new THREE.Mesh(unicornGeometry, blackMaterial.clone());
    }

    unicorn.position.set(x - 3, y - 3, z - 3);
    piecesGroup.add(unicorn);
}

const kingGeometry = new THREE.TetrahedronGeometry(0.6);

function addKing(color, x, y, z) {
    let king;

    if (color === "white") {
        king = new THREE.Mesh(kingGeometry, whiteMaterial.clone());
    }

    if (color === "black") {
        king = new THREE.Mesh(kingGeometry, blackMaterial.clone());

    }

    king.position.set(x - 3, y - 3, z - 3);
    piecesGroup.add(king);
}

const queenGeometry = new THREE.ConeGeometry(0.25, 0.75, 16);

function addQueen(color, x, y, z) {
    let queen;

    if (color === "white") {
        queen = new THREE.Mesh(queenGeometry, whiteMaterial.clone());
    }

    if (color === "black") {
        queen = new THREE.Mesh(queenGeometry, blackMaterial.clone());
    }

    queen.position.set(x - 3, y - 3, z - 3);
    piecesGroup.add(queen);
}

export default class Game extends Component {
    //TODO: add OrbitControls
    constructor(props) {
        super(props);

        console.log(this.props)
    }

    init() {
        //let pieces = [];
        //this.setPieces();
        let { pieces } = this.props;
        console.log("PROPS IN INIT", this.props);

        for (var i = 0; i < this.pieces.length; i++) {
            // create piece visual to add to scence
            let pieceViusal = pieces[i];
            let position = pieceViusal.getPosition();
            let x = position.getX();
            let y = position.getY();
            let z = position.getZ();
            let color = pieceViusal.getColor();

            if (pieceViusal instanceof Pawn) {
                addPawn(color, x, y, z);
            }

            if (pieceViusal instanceof Rook) {
                addRook(color, x, y, z);
            }

            if (pieceViusal instanceof Unicorn) {
                addUnicorn(color, x, y, z);
            }

            if (pieceViusal instanceof King) {
                addKing(color, x, y, z);
            }

            if (pieceViusal instanceof Queen) {
                addQueen(color, x, y, z);
            }

            if (pieceViusal instanceof Bishop) {
                addBishop(color, x, y, z);
            }

            if (pieceViusal instanceof Knight) {
                addKnight(color, x, y, z);
            }

        }
    }
    componentDidMount() {
        /** three.js code start */
        const scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.rotation.order = 'YXZ';
        camera.position.y = -7;
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor("#ffffff");
        renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(renderer.domElement);

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

        scene.add(piecesGroup);

        //projector = new THREE.Projector();

        var ray = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        /*function onMouseMove(event) {
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            ray.setFromCamera( mouse, camera );
            let intersects = ray.intersectObjects(scene.children, true);

            let intersected = intersects[0];
            let {setSelectedPiece, setSelectedSpace} = this.props
            if (typeof intersected !== 'undefined') {
                intersected.object.material.emissive.set(0xff0000);
                intersected.object.material.opacity = 0.25;
                let coordinates = intersected.position.getX.toString();
                coordinates = coordinates.concat(intersected.position.getY.toString());
                coordinates = coordinates.concat(intersected.position.getZ.toString());
                setSelectedPiece(intersected.position.x,);
            } else {
                setSelectedSpace(intersected.position);
            }
        }*/

        function animate() {
            requestAnimationFrame(animate);
            renderScene();
            update();
        }

        function update() {
            /*
            // find intersections
            // create a Ray with origin at the mouse position
            //   and direction into the scene (camera direction)
            var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
            projector.unprojectVector( vector, camera );
            var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
            // create an array containing all objects in the scene with which the ray intersects
            var intersects = ray.intersectObjects( scene.children );
            // INTERSECTED = the object in the scene currently closest to the camera
            //    	and intersected by the Ray projected from the mouse position

            // if there is one (or more) intersections
            if ( intersects.length > 0 )
            {
                // if the closest object intersected is not the currently stored intersection object
                if ( intersects[ 0 ].object != INTERSECTED )
                {
                    // restore previous intersection object (if it exists) to its original color
                    if ( INTERSECTED )
                        INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                    // store reference to closest object as current intersection object
                    INTERSECTED = intersects[ 0 ].object;
                    // store color of closest object (for later restoration)
                    INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                    // set a new color for closest object
                    INTERSECTED.material.color.setHex( 0xff0000 );
                }
            }
            else // there are no intersections
            {
                // restore previous intersection object (if it exists) to its original color
                if ( INTERSECTED )
                    INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                // remove previous intersection object reference
                //     by setting current intersection object to "nothing"
                INTERSECTED = null;
            } */

            controls.update();
            //stats.update();
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

        //window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('keypress', onKeyPress, false);

        renderScene();
    /** End of three.js code */
    }

    render() {
        let { liveGame } = this.props;
        console.log("liveGame in Game: "+liveGame)
        console.log("PROPS IN RENDER", this.props);

        return (
          <div className = "gamePlay" ref={ref => (this.mount = ref)} />
        )
    }

    /*componentWillUnmount() {
        this.mount.removeChild(this.renderer.domElement);
    }*/
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
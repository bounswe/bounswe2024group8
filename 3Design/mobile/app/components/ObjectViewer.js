import React, { useRef } from 'react';
import { View } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Asset } from 'expo-asset';
import {
  PerspectiveCamera,
  Scene,
  AmbientLight,
  DirectionalLight,
  Box3,
  Vector3,
  MeshStandardMaterial,
} from 'three';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const ObjViewer = ({ objFilePath }) => {
  const cameraRef = useRef(new PerspectiveCamera(75, 1, 0.1, 1000));
  const objectRef = useRef();
  const sceneRef = useRef(new Scene());
  const scaleRef = useRef(1);
  const centerRef = useRef(new Vector3());

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create the renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    // Set up the camera
    const camera = cameraRef.current;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    camera.position.set(0, 0, 20); // Move the camera back

    const scene = sceneRef.current;
    scene.add(new AmbientLight(0x404040));

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the OBJ file
    const loader = new OBJLoader();
    const asset = Asset.fromModule(objFilePath);
    await asset.downloadAsync();

    loader.load(
      asset.localUri,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = new MeshStandardMaterial();
          }
        });

        objectRef.current = object;

        // Calculate the bounding box and center
        const box = new Box3().setFromObject(object);
        const size = new Vector3();
        box.getSize(size);  // Get the width, height, and depth

        const maxDimension = Math.max(size.x, size.y, size.z);  // Get the maximum size of the model

        const scaleFactor = 15 / maxDimension;  // Scale down the model to fit within 1 unit

        object.scale.set(scaleFactor, scaleFactor, scaleFactor);

        const scaledBox = new Box3().setFromObject(object);
        scaledBox.getCenter(centerRef.current);

        // Center the object at the origin
        object.position.sub(centerRef.current); // Move the object so its center is at the origin

        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the OBJ file:', error);
      }
    );

    // Render loop
    const renderLoop = () => {
      requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    renderLoop();
  };

  const handlePinch = (event) => {
    const { scale } = event.nativeEvent;
    scaleRef.current *= scale;
    scaleRef.current = Math.min(Math.max(scaleRef.current, 0.1), 10);

    if (objectRef.current) {
      objectRef.current.scale.set(
        scaleRef.current,
        scaleRef.current,
        scaleRef.current
      );
    }
  };

  const handlePan = (event) => {
    const { translationX, translationY } = event.nativeEvent;
    if (objectRef.current) {
      // Rotate around the object's center
      objectRef.current.rotation.x += translationY * 0.002;
      objectRef.current.rotation.y += translationX * 0.002;
    }
  };

  return (
    <View style={{ height: 300 }}>
      <PanGestureHandler onGestureEvent={handlePan}>
        <PinchGestureHandler onGestureEvent={handlePinch}>
          <GLView
            style={{
              height: 300,
              borderColor: '#000',
              borderWidth: 2,
              borderRadius: 10,
            }}
            onContextCreate={onContextCreate}
            enableDepth={true}
            enableStencil={true}
          />
        </PinchGestureHandler>
      </PanGestureHandler>
    </View>
  );
};

export default ObjViewer;

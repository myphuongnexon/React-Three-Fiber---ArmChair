import React, {Suspense, useRef} from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Html, useGLTFLoader } from "drei";
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section";


const Model = () => {
  const gltf = useGLTFLoader('/armchairYellow.gltf', true);
  return <primitive object={gltf.scene} dispose={null} />
}

const Lights = () => {
  return( 
    <>
     <ambientLight intensity={0.3} /> 
     <directionalLight position={[10, 10, 5]} intensity={1}/>
     <directionalLight position={[0, 10, 0]} intensity={1.5}/>
     <spotLight intensity={1} position={[1000, 0, 0]}/>
    </>
  );
}

const HTMLContent = () => {
  const ref = useRef();
  useFrame((state, delta) => (ref.current.rotation.y += 0.01))

  return (
    <Section factor={1.5} offset={1}>
     <group position={[0,250,0]}>
      <mesh position={[0,-35,0]} ref={ref}>
        <Model />
      </mesh>
      {/* <Html fullscreen>
            <div className='container'>
              <div className='title'>
                <h1>hello</h1>
              </div>
            </div>
        </Html> */}
     </group>
    </Section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Canvas
      colorManagement
      camera={{position: [0,0,120], fov: 70}}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent />
        </Suspense>        
      </Canvas>
    </>
  );
}

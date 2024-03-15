"use client"
import { Box, CameraControls, Environment, Gltf, OrbitControls } from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import Teacher from "./Teacher"

const Experience = () => {
  return (
    <>
        <Canvas camera={{position: [0,0,0.0001]}}>
            {/* <OrbitControls /> */}
            <CameraManager />
            <Environment preset="sunset" />
            <ambientLight intensity={0.8} color={"pink"} />
            <Teacher teacher={"Naoki"} scale={1.5} position={[-1,-1.7,-3]}   />
            <Gltf src="/models/classroom_default.glb" position={[0.2,-1.7,-2]} />
        </Canvas>
    </>
  )
}

const CameraManager = () => {
    return(
         <CameraControls 
            minZoom={1} 
            maxZoom={3}
            polarRotateSpeed={-0.3} 
            azimuthRotateSpeed={-0.3}
            mouseButtons={{
                left: 1,
                wheel: 16,
                middle: 0,
                right: 0
            }}
            touches={{
                one: 32,
                two: 512,
                three: 0
            }}
         />
    )
}

export default Experience
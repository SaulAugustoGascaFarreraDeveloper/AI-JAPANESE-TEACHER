import { useGLTF } from '@react-three/drei'
import React from 'react'
import { teacherOptions, teachers } from './constants'
import { Vector3 } from 'three'
import { Scale } from 'lucide-react'
import { degToRad } from 'three/src/math/MathUtils.js'

interface TeacherProps{
    teacher: teacherOptions,
    scale?: number
}

const Teacher = ({teacher,scale,...props} : TeacherProps) => {

  const {scene} = useGLTF(`/models/Teacher_${teacher}.glb`)
  return (
    <group scale={scale} rotation-y={degToRad(20)} {...props}>
        <primitive object={scene} />
    </group>
  )
}

teachers.forEach((teacher) => {
    useGLTF.preload(`/models/Teacher_${teacher}.glb`)
})

export default Teacher
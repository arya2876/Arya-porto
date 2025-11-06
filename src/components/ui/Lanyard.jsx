/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

// Import local assets and data
import cardGLB from '../../assets/lanyard/card (1).glb';
import lanyardTexture from '../../assets/lanyard/lanyard.png';
import { personalInfo, socialLinks } from '../../data/personalInfo';

extend({ MeshLineGeometry, MeshLineMaterial });

/**
 * Interactive 3D Lanyard Component
 * Based on react-bits with physics simulation
 */
export default function Lanyard({ 
  position = [0, 0, 30], 
  gravity = [0, -40, 0], 
  fov = 20, 
  transparent = true 
}) {
  return (
    <div className="relative z-0 w-full h-[500px] flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8">
      {/* 3D Canvas with Lanyard */}
      <div className="w-full lg:w-1/2 h-[250px] lg:h-full flex justify-center items-center">
        <Canvas
          camera={{ position: position, fov: fov }}
          gl={{ alpha: transparent }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
        >
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={1 / 60}>
            <Band />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>

      {/* Biodata Card */}
      <div className="w-full lg:w-auto flex justify-center items-center">
        <LanyardCard />
      </div>
    </div>
  );
}

/**
 * Lanyard Card Component with Profile and Social Media - 3D Glass Effect
 */
function LanyardCard() {
  return (
    <div className="parent-card w-[290px] h-[450px]">
      <div className="card-3d relative h-full rounded-[50px] bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600 transition-all duration-500 ease-in-out shadow-[rgba(102,126,234,0)_40px_50px_25px_-40px,rgba(102,126,234,0.2)_0px_25px_25px_-5px]">
        
        {/* Glass Layer */}
        <div className="glass-layer absolute inset-2 rounded-[55px] rounded-tr-[100%] bg-gradient-to-b from-white/85 to-white/35 border-l border-b border-white/50 transition-all duration-500"></div>
        
        {/* Logo Circles - Pop from top right corner */}
        <div className="logo-circles absolute top-0 right-0">
          <span className="circle circle-1 absolute top-2 right-2 w-[170px] h-[170px] rounded-full bg-primary-400/20 backdrop-blur-[5px] shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500"></span>
          <span className="circle circle-2 absolute top-2.5 right-2.5 w-[140px] h-[140px] rounded-full bg-primary-400/20 backdrop-blur-[1px] shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 delay-400"></span>
          <span className="circle circle-3 absolute top-4 right-4 w-[110px] h-[110px] rounded-full bg-primary-400/20 backdrop-blur-[5px] shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 delay-800"></span>
          <span className="circle circle-4 absolute top-6 right-6 w-[80px] h-[80px] rounded-full bg-primary-400/20 backdrop-blur-[5px] shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 delay-1200"></span>
          <span className="circle circle-5 absolute top-7 right-7 w-[50px] h-[50px] rounded-full bg-primary-500 backdrop-blur-[5px] shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] flex items-center justify-center transition-all duration-500 delay-1600">
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.name}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = personalInfo.profileImageFallback || 'https://via.placeholder.com/150';
              }}
            />
          </span>
        </div>

        {/* Content */}
        <div className="content-3d relative px-8 pt-24">
          <h2 className="block text-primary-700 font-black text-xl mb-2">
            {personalInfo.name}
          </h2>
          <p className="block text-primary-700/80 text-sm leading-relaxed">
            {personalInfo.primaryRole}
          </p>
          <p className="block text-primary-700/70 text-xs mt-3 leading-relaxed">
            {personalInfo.status}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="bottom-3d absolute bottom-5 left-5 right-5 flex items-center justify-between">
          {/* Social Buttons */}
          <div className="social-buttons-3d flex gap-2.5">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button social-button-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[rgba(102,126,234,0.5)_0px_7px_5px_-5px] transition-all duration-200 delay-400 hover:bg-black active:bg-yellow-400"
              >
                <FaGithub className="w-4 h-4 text-primary-700 transition-colors" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button social-button-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[rgba(102,126,234,0.5)_0px_7px_5px_-5px] transition-all duration-200 delay-600 hover:bg-black active:bg-yellow-400"
              >
                <FaLinkedin className="w-4 h-4 text-primary-700 transition-colors" />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button social-button-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[rgba(102,126,234,0.5)_0px_7px_5px_-5px] transition-all duration-200 delay-800 hover:bg-black active:bg-yellow-400"
              >
                <FaInstagram className="w-4 h-4 text-primary-700 transition-colors" />
              </a>
            )}
            {socialLinks.tiktok && (
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button social-button-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[rgba(102,126,234,0.5)_0px_7px_5px_-5px] transition-all duration-200 delay-1000 hover:bg-black active:bg-yellow-400"
              >
                <FaTiktok className="w-4 h-4 text-primary-700 transition-colors" />
              </a>
            )}
          </div>

          {/* View More */}
          <div className="view-more-3d flex items-center gap-1 transition-all duration-200">
            <button className="text-primary-600 font-bold text-xs">
              Portfolio
            </button>
            <svg 
              className="w-3 h-3 fill-none stroke-primary-600 stroke-[3px]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { 
    type: 'dynamic', 
    canSleep: true, 
    colliders: false, 
    angularDamping: 4, 
    linearDamping: 4 
  };
  
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardTexture);
  
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(), 
      new THREE.Vector3(), 
      new THREE.Vector3(), 
      new THREE.Vector3()
    ])
  );
  
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      
      card.current?.setNextKinematicTranslation({ 
        x: vec.x - dragged.x, 
        y: vec.y - dragged.y, 
        z: vec.z - dragged.z 
      });
    }
    
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1, 
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody 
          position={[2, 0, 0]} 
          ref={card} 
          {...segmentProps} 
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh 
              geometry={nodes.clip.geometry} 
              material={materials.metal} 
              material-roughness={0.3} 
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// Preload assets
useGLTF.preload(cardGLB);
useTexture.preload(lanyardTexture);

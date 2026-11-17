"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

export function RibbonCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Dynamic parametric mobius ribbon curve
    class MobiusCurve extends THREE.Curve<THREE.Vector3> {
      scale: number;
      constructor(scale = 2.4) {
        super();
        this.scale = scale;
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const u = t * Math.PI * 2;
        const x = Math.cos(u) * (1 + 0.5 * Math.cos(u / 2)) * this.scale;
        const y = Math.sin(u) * (1 + 0.5 * Math.cos(u / 2)) * (this.scale * 0.7);
        const z = 0.5 * Math.sin(u / 2) * (this.scale * 1.5);
        return optionalTarget.set(x, y, z);
      }
    }

    const path = new MobiusCurve(2.3);
    const geometry = new THREE.TubeGeometry(path, 140, 0.35, 16, true);

    // Outer Ribbon: Patinated deep bronze / deep pine metal (#001e1d / #004643)
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#001e1d"),
      metalness: 0.88,
      roughness: 0.2,
      emissive: new THREE.Color("#004643"),
      emissiveIntensity: 0.3,
    });

    const ribbonMesh = new THREE.Mesh(geometry, material);
    ribbonMesh.rotation.x = 0.5;
    ribbonMesh.rotation.y = 0.3;
    scene.add(ribbonMesh);

    // Inner Ribbon: Saturated Velvet Violet
    const path2 = new MobiusCurve(1.7);
    const geometry2 = new THREE.TubeGeometry(path2, 100, 0.12, 12, true);
    const material2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8B5CF6"),
      metalness: 0.88,
      roughness: 0.15,
      emissive: new THREE.Color("#6D28D9"),
      emissiveIntensity: 0.35,
    });
    const innerRibbon = new THREE.Mesh(geometry2, material2);
    innerRibbon.rotation.x = -0.4;
    scene.add(innerRibbon);

    // Lighting setup matching Design.md
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.2);
    rimLight.position.set(-5, -3, -2);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x004643, 0.9);
    scene.add(ambientLight);

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth subtle floating & rotation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      ribbonMesh.rotation.x = 0.4 + targetY * 0.6 + Math.sin(elapsedTime * 0.4) * 0.1;
      ribbonMesh.rotation.y = targetX * 0.8 + elapsedTime * 0.18;
      ribbonMesh.rotation.z = Math.cos(elapsedTime * 0.3) * 0.1;

      innerRibbon.rotation.x = -0.3 - targetY * 0.4 + Math.cos(elapsedTime * 0.5) * 0.15;
      innerRibbon.rotation.y = -targetX * 0.6 - elapsedTime * 0.22;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      geometry2.dispose();
      material2.dispose();
      renderer?.dispose();
    };
  }, []);

  // Graceful fallback for reduced motion or non-WebGL environments
  if (!webGLSupported || reducedMotion) {
    return (
      <div className="relative w-full h-[460px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,188,96,0.18)_0%,transparent_70%)]" />
        <Image
          src="/designs/Home Page.png"
          alt="Velvet Metallic 3D Fluid Ribbon Static Render"
          width={650}
          height={400}
          className="object-contain max-h-[380px] drop-shadow-[0_0_40px_rgba(249,188,96,0.25)] opacity-95"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[460px] md:h-[520px] flex items-center justify-center select-none pointer-events-none">
      {/* Ambient background gold illumination glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,188,96,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div ref={containerRef} className="w-full h-full pointer-events-auto" />
    </div>
  );
}

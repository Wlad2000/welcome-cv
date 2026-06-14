export function Lights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 7, 4]} intensity={2.1} color="#ffffff" />
      <pointLight position={[-3.6, 2.8, 2.2]} intensity={3.5} color="#ff2f7d" distance={8} />
      <pointLight position={[3.8, 1.8, 2.4]} intensity={3.1} color="#35f2c2" distance={8} />
      <spotLight
        position={[0, 5, 4]}
        angle={0.42}
        penumbra={0.8}
        intensity={2.4}
        color="#f8ff4d"
      />
    </>
  );
}

window.addEventListener("load", () => {
  gsap.timeline().to(".loader-line", { width: "100%", duration: 1.2 }).to(".preloader", { y: "-100%", duration: 1, ease: "expo.inOut" });
});

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
const wrapper = document.querySelector(".horizontal-wrapper");
const scrollTween = gsap.to(wrapper, {
  x: () => -(wrapper.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-overflow",
    start: "top top",
    end: () => "+=" + wrapper.scrollWidth,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  },
});

const initInteractions = () => {
  gsap.utils.toArray(".card-bg-img").forEach((img) => {
    gsap.to(img, {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: img,
        containerAnimation: scrollTween,
        start: "left right",
        end: "right left",
        scrub: true,
      },
    });
  });

  const magnetics = document.querySelectorAll(".magnetic, .magnetic-card-wrap");
  magnetics.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const strength = el.classList.contains("magnetic-card-wrap") ? 0.3 : 0.6;
      
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.4)",
      });
    });
  });
};
initInteractions();

const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", (e) => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  outline.animate({ left: e.clientX + "px", top: e.clientY + "px" }, { duration: 500, fill: "forwards" });
});

const initThree = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const uniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
    fragmentShader: `
      uniform float u_time;
      uniform vec2 u_resolution;
      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        vec3 color = vec3(0.06, 0.09, 0.16) + 0.05*sin(st.xyx + u_time);
        gl_FragColor = vec4(color, 1.0);
      }`,
  });
  scene.add(new THREE.Mesh(geometry, material));
  function animate() {
    requestAnimationFrame(animate);
    uniforms.u_time.value += 0.02;
    renderer.render(scene, camera);
  }
  animate();
};
initThree();
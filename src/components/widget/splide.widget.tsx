// import React, { useEffect, useRef } from 'react';
// import Splide from '@splidejs/splide';
// import '@splidejs/splide/dist/css/splide.min.css';
// // import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

// const SplideComponent: React.FC = () => {
//     const splideRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (splideRef.current) {
//             const splide = new Splide(splideRef.current, {
//                 type: 'loop',
//                 drag: 'free',
//                 focus: 'center',
//                 perPage: 4,
//                 autoScroll: {
//                     speed: 1,
//                 },
//                 autoplay: true
//             })
//             splide.mount();
//         }
//     }, [])

//     return (
//         <div className="splide" ref={splideRef}>
//             <div className="splide__track">
//                 <ul className="splide__list">
//                     <li className="splide__slide"> <img src="\src\assets\image\logo_header.png" alt="" /></li>
//                     <li className="splide__slide"> <img src="\src\assets\image\logo_header.png" alt="" /></li>
//                     <li className="splide__slide"> <img src="\src\assets\image\logo_header.png" alt="" /></li>
//                     <li className="splide__slide"> <img src="\src\assets\image\logo_header.png" alt="" /></li>
//                     <li className="splide__slide"> <img src="\src\assets\image\logo_header.png" alt="" /></li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default SplideComponent;

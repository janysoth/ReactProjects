import React, { useRef } from 'react';
import { animated, useSpring } from 'react-spring';

const Modal = ({ children, showModal, setShowModal }) => {

  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current)
      setShowModal(false);
  };

  // Animation
  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    top: showModal ? '25%' : '0%',
    config: { friction: 10 }
  });

  return (
    showModal && (
      <div className="Modal" ref={modalRef} onClick={closeModal}>
        <animated.div
          style={modalAnimation}
          className="container"
        >
          {children}
        </animated.div>
      </div>
    )
  );
};

export default Modal;
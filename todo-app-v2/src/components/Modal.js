import React, { useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import { useModalAnimation } from '../hooks';

const Modal = ({ children, showModal, setShowModal }) => {

  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current)
      setShowModal(false);
  };

  // Animation
  const modalAnimation = useModalAnimation(showModal);

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
import React, { useState } from 'react'
import { useImgModal } from '../../context/ImageModal/imgModalContext';

const EachMedia = ({message}) => {
  const {showModal} = useImgModal()
  const [isMagnify, setIsMagnify] = useState(false);
  return (
    <img
    className={
      "rs-media-img cursor-zoom-in"
    }
    src={message?.img}
    alt=""
    onClick={() => showModal(message?.img)}
  />
  )
}

export default EachMedia

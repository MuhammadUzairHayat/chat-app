import React, { useState } from 'react'

const EachMedia = ({message}) => {
  const [isMagnify, setIsMagnify] = useState(false);
  return (
    <img
    className={
      "rs-media-img " + (isMagnify ? "magnified" : "unmagnified")
    }
    src={message?.img}
    alt=""
    onClick={() => setIsMagnify(!isMagnify)}
  />
  )
}

export default EachMedia

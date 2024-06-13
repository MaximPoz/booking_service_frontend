import { useState } from "react"

import { LiaAngleDoubleLeftSolid, LiaAngleDoubleRightSolid } from "react-icons/lia";
import { FaRegCircleDot, FaRegCircle } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import s from "./style.module.css"


export const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)

  function showNextImage() {
    setImageIndex(index => {
      if (index === images.length - 1) return 0
      return index + 1
    })
  }

  function showPrevImage() {
    setImageIndex(index => {
      if (index === 0) return images.length - 1
      return index - 1
    })
  }

  return (
    <section className={s.skipSection}>
      <a className={s.skipLink}></a>

      <div className={s.imgColumn}>
        {images.map((url) => (
          <img
            key={uuidv4()}
            src={url}
            alt={'image'}
            className={s.imgSliderImg}
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
      </div>

      <button
        onClick={showPrevImage}
        className={s.imgSliderBtnLeft}
      >
        <LiaAngleDoubleLeftSolid aria-hidden />
      </button>

      <button
        onClick={showNextImage}
        className={s.imgSliderBtnRight}
      >
        <LiaAngleDoubleRightSolid aria-hidden />
      </button>
      
      <div className={s.imgSliderDot}>
        {images.map((_, index) => (
          <button
            key={index}
            className={s.imgSliderDotBtn}
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <FaRegCircleDot aria-hidden />
            ) : (
              <FaRegCircle aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  )
}
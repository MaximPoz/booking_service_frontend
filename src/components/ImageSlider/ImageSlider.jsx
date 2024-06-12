import { useState } from "react"

import { LiaAngleDoubleLeftSolid, LiaAngleDoubleRightSolid } from "react-icons/lia";
import { FaRegCircleDot, FaRegCircle  } from "react-icons/fa6";
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
    <section
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <a href="#after-image-slider-controls" className={s.skipLink}>
        Skip Image Slider Controls
      </a>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >

        {images.map(url => (
            <img
              key={url} 
              src={url}
              alt={`Тут ошибка: ${url}`}
              className={s.imgSliderImg}
              style={{ translate: `${-100 * imageIndex}%` }}
            />
  
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className={s.imgSliderBtn}
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <LiaAngleDoubleLeftSolid aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className={s.imgSliderBtn}
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <LiaAngleDoubleRightSolid aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images.map((_, index) => (
          <button
          key={ index} 
            className={s.imgSliderDotBtn}
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <FaRegCircleDot aria-hidden />
            ) : (
              <FaRegCircle  aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  )
}
"use client";

import React, { useEffect, useState } from "react";

function Img({
  src,
  width,
  height,
  className,
  alt,
  onClick,
}: {
  src: string;
  width: number;
  height: number;
  className: string;
  alt: string;
  onClick: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };

    return () => {
      image.onload = null;
    };
  }, [src]);
  return (
    <>
      {loading ? (
        <img
          src={"/placeholder.jpg"}
          width={width}
          height={height}
          className={`${className} invert dark:invert-0`}
          alt={alt}
          loading="lazy"
        />
      ) : (
        <img
          src={imageSrc}
          width={width}
          height={height}
          className={className}
          alt={alt}
          loading="lazy"
          onClick={onClick}
        />
      )}
    </>
  );
}

export default Img;

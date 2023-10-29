import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { ImageProps } from "react-bootstrap";
import { storage } from "../config/firebase";
import Image from "react-bootstrap/Image";

export const FirebaseImage = ({ ...props }: ImageProps) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    getDownloadURL(ref(storage, props.src)).then((val) => {
      setImageSrc(val);
    });
  }, [props.src]);

  return <Image {...props} src={imageSrc} />;
};

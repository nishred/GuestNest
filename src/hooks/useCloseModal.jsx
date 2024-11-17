import { useEffect, useRef, useState } from "react";

export default function useCloseModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return { ref, isModalOpen, setIsModalOpen };
}

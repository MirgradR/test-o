import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode
}

const LazyOnView = ({ children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef}>
      {isVisible ? children : null}
    </div>
  );
}

export default LazyOnView;

import {MutableRefObject, useEffect, useState} from "react";


export function useOnScreen<T extends Element>(ref: MutableRefObject<T | null>, rootMargin: string = "0px"): boolean {
    // Состояние и сеттер для сохранения видимости элемента
    const [isIntersecting, setIntersecting] = useState<boolean>(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Обновляем наше состояние, когда срабатывает обратный вызов наблюдателя
                setIntersecting(entry.isIntersecting);
            },
            {
                rootMargin,
            });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
          if(ref.current){
              // eslint-disable-next-line react-hooks/exhaustive-deps
              observer.unobserve(ref.current);
          }
        };
    }, []); // Пустой массив гарантирует, что эффект запускается только при монтировании и размонтировании
    return isIntersecting;
}

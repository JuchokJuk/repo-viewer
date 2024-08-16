import { useCallback, useEffect, useRef } from "react";

type TUseInfinityScroll = {
   isLoading: boolean;
   page: number;
   totalPages: number;
   onLoadMore: () => void;
};

/**
 * Пользовательский хук, который обеспечивает поведение бесконечной прокрутки.
 *
 * @param {Object} options - Объект с параметрами.
 * @param {boolean} options.isLoading - Указывает, загружаются ли данные в данный момент.
 * @param {number} options.page - Текущий номер страницы.
 * @param {number} options.totalPages - Общее количество страниц.
 * @param {Function} options.onLoadMore - Функция обратного вызова, которая должна быть вызвана при необходимости загрузки дополнительных данных.
 *
 * @return {Function} - Функция обратного вызова, которую следует присоединить к последнему элементу прокручиваемого контейнера.
 */

export function useInfinityScroll({
   isLoading,
   page,
   totalPages,
   onLoadMore,
}: TUseInfinityScroll) {
   const observer = useRef<IntersectionObserver | null>(null);
   const lastElementRef = useCallback(
      (node: HTMLDivElement) => {
         if (isLoading) return;

         if (observer.current) observer.current.disconnect();

         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && page < totalPages) {
               onLoadMore();
            }
         });
         if (node) observer.current.observe(node);
      },
      [page, isLoading, totalPages]
   );

   useEffect(() => {
      return () => {
         if (observer.current) {
            observer.current.disconnect();
            observer.current = null;
         }
      };
   }, [observer]);

   return lastElementRef;
}

import { Loader2 } from "lucide-react";
import { useToast } from "@/shared/ui/use-toast";

import { RepositoryCard } from "@/entities/RepositoryCard";
import { useLazyGetPopularTSRepositoriesQuery } from "@/shared/api/github/githubApi";

import { ScrollArea } from "@/shared/ui/scroll-area";

import { useLayoutEffect, useRef, useState } from "react";
import { IRepository } from "@/shared/api/github/types";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { ScrollToTop } from "@/widgets/ScrollToTp";
import { Button } from "@/shared/ui/button";
import { ToastAction } from "@/shared/ui/toast";

export const Home = () => {
  const { toast } = useToast();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [getRepositories, { isError }] = useLazyGetPopularTSRepositoriesQuery();

  /**
   * Подгружаем элементы с бекенеда
   *
   * @param {number} [perPage=12] - Количество подгружаемых элементов
   * @return {Promise<void>}
   */
  const loadMore = async (perPage: number | undefined = 12) => {
    setIsLoading(true);

    const repositories = await getRepositories({
      page: page,
      per_page: perPage,
    });

    if (repositories?.data) {
      const { total_count, items } = repositories.data;

      // Высчитываем максимальное количество страниц
      setTotalPages(total_count / perPage);
      // Добавляем подгруженные элементы в общий список
      setRepositories((prev) => [...prev, ...items]);
      setPage((prev) => prev + 1);
    }

    if (repositories.error) {
      toast({
        variant: "destructive",
        title: "Вы просмотрели слишком много репозиториев, может, пора отдохнуть?",
        action: (
          <ToastAction altText="Try again" onClick={() => loadMore()}>
            Попробовать загрузить снова
          </ToastAction>
        ),
      });
    }

    setIsLoading(false);
  };

  useLayoutEffect(() => {
    loadMore();
  }, []);

  // Хук, который добавляет бесконечный скролл
  const lastElementRef = useInfinityScroll({
    isLoading: isLoading,
    page: page,
    totalPages: totalPages,
    onLoadMore: loadMore,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScrollArea className="h-screen">
      <div className="p-8" ref={containerRef}>
        <div className="flex flex-col items-center justify-center text-center my-16">
          <p className="text-4xl font-bold mb-4">Приложение для просмотра самых популярных TS проектов</p>
          <p className="text-xl text-gray-500">Сделано с помощью React, TypeScript, RTK Query, FSD, tailwind</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-6 mx-auto mb-8">
          {repositories.map((repository) => (
            <RepositoryCard
              key={`${repository.id}`}
              avatar={repository.owner.avatar_url}
              description={repository.description}
              name={repository.name}
              stargazers_count={repository.stargazers_count}
              url={repository.html_url}
            />
          ))}
        </div>

        {!isError ? (
          <div className="flex items-center justify-center" ref={lastElementRef}>
            {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Button onClick={() => loadMore()}>Попробовать загрузить снова</Button>
          </div>
        )}

        {/* Если мы дошли до последней страницы */}
        {page >= totalPages && (
          <div className="text-center text-gray-700 mt-12">
            <hr className="border-gray-300 mb-4" />
            <p className="text-2xl font-semibold">Вы достигли конца списка, больше элементов нет.</p>
          </div>
        )}

        <ScrollToTop containerRef={containerRef} />
      </div>
    </ScrollArea>
  );
};

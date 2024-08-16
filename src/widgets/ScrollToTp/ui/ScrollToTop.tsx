import { Button } from "@/shared/ui/button";
import { ArrowUp } from "lucide-react";
import { FC, MutableRefObject } from "react";

export interface IScrollToTopProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export const ScrollToTop: FC<IScrollToTopProps> = ({ containerRef }) => {
  function scrollToTop() {
    containerRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <Button className="fixed bottom-8 right-8" variant="outline" size="icon" onClick={scrollToTop}>
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
};

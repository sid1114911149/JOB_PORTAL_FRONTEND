import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./button"; // Your plain Button

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className = "", children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => api?.off("select", onSelect);
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{ carouselRef, api, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={`carousel ${className}`}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className = "", ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="carousel-viewport">
      <div
        ref={ref}
        className={`carousel-track ${orientation === "horizontal" ? "" : "carousel-track-vertical"} ${className}`}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className = "", ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`carousel-item ${
        orientation === "horizontal" ? "carousel-item-horizontal" : "carousel-item-vertical"
      } ${className}`}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className = "", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const positionClass =
    orientation === "horizontal" ? "carousel-prev-horizontal" : "carousel-prev-vertical";
  return (
    <Button ref={ref} className={`carousel-button ${positionClass} ${className}`} onClick={scrollPrev} disabled={!canScrollPrev} {...props}>
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(({ className = "", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const positionClass =
    orientation === "horizontal" ? "carousel-next-horizontal" : "carousel-next-vertical";
  return (
    <Button ref={ref} className={`carousel-button ${positionClass} ${className}`} onClick={scrollNext} disabled={!canScrollNext} {...props}>
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "./ui/carousel";

interface SalesCarouselProps {
  images: string[]; // Array de URLs de las imágenes
}

export function SalesCarousel({ images }: SalesCarouselProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-12 py-6">
      <h2 className="text-2xl font-bold mb-6">Ofertas Especiales</h2>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={`Oferta ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
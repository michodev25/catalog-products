import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star } from "lucide-react";
import  Phone  from "../../phone.ts";

// Componente SVG para el icono de WhatsApp
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.594z"/>
    </svg>
  );
}
/// <reference types="vite/client" />


interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  features: string[];
  rating: number;
  inStock: boolean;
}


interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}


export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en el producto ${product.name} de ${formatPrice(product.price)}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${Phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    console.log(Phone)
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            -{discountPercentage}%
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Agotado
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <h3 className="line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-muted-foreground">Características:</h4>
            <ul className="text-sm space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
              {product.features.length > 3 && (
                <li className="text-xs text-muted-foreground">
                  +{product.features.length - 3} características más
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Button
            className="w-full"
            disabled={!product.inStock}
            onClick={handleWhatsAppClick}
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            {product.inStock ? 'Contáctenos por WhatsApp' : 'No disponible'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
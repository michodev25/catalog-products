import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Filter, X } from "lucide-react";
import { SalesCarousel } from "./SalesCarousel";

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

// Datos de muestra
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 14\" M3 Pro",
    price: 2299,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1754928864131-21917af96dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NTY2NDE5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Portátiles",
    features: [
      "Chip M3 Pro de 11 núcleos",
      "18GB de memoria unificada",
      "512GB de almacenamiento SSD",
      "Pantalla Liquid Retina XDR de 14\"",
      "Hasta 18 horas de duración de batería"
    ],
    rating: 4.8,
    inStock: true
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU2NjUxMzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Smartphones",
    features: [
      "Chip A17 Pro",
      "Sistema de cámaras Pro de 48MP",
      "Pantalla Super Retina XDR de 6.7\"",
      "Titanio con Action Button",
      "USB-C con USB 3"
    ],
    rating: 4.9,
    inStock: true
  },
  {
    id: "3",
    name: "AirPods Pro (2ª generación)",
    price: 279,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU2NjI3MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Audio",
    features: [
      "Cancelación activa de ruido",
      "Audio espacial personalizado",
      "Hasta 6 horas de reproducción",
      "Estuche de carga MagSafe",
      "Resistente al sudor y agua IPX4"
    ],
    rating: 4.7,
    inStock: true
  },
  {
    id: "4",
    name: "iPad Air (5ª generación)",
    price: 699,
    image: "https://images.unsplash.com/photo-1604319463636-54cf7751107f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBjb21wdXRlciUyMGRldmljZXxlbnwxfHx8fDE3NTY1NzYwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tablets",
    features: [
      "Chip M1 de Apple",
      "Pantalla Liquid Retina de 10.9\"",
      "Cámara frontal ultra gran angular de 12MP",
      "Compatible con Apple Pencil (2ª gen)",
      "Touch ID integrado"
    ],
    rating: 4.6,
    inStock: false
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    price: 449,
    image: "https://images.unsplash.com/photo-1690016424217-03f4d9427a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwZml0bmVzc3xlbnwxfHx8fDE3NTY2NTY5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Wearables",
    features: [
      "Chip S9 con GPU de 4 núcleos",
      "Pantalla Always-On Retina",
      "Double Tap y Siri en el dispositivo",
      "Resistente al agua hasta 50 metros",
      "Seguimiento avanzado de salud"
    ],
    rating: 4.5,
    inStock: true
  },
  {
    id: "6",
    name: "Magic Keyboard para MacBook",
    price: 179,
    image: "https://images.unsplash.com/photo-1656711081969-9d16ebc2d210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMG1lY2hhbmljYWx8ZW58MXx8fHwxNzU2NTYzODMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Accesorios",
    features: [
      "Teclas con mecanismo tijera",
      "Touch ID integrado",
      "Conexión Lightning a USB-C",
      "Diseño compacto y portátil",
      "Retroiluminación automática"
    ],
    rating: 4.3,
    inStock: true
  }
];

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [cart, setCart] = useState<Product[]>([]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(sampleProducts.map(p => p.category)));
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    // Aquí podrías añadir una notificación
    console.log(`Añadido al carrito: ${product.name}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("name");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Catálogo de Productos</h1>
        <p className="text-muted-foreground">
          Descubre nuestra selección de productos tecnológicos de última generación
        </p>
      </div>
      
      <SalesCarousel 
        images={[
          "/ofertas/oferta1.jpg",
          "/ofertas/oferta2.jpg",
          "/ofertas/oferta3.jpg",
        ]} 
        />

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filters */}
        {(searchTerm || selectedCategory !== "all") && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Búsqueda: {searchTerm}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                  onClick={() => setSelectedCategory("all")}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <Filter className="w-3 h-3 mr-1" />
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredProducts.length} de {sampleProducts.length} productos
          {cart.length > 0 && (
            <span className="ml-4">
              • {cart.length} producto{cart.length !== 1 ? 's' : ''} en el carrito
            </span>
          )}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No se encontraron productos que coincidan con los filtros seleccionados.
          </p>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="mt-4"
          >
            Mostrar todos los productos
          </Button>
        </div>
      )}
    </div>
  );
}
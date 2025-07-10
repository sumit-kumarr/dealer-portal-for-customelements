import React from 'react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Star, Package } from 'lucide-react';

// Import product images
import helmetA from '@/assets/helmet-a.jpg';
import glovesPro from '@/assets/gloves-pro.jpg';
import steelBoots from '@/assets/steel-boots.jpg';
import safetyVest from '@/assets/safety-vest.jpg';
import powerDrill from '@/assets/power-drill.jpg';
import wrenchSet from '@/assets/wrench-set.jpg';
import ledLight from '@/assets/led-light.jpg';
import toolBelt from '@/assets/tool-belt.jpg';
import measuringTape from '@/assets/measuring-tape.jpg';
import safetyGoggles from '@/assets/safety-goggles.jpg';
import nailGun from '@/assets/nail-gun.jpg';
import hardHat from '@/assets/hard-hat.jpg';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Map image names to imported images
  const imageMap: { [key: string]: string } = {
    'helmet-a': helmetA,
    'gloves-pro': glovesPro,
    'steel-boots': steelBoots,
    'safety-vest': safetyVest,
    'power-drill': powerDrill,
    'wrench-set': wrenchSet,
    'led-light': ledLight,
    'tool-belt': toolBelt,
    'measuring-tape': measuringTape,
    'safety-goggles': safetyGoggles,
    'nail-gun': nailGun,
    'hard-hat': hardHat,
  };

  const productImage = imageMap[product.image] || imageMap['helmet-a'];

  return (
    <Card className="glass-card group hover:shadow-glow transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-muted/20 p-4 flex items-center justify-center overflow-hidden">
          <img 
            src={productImage} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="hidden items-center justify-center w-full h-full">
            <Package className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
        
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        
        {!product.inStock && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground"
          >
            Out of Stock
          </Badge>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </div>
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full mt-4 bg-primary hover:bg-primary-glow text-primary-foreground"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
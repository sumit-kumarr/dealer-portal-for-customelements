import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  SlidersHorizontal,
  Package,
  Star
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import productsData from '@/data/products.json';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by stock status
    if (showOnlyInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Filter by featured
    if (showOnlyFeatured) {
      filtered = filtered.filter(product => product.featured);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, showOnlyInStock, showOnlyFeatured]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setShowOnlyInStock(false);
    setShowOnlyFeatured(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gradient">Products</h1>
            <p className="text-muted-foreground">
              Browse our complete product catalog
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10"
              />
            </div>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="glass-button">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <Button
                variant={showOnlyInStock ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowOnlyInStock(!showOnlyInStock)}
                className="glass-button"
              >
                <Package className="h-4 w-4 mr-2" />
                In Stock
              </Button>
              <Button
                variant={showOnlyFeatured ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                className="glass-button"
              >
                <Star className="h-4 w-4 mr-2" />
                Featured
              </Button>
            </div>

            {/* Clear Filters */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {(searchTerm || selectedCategory !== 'All' || showOnlyInStock || showOnlyFeatured) && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="glass-button">
              Search: {searchTerm}
            </Badge>
          )}
          {selectedCategory !== 'All' && (
            <Badge variant="secondary" className="glass-button">
              Category: {selectedCategory}
            </Badge>
          )}
          {showOnlyInStock && (
            <Badge variant="secondary" className="glass-button">
              In Stock Only
            </Badge>
          )}
          {showOnlyFeatured && (
            <Badge variant="secondary" className="glass-button">
              Featured Only
            </Badge>
          )}
        </div>
      )}

      {/* Products Grid */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
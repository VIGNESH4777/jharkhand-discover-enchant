import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search, Star, Heart, Filter, Truck } from "lucide-react";
import Navigation from "@/components/Navigation";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<string[]>([]);

  const products = [
    {
      id: "1",
      name: "Handwoven Gamcha",
      description: "Traditional cotton towel with intricate tribal patterns",
      price: 450,
      originalPrice: 650,
      category: "textiles",
      rating: 4.8,
      reviews: 124,
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      seller: "Santhal Weavers Collective",
      inStock: true,
      discount: 31
    },
    {
      id: "2",
      name: "Dokra Horse Figurine",
      description: "Handcrafted bronze horse using ancient lost-wax technique",
      price: 2800,
      originalPrice: 3200,
      category: "crafts",
      rating: 4.9,
      reviews: 87,
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      seller: "Dhokra Artists Guild",
      inStock: true,
      discount: 13
    },
    {
      id: "3",
      name: "Organic Tamarind",
      description: "Sun-dried tamarind from tribal forest gardens",
      price: 280,
      originalPrice: 320,
      category: "food",
      rating: 4.6,
      reviews: 203,
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      seller: "Forest Produce Cooperative",
      inStock: true,
      discount: 13
    },
    {
      id: "4",
      name: "Bamboo Basket Set",
      description: "Set of 3 eco-friendly storage baskets with traditional weaving",
      price: 1200,
      originalPrice: 1500,
      category: "crafts",
      rating: 4.7,
      reviews: 156,
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      seller: "Bamboo Craft Collective",
      inStock: false,
      discount: 20
    },
    {
      id: "5",
      name: "Tribal Honey",
      description: "Pure forest honey collected by traditional beekeepers",
      price: 680,
      originalPrice: 800,
      category: "food",
      rating: 4.9,
      reviews: 298,
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      seller: "Munda Honey Producers",
      inStock: true,
      discount: 15
    },
    {
      id: "6",
      name: "Sohrai Art Print",
      description: "High-quality print of traditional Sohrai wall painting",
      price: 850,
      originalPrice: 1000,
      category: "art",
      rating: 4.8,
      reviews: 92,
      image: "/lovable-uploads/3a818645-a0d1-4c82-b8a7-75a7bfc38d78.png",
      seller: "Hazaribagh Art Center",
      inStock: true,
      discount: 15
    }
  ];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "textiles", label: "Textiles" },
    { value: "crafts", label: "Handicrafts" },
    { value: "food", label: "Organic Food" },
    { value: "art", label: "Traditional Art" },
    { value: "jewelry", label: "Jewelry" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(id => id !== productId));
  };

  const isInCart = (productId: string) => cart.includes(productId);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              <span className="hero-text">Tribal Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Support local artisans and discover authentic Jharkhand handicrafts, textiles, and organic products
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cart Status */}
          {cart.length > 0 && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">
                  {cart.length} item{cart.length > 1 ? 's' : ''} in cart
                </span>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary-glow">
                View Cart
              </Button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      -{product.discount}%
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary">Out of Stock</Badge>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-playfair">{product.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                  <p className="text-xs text-muted-foreground">by {product.seller}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-primary">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Truck className="w-3 h-3" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  {product.inStock ? (
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          if (isInCart(product.id)) {
                            removeFromCart(product.id);
                          } else {
                            addToCart(product.id);
                          }
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {isInCart(product.id) ? 'Remove' : 'Add to Cart'}
                      </Button>
                      <Button className="bg-primary hover:bg-primary-glow">
                        Buy Now
                      </Button>
                    </div>
                  ) : (
                    <Button disabled className="w-full">
                      Out of Stock
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-playfair font-bold mb-4">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all products
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
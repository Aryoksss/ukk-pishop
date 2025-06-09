import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';

interface Category {
    name: string;
}
interface Product {
    id: number;
    name: string;
    category: Category;
    price: number;
    stock: number;
    description: string;
    image: string;
}
interface DashboardProps {
    latestProducts: Product[];
    recommendedProducts: Product[];
    mostOrderedProducts: Product[];
}

export default function Dashboard({ latestProducts, recommendedProducts, mostOrderedProducts }: DashboardProps) {
    const handleProductClick = (id: number) => {
        // Handle product click event
        return id;
    };

    return (
        <AppLayout>
            <div className="flex flex-col items-center gap-4 p-4 px-16">
                <Carousel className="w-full h-90" opts={{ loop: true }}>
                    <CarouselContent className="">
                        <CarouselItem className="h-100 w-full bg-black">
                            <img src="images/novapro.png" alt="" className="h-full w-full object-cover" />
                        </CarouselItem>
                        <CarouselItem className="h-100 w-full bg-white">
                            <img src="images/novapro-carousel.svg" alt="" className="h-full w-full object-cover" />
                        </CarouselItem>
                        <CarouselItem className="h-100 w-full bg-gray-200">
                            <img src="images/sades.png" alt="" className="h-full w-full object-cover" />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="mt-12 grid grid-cols-5 gap-4 dark:text-black">
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Mouse</h2>
                        <img 
                            src="images/card/mouse.png" 
                            alt="Mouse" 
                            className="absolute inset-0 h-full w-full translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Keyboard</h2>
                        <img 
                            src="images/card/keyboard.png" 
                            alt="Keyboard" 
                            className="absolute inset-0 h-full w-full translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Deskmat</h2>
                        <img 
                            src="images/card/deskmat.png" 
                            alt="Deskmat" 
                            className="absolute inset-0 h-full w-full translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Keycap</h2>
                        <img 
                            src="images/card/keycap.png" 
                            alt="Keycap" 
                            className="absolute inset-0 h-full w-full translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Switch</h2>
                        <img 
                            src="images/card/switch.png" 
                            alt="Switch" 
                            className="absolute inset-0 h-full w-full translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                </div>
                <div className="mt-16 w-full space-y-12">
                    <div className="space-y-6">
                        <div className="text-left space-y-2 dark:text-black">
                            <h2 className="text-3xl font-bold text-gray-800">Produk Terbaru</h2>
                            <p className="text-gray-600">Temukan koleksi produk terbaru kami</p>
                        </div>
                        <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {latestProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                        <p className="text-xs opacity-90">Rp {product.price.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="text-left space-y-2 dark:text-black">
                            <h2 className="text-3xl font-bold text-gray-800">Rekomendasi Produk</h2>
                            <p className="text-gray-600">Produk pilihan khusus untuk Anda</p>
                        </div>
                        <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {recommendedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                        <p className="text-xs opacity-90">Rp {product.price.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="text-left space-y-2 dark:text-black">
                            <h2 className="text-3xl font-bold text-gray-800">Produk Terlaris</h2>
                            <p className="text-gray-600">Produk favorit pelanggan kami</p>
                        </div>
                        <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {mostOrderedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                        <p className="text-xs opacity-90">Rp {product.price.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

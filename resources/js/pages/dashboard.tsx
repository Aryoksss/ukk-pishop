import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';

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
        console.log(`Navigating to product with ID: ${id}`);
        router.visit(route('product.show', { id }));
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
                            src="images/mouse.png" 
                            alt="Mouse" 
                            className="absolute inset-0 h-full w-full translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300 hover:h-32">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Keyboard</h2>
                        <img 
                            src="images/keyboard.png" 
                            alt="Keyboard" 
                            className="absolute bottom-0 h-20 w-20 translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300 hover:h-32">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Deskmat</h2>
                        <img 
                            src="images/deskmat.png" 
                            alt="Deskmat" 
                            className="absolute bottom-0 h-20 w-20 translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300 hover:h-32">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Keycaps</h2>
                        <img 
                            src="images/keycaps.png" 
                            alt="Keycaps" 
                            className="absolute bottom-0 h-20 w-20 translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                    <div className="group relative flex h-24 items-center justify-center overflow-hidden rounded-sm bg-white px-16 py-4 shadow-md transition-all duration-300 hover:h-32">
                        <h2 className="p-4 text-2xl transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">Switch</h2>
                        <img 
                            src="images/switch.png" 
                            alt="Switch" 
                            className="absolute bottom-0 h-20 w-20 translate-y-full object-cover transition-transform duration-300 group-hover:translate-y-0"
                        />
                    </div>
                </div>
                <h2 className="mt-12 self-start text-2xl dark:text-black">Produk</h2>
                <h3 className="self-start text-lg dark:text-black">Temukan produk terbaru kami</h3>
                <div className="grid w-full grid-cols-5 gap-4">
                    {latestProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative aspect-square cursor-pointer rounded-md shadow-md transition-all"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} className="h-full w-full" />
                            <div className="bg-opacity-30 absolute inset-0 bg-zinc-900/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
                <h3 className="self-start text-lg dark:text-black">Rekomendasi Produk</h3>
                <div className="grid w-full grid-cols-5 gap-4">
                    {recommendedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative aspect-square cursor-pointer rounded-md shadow-md transition-all"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} className="h-full w-full" />
                            <div className="bg-opacity-30 absolute inset-0 bg-zinc-900/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
                <h3 className="self-start text-lg dark:text-black">Produk Terlaris</h3>
                <div className="grid w-full grid-cols-5 gap-4">
                    {mostOrderedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative aspect-square cursor-pointer rounded-md shadow-md transition-all"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} className="h-full w-full" />
                            <div className="bg-opacity-30 absolute inset-0 bg-zinc-900/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

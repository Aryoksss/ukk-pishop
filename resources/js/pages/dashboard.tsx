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
                <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent className="">
                        <CarouselItem className="min-h-96 w-full bg-black">
                            <img src="novapro.png" alt="" className="h-full w-full object-cover" />
                        </CarouselItem>
                        <CarouselItem className="min-h-96 w-full bg-white">
                            <img src="images/novapro-carousel.svg" alt="" className="h-full w-full object-cover" />
                        </CarouselItem>
                        <CarouselItem className="min-h-96 w-full bg-gray-200">
                            <img src="novapro.png" alt="" className="h-full w-full object-cover" />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="mt-12 grid grid-cols-5 gap-4">
                    <div className="flex items-center justify-center rounded-sm bg-white shadow-md">
                        <h2 className="p-4 text-2xl">Mouse</h2>
                    </div>
                    <div className="flex items-center justify-center rounded-sm bg-white px-16 py-4 shadow-md">
                        <h2 className="p-4 text-2xl">Keyboard</h2>
                    </div>
                    <div className="flex items-center justify-center rounded-sm bg-white px-16 py-4 shadow-md">
                        <h2 className="p-4 text-2xl">Deskmat</h2>
                    </div>
                    <div className="flex items-center justify-center rounded-sm bg-white px-16 py-4 shadow-md">
                        <h2 className="p-4 text-2xl">Keycaps</h2>
                    </div>
                    <div className="flex items-center justify-center rounded-sm bg-white px-16 py-4 shadow-md">
                        <h2 className="p-4 text-2xl">Switch</h2>
                    </div>
                </div>
                <h2 className="mt-12 self-start text-2xl">Produk</h2>
                <h3 className="self-start text-lg">Temukan produk terbaru kami</h3>
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
                <h3 className="self-start text-lg">Rekomendasi Produk</h3>
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
                <h3 className="self-start text-lg">Produk Terlaris</h3>
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

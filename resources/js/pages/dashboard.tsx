import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="flex flex-col items-center gap-4 p-4 px-16">
                <Carousel className="w-full">
                    <CarouselContent className="">
                        <CarouselItem className="min-h-96 w-full bg-black">
                            <img src="novapro.png" alt="" />
                        </CarouselItem>
                        <CarouselItem className="min-h-96 w-full bg-white">
                            <img src="novapro.png" alt="" />
                        </CarouselItem>
                        <CarouselItem className="min-h-96 w-full bg-gray-200">
                            <img src="novapro.png" alt="" />
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
                <div className="grid w-full grid-cols-5 gap-4 overflow-x-scroll">
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                </div>
                <h3 className="self-start text-lg">Rekomendasi Produk</h3>
                <div className="grid w-full grid-cols-5 gap-4 overflow-x-scroll">
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                </div>
                <h3 className="self-start text-lg">Produk Terlaris</h3>
                <div className="grid w-full grid-cols-5 gap-4 overflow-x-scroll">
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                    <div className="aspect-square rounded-md bg-white shadow-md">
                        <img src="monoseries.jpg" alt="" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

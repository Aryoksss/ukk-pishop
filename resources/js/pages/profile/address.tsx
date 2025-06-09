import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import ProfileLayout from '@/layouts/profile/layout';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type ProfileAddressForm = {
    line1: string;
    line2: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
};

type Address = {
    id: number;
    line1: string;
    line2?: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
};

export default function ProfilePage({ addresses }: { addresses: Address[] }) {
    const { data, setData, post, processing, errors } = useForm<ProfileAddressForm>({
        line1: '',
        line2: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('profile.address.store'));
    };

    return (
        <ProfileLayout>
            <div className="flex flex-col p-4">
                <h1 className="text-2xl">Alamat Anda</h1>
                <Separator className="my-2" />
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <div key={address.id} className="mb-4 rounded-lg border p-4">
                            <h2 className="text-lg font-semibold">{address.line1}</h2>
                            {address.line2 && <p className="text-muted-foreground text-sm">{address.line2}</p>}
                            <p className="text-muted-foreground text-sm">
                                {address.city}, {address.province}, {address.postal_code}, {address.country}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Belum ada alamat</p>
                )}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Tambah Alamat Baru</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <DialogHeader>
                                <DialogTitle>Tambah Alamat Baru</DialogTitle>
                                <DialogDescription>Silakan masukkan alamat baru Anda di sini.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <InputError message={errors.line1} />
                                    <Label htmlFor="line-1">Alamat Baris 1</Label>
                                    <Input id="line-1" name="line-1" value={data.line1} onChange={(e) => setData('line1', e.target.value)} required />
                                </div>
                                <div className="grid gap-3">
                                    <InputError message={errors.line2} />
                                    <Label htmlFor="line-2">Alamat Baris 2</Label>
                                    <Input id="line-2" name="line-2" value={data.line2} onChange={(e) => setData('line2', e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="city">Kota / Kabupaten</Label>
                                    <Input id="city" name="city" value={data.city} onChange={(e) => setData('city', e.target.value)} required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="province">Provinsi</Label>
                                    <Input
                                        id="province"
                                        name="province"
                                        value={data.province}
                                        onChange={(e) => setData('province', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="postal_code">Kode Pos</Label>
                                    <Input
                                        id="postal_code"
                                        name="postal_code"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        type="number"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="country">Negara</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Batal</Button>
                                </DialogClose>
                                <Button type="submit">{processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Simpan Perubahan</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </ProfileLayout>
    );
}

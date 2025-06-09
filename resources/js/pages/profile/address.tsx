import { Separator } from '@/components/ui/separator';
import ProfileLayout from '@/layouts/profile/layout';

export default function ProfilePage() {
    return (
        <ProfileLayout>
            <div className="flex flex-col p-4">
                <h1 className="text-2xl">Alamat Anda</h1>
                <Separator className="my-2" />
            </div>
        </ProfileLayout>
    );
}

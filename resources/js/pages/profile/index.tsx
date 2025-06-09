import { Separator } from '@/components/ui/separator';
import ProfileLayout from '@/layouts/profile/layout';
import { SharedData } from '@/types';
import moment from 'moment';

export default function ProfilePage({ auth }: SharedData) {
    return (
        <ProfileLayout>
            <div className="flex flex-col p-4">
                <h1 className="text-2xl">
                    Hello, <span className="font-semibold">{auth.user.name}</span>
                </h1>
                <Separator className="my-2" />
                <div className="flex flex-col gap-1 rounded-md bg-gray-50 p-4">
                    <div className="flex gap-2">
                        <label htmlFor="email">Email :</label>
                        <p className="text-gray-700">{auth.user.email}</p>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="name">Username :</label>
                        <p className="text-gray-700">{auth.user.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="phone">Nomor Telepon :</label>
                        <p className="text-gray-700">{auth.user.phone || '-'}</p>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="created_at">Dibuat pada :</label>
                        <p className="text-gray-700">{moment(auth.user.created_at).format('LL')}</p>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="updated_at">Terakhir diperbarui :</label>
                        <p className="text-gray-700">{moment(auth.user.updated_at).format('LL')}</p>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}

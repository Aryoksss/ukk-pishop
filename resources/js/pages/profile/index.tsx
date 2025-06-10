import ProfileLayout from '@/layouts/profile/layout';
import { SharedData } from '@/types';
import moment from 'moment-timezone';
import 'moment/locale/id';

moment.locale('id'); // Set locale to Indonesian

export default function ProfilePage({ auth }: SharedData) {
    return (
        <ProfileLayout>
            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-800">
                        Hello, <span className="font-medium text-gray-800">{auth.user.name}</span>
                    </h1>
                </div>

                <div className="space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <span className="min-w-32 text-sm font-medium text-gray-600">Email</span>
                            <span className="text-gray-800">{auth.user.email}</span>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <span className="min-w-32 text-sm font-medium text-gray-600">Username</span>
                            <span className="text-gray-800">{auth.user.name}</span>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <span className="min-w-32 text-sm font-medium text-gray-600">Nomor Telepon</span>
                            <span className="text-gray-800">{auth.user.phone || '-'}</span>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <span className="min-w-32 text-sm font-medium text-gray-600">Dibuat pada</span>
                            <span className="text-gray-800">
                                {moment(auth.user.created_at).tz('Asia/Jakarta').locale('id').format('dddd, DD MMMM YYYY')}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <span className="min-w-32 text-sm font-medium text-gray-600">Terakhir diperbarui</span>
                            <span className="text-gray-800">
                                {moment(auth.user.updated_at).tz('Asia/Jakarta').locale('id').format('dddd, DD MMMM YYYY')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}

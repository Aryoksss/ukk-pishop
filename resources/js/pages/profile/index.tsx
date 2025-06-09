import ProfileLayout from '@/layouts/profile/layout';
import { SharedData } from '@/types';
import moment from 'moment';
import 'moment/locale/id';


export default function ProfilePage({ auth }: SharedData) {
    return (
        <ProfileLayout>
            <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-light text-gray-800">
                Hello, <span className="font-medium text-gray-800">{auth.user.name}</span>
                </h1>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 min-w-32">Email</span>
                    <span className="text-gray-800">{auth.user.email}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 min-w-32">Username</span>
                    <span className="text-gray-800">{auth.user.name}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 min-w-32">Nomor Telepon</span>
                    <span className="text-gray-800">{auth.user.phone || '-'}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 min-w-32">Dibuat pada</span>
                    <span className="text-gray-800">{moment(auth.user.created_at).locale('id').format('dddd, DD MMMM YYYY')}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 min-w-32">Terakhir diperbarui</span>
                    <span className="text-gray-800">{moment(auth.user.updated_at).locale('id').format('dddd, DD MMMM YYYY')}</span>
                </div>
                </div>
            </div>
            </div>
        </ProfileLayout>
    );
}

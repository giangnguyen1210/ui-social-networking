import React from 'react'

export async function generateMetadata() {
    return {
        title: 'Không tìm thấy trang',
    }
}
function NotFoundPage() {
    return <div className='flex flex-col text-center'>
        <h1 className='text-2xl mb-4'>Rất tiếc, trang này hiện không khả dụng.</h1>
        <p className='text-base'>Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ. <span> <a href='/home' className='text-blue-500'>Quay lại trang chủ</a></span> </p>
    </div>
}

export default NotFoundPage
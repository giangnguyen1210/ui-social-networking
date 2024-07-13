import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useCreatePost from "../../hooks/useCreatePost";
import { IPostRequestDto } from "../../types/post.type";
import { tokenDecode } from "@/common/token-decode/token-decode";

interface ModalProps {
    show: boolean
    onClose: () => void
    onConfirm?: () => void
    title: string
    message: string
    icon?: string
}

const CreatePostModal: React.FC<ModalProps> = ({ show, icon, onClose, onConfirm, title, message }) => {
    const { mutate: createPost, isSuccess } = useCreatePost()
    const userId = tokenDecode();
    const [postData, setPostData] = useState<IPostRequestDto>({
        title: '',
        files: null,
        previews: [],
        userId: Number(userId)
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostData({
            ...postData,
            title: e.target.value
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const previews = Array.from(files).map(file => URL.createObjectURL(file));
            setPostData({
                ...postData,
                files: files,
                previews: previews
            });

        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (postData.files) {
            for (let i = 0; i < postData.files.length; i++) {
                formData.append('files', postData.files[i]);
            }
        }
        // console.log(postData.files[0], postData.files[1]);
        // console.log(formData.getAll('files'));
        formData.append('userId', postData.userId.toString());
        formData.append('title', postData.title);

        createPost(formData as any); // Chuyển đổi formData thành any để phù hợp với mutate
        // Xử lý việc upload ảnh và các thông tin khác tại đây
    };
    if (isSuccess) {
        onClose()
    }
    const getImageClass = (index: number, total: number) => {
        if (total === 1) return "w-full max-h-[520px]";
        if (total === 2) return "w-[50%] h-auto";
        if (total === 3) {
            if (index === 0) return "w-[50%] h-full";
            return "w-[50%] h-[50%]";
        }
        if (total > 3) {
            if (index === 0) return "w-[50%] h-full";
            if (index < 3) return "w-[50%] h-[50%]";
            return "w-[50%] h-[50%]"; // or "hidden" if you want to hide extra files
        }
        return "w-[50%] max-h-[600px]";
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-[500px] h-auto rounded mb-2 p-5">
                <div className="flex items-center justify-between">
                    <div className="text-lg font-medium">Tạo bài viết</div>
                    <button onClick={onClose} className="material-symbols-outlined" style={{ fontSize: 26 }}>
                        close
                    </button>
                </div>
                <div className="flex-1 max-h-[500px] overflow-y-auto">
                    <TextField
                        className="w-full p-[4px]"
                        id="outlined-textarea"
                        placeholder="Hãy chia sẻ nhiều điều thú vị"
                        multiline
                        rows={4}
                        onChange={handleTextChange}
                    />
                    <label htmlFor="file" className="flex items-center cursor-pointer mt-2">
                        <div className="material-symbols-outlined">image</div>
                        Thêm ảnh
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        hidden
                    />
                    <div className="flex flex-wrap border rounded overflow-hidden mt-2">
                        {postData.previews.map((preview, index) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <div key={index} className={`${getImageClass(index, postData.previews.length)} relative pl-[2px] pr-[2px]`}>
                                <img src={preview} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
                <Button type="submit" className="w-full" variant='contained' disabled={!postData.files}>Đăng</Button>
            </div>

            {/* <Button type="submit" className="w-full" variant='contained'>Đăng</Button> */}
        </form>
    )
}

export default CreatePostModal;

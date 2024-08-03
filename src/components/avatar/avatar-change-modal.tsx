import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { tokenDecode } from "@/common/token-decode/token-decode";
import useCreateComment from "@/view/user/hooks/useComment";
import { ICommentRequest } from "@/view/user/types/user.type";
import { useUpdateAvatar } from '@/view/user/hooks/useUserGetInfo';

interface ModalProps {
    show: boolean;
    onClose: () => void;
}

const AvatarChangeModal: React.FC<ModalProps> = ({ show, onClose }) => {
    const userId = tokenDecode();
    const [avatar, setAvatar] = useState<File | null>(null);
    const {mutate: updateAvatar, } = useUpdateAvatar()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (avatar) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('files', avatar);
            updateAvatar(formData, {
                onSuccess: () => {
                    onClose()
                }
            });
        }
        
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setAvatar(files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-[500px] h-auto rounded mb-2 p-5">
                <div className="flex items-center justify-between">
                    <div className="text-lg font-medium">Đổi ảnh đại diện</div>
                    <button onClick={onClose} className="material-symbols-outlined" style={{ fontSize: 26 }}>
                        close
                    </button>
                </div>
                <div className="flex-1 max-h-[500px] overflow-y-auto">
                    <label htmlFor="file" className="flex items-center cursor-pointer mt-2">
                        <div className="material-symbols-outlined">image</div>
                        Tải ảnh lên
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        hidden
                    />
                    {avatar && (
                        <div className="mt-2">
                            <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" className="w-full h-auto" />
                        </div>
                    )}
                </div>
                <Button type="submit" className="w-full" variant='contained' disabled={!avatar}>Cập nhật</Button>
            </div>
        </form>
    );
};

export default AvatarChangeModal;

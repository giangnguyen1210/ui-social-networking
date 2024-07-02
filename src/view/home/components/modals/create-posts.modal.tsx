import { Button, TextField } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
	content: string;
	files: FileList;
}
function CreatePostModal() {
	console.log("");
	const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [previews, setPreviews] = useState<string[]>([]);

	const onSubmit = (data: FormData) => {
		const files = Array.from(data.files);
		if (files.every(file => file.type.startsWith('image/') || file.type.startsWith('video/'))) {
			console.log({
				content: data.content,
				files: files
			});
			// Gửi dữ liệu tới API hoặc xử lý dữ liệu tại đây
		} else {
			alert('Please upload valid image or video files');
		}
	};

	const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const previewsArray = Array.from(files).map(file => URL.createObjectURL(file));
			setPreviews(previewsArray);
		}
	};

	const removePreview = (index: number) => {
		setPreviews(previews.filter((_, i) => i !== index));
	};
	return (
		<div className="flex flex-col gap-4 w-[500px] h-[500px] rounded">
			<form onSubmit={handleSubmit(onSubmit)}>

			<div className="flex items-center justify-between">
				<div className="text-lg font-medium">Tạo bài viết</div>
				<div className="material-symbols-outlined" style={{ fontSize: 26 }}>
					close
				</div>
			</div>
			<TextField
				id="outlined-textarea"
				placeholder="Hãy chia sẻ nhiều điều thú vị"
				multiline
				rows={4}
			/>
			<input type="file" accept="image/*,video/*"
				{...field}
				multiple
				onChange={(e) => {
					field.onChange(e);
					handleFilesChange(e);
				}}
				style={{ display: 'none' }}
				id="file-upload" />
			<label htmlFor="file-upload">
				<Button variant="contained" component="span" startIcon={<AddPhotoAlternateIcon />}>
					Thêm ảnh/video
				</Button>
			</label>
			</form>
		</div>
	)
}

export default CreatePostModal

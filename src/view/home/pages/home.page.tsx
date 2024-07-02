'use client'

import useAppModal from "@/components/modals/app-modal/store"
import { Button } from "@mui/material"
import CreatePostModal from "../components/modals/create-posts.modal"

function HomePageView() {
	const { open, close, setModalOptions, isOpen } = useAppModal()

	const handleClickOpenModal = () =>{
		setModalOptions({
			showCloseIcon: false,
			content: <CreatePostModal />,
		})
		open()
		console.log("isOpen",isOpen);
	}
	return (
		<div className='home'>
			<div className="home__header">
				<Button className="w-full" variant="outlined" onClick={()=>handleClickOpenModal()}>
					Thêm bài viết
				</Button>
			</div>
			<div className="home__content">

			</div>
			<div className="home__footer">

			</div>
		</div>
	)
}

export default HomePageView

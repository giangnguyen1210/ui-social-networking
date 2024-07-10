'use client'

import useAppModal from "@/components/modals/app-modal/store"
import { Button } from "@mui/material"
import CreatePostModal from "../components/modals/create-posts.modal"
import { useGetPostByFollowing } from "../hooks/useGetPostByFollowing"
import { useGetFollowingByUser } from "@/view/user/hooks/useGetFollow"
import { IUser, IUserRequest } from "@/view/user/types/user.type"
import { tokenDecode } from "@/common/token-decode/token-decode"
import { ListPost } from "@/components/list-post"

function HomePageView() {
	const { open, close, setModalOptions, isOpen } = useAppModal()

	const handleClickOpenModal = () =>{
		setModalOptions({
			showCloseIcon: false,
			content: <CreatePostModal onClose={close} show={false} title={""} message={""} />,
		})
		open()
	}

	const userId = tokenDecode();
	const userRequest: IUserRequest = {
		id: Number(userId)
	  }
	//   console.log(userId);
	const { data: usersFollowing, isSuccess: isUsersFollowerSucess } = useGetFollowingByUser(userRequest);
	//   console.log(usersFollowing?.data);
	// const { data: postsByUserId, isSuccess: isGetPostSuccess } = useGetPostByFollowing(userRequest);

	return (
		<div className='home'>
			<div className="home__header">
				<Button className="w-full" variant="outlined" onClick={()=>handleClickOpenModal()}>
					Thêm bài viết
				</Button>
			</div>
			<div className="home__content">
				{usersFollowing?.data?.map((user: IUser) => (
					// eslint-disable-next-line react/jsx-key
					<ListPost followings={user}/>
				))}
			</div>
			<div className="home__footer">

			</div>
		</div>
	)
}

export default HomePageView

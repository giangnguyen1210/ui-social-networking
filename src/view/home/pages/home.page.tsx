'use client'

import useAppModal from "@/components/modals/app-modal/store"
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import CreatePostModal from "../components/modals/create-posts.modal"
import { useGetPostByFollowing } from "../hooks/useGetPostByFollowing"
import { useGetFollowingByUser } from "@/view/user/hooks/useGetFollow"
import { IUser, IUserRequest } from "@/view/user/types/user.type"
import { tokenDecode } from "@/common/token-decode/token-decode"
import { ListPost } from "@/components/list-post"
import { useGetPostByUserId } from "@/view/user/hooks/useGetPostByUser"
import { useRouter } from "next/navigation"
import { APP_ROUTER } from '@/common/config';
import AvatarComponent from "@/components/avatar"
import ImageSlider from "@/components/post-images"
import Likes from "@/components/likes"
import Comments from "@/components/comments"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUserGetInfoById } from "@/view/user/hooks/useUserGetInfo"
import { formatDateFromArray } from "@/utils/format-datetime"

interface IPost {
	id: string;
	createdAt: string;
	title: string;
	filePost: { id: string; dataFile: string }[];
}

interface IListPost {
	// posts: IPost[];
	// username: string;
	followings: IUser;
}

function HomePageView() {
	const { open, close, setModalOptions, isOpen } = useAppModal()

	const handleClickOpenModal = () => {
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
	const { data: post, isSuccess: isGetPost } = useGetPostByUserId(userRequest);
    const { data: userData } = useUserGetInfoById(Number(userId));

	//   console.log(userId);
	const { data: usersFollowing, isSuccess: isUsersFollowerSucess } = useGetFollowingByUser(userRequest);
	//   console.log(usersFollowing?.data);
	// const { data: postsByUserId, isSuccess: isGetPostSuccess } = useGetPostByFollowing(userRequest);
	const router = useRouter()
	const gotoDetail = () => {
		router.push(APP_ROUTER.paths.home.profile.path)

	}
	return (
		<div className='home'>
			<div className="home__header">
				<Button className="w-full" variant="outlined" onClick={() => handleClickOpenModal()}>
					Thêm bài viết
				</Button>
			</div>
			<div className="home__content">
				{post?.data?.map((post: IPost) => (
					<Card key={post.id} sx={{ marginTop: "20px" }}>
						<CardHeader
							onClick={() => gotoDetail()}
							avatar={
								<AvatarComponent width={40} height={40}  avatarData={userData?.avatarData?.dataFile}/>
							}
							action={
								<IconButton aria-label="settings">
									<MoreVertIcon />
								</IconButton>
							}
							title={userData?.username}
							subheader={formatDateFromArray(post.createdAt as any)}
						/>
						<ImageSlider post={post} maxHeight={550} maxWidth={550} />

						<CardContent>
							<Typography variant="body2" color="text.secondary">
								{post.title}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>

							<Likes postId={Number(post?.id)} />
							<Comments postId={Number(post?.id)} />

						</CardActions>
					</Card>
				))}
				{usersFollowing?.data?.map((user: IUser) => (
					// eslint-disable-next-line react/jsx-key
					<ListPost key={user?.id} followings={user} />
				))}

			</div>
			<div className="home__footer">

			</div>
		</div>
	)
}

export default HomePageView

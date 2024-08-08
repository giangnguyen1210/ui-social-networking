// // import React, { useState, useEffect } from 'react';
// // import {
// //     Box,
// //     Button,
// //     Divider,
// //     InputLabel,
// //     MenuItem,
// //     Select,
// //     SelectChangeEvent,
// //     TextField,
// //     CircularProgress,
// // } from "@mui/material";
// // import { tokenDecode } from "@/common/token-decode/token-decode";
// // import { IUpdateUserRequest } from "@/view/user/types/user.type";
// // import { useGetListGender, useUpdateUserInfo, useUserGetInfoById } from '@/view/user/hooks/useUserGetInfo';

// // interface ModalProps {
// //     show: boolean;
// //     onClose: () => void;
// // }

// // const UserUpdateModal: React.FC<ModalProps> = ({ show, onClose }) => {
// //     const userId = tokenDecode();
// //     const { data: listGender, isSuccess: listGenderSuccess } = useGetListGender();
// //     const { data: getUserInfo, isSuccess } = useUserGetInfoById(Number(userId));
// //     const { mutate: updateUser } = useUpdateUserInfo();

// //     const [dataUpdateUser, setDataUpdateUser] = useState<IUpdateUserRequest>({
// //         bio: '',
// //         username: '',
// //         name: '',
// //         id: Number(userId),
// //         birthday: '',
// //         gender: '0'
// //     });

// //     useEffect(() => {
// //         if (getUserInfo) {
// //             setDataUpdateUser({
// //                 bio: getUserInfo.bio,
// //                 username: getUserInfo.username,
// //                 name: getUserInfo.name,
// //                 id: getUserInfo.id,
// //                 birthday: getUserInfo.birthday,
// //                 gender: getUserInfo.gender.id
// //             });
// //         }
// //     }, [getUserInfo]);

// //     const handleChange = (event: SelectChangeEvent) => {
// //         setDataUpdateUser(prev => ({
// //             ...prev,
// //             gender: event.target.value
// //         }));
// //     };

// //     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         const { name, value } = event.target;
// //         setDataUpdateUser(prev => ({
// //             ...prev,
// //             [name]: value
// //         }));
// //     };

// //     const handleSubmit = (event: React.FormEvent) => {
// //         event.preventDefault();
// //         // updateUser(dataUpdateUser);
// //         console.log(dataUpdateUser);
// //         // onClose();
// //     };

// //     return (
// //         <section className="flex flex-col min-w-[400px] min-h-[500px] max-h-[500px] p-5">
// //             <div className="flex justify-between">
// //                 <div className="text-lg font-medium">Chỉnh sửa thông tin</div>
// //                 <button onClick={onClose} className="flex material-symbols-outlined" style={{ fontSize: 26 }}>
// //                     close
// //                 </button>
// //             </div>
// //             <Divider className="w-full pt-3" />

// //             <Box component="form" className='flex flex-col' noValidate onSubmit={handleSubmit}>
// //                 <InputLabel htmlFor="bio" className='my-2'>Tiểu sử</InputLabel>
// //                 <TextField
// //                     id="bio"
// //                     name='bio'
// //                     type='text'
// //                     placeholder="Tiểu sử"
// //                     multiline
// //                     rows={4}
// //                     value={dataUpdateUser.bio}
// //                     onChange={handleInputChange}
// //                 />
// //                 <InputLabel htmlFor="name" className='my-2'>Tên</InputLabel>
// //                 <TextField
// //                     id="name"
// //                     name='name'
// //                     type='text'
// //                     placeholder="Tên"
// //                     value={dataUpdateUser.name}
// //                     onChange={handleInputChange}
// //                 />
// //                 <InputLabel id="gender-select-label" className='my-2'>Giới tính</InputLabel>
// //                 <Select
// //                     labelId="gender-select-label"
// //                     id="gender-select"
// //                     value={dataUpdateUser.gender}
// //                     onChange={handleChange}
// //                 >
// //                     {listGender?.data?.map((gender: any) => (
// //                         <MenuItem key={gender?.id} value={gender?.id}>{gender?.gender}</MenuItem>
// //                     ))}
// //                 </Select>
// //                 <Button
// //                     type="submit"
// //                     fullWidth
// //                     variant="contained"
// //                     sx={{ mt: 3, mb: 2 }}
// //                 >
// //                     Update
// //                 </Button>
// //             </Box>

// //         </section>
// //     );
// // };

// // export default UserUpdateModal;
// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Button,
//     Divider,
//     InputLabel,
//     MenuItem,
//     Select,
//     SelectChangeEvent,
//     TextField,
// } from "@mui/material";
// import { tokenDecode } from "@/common/token-decode/token-decode";
// import { IUpdateUserRequest } from "@/view/user/types/user.type";
// import { useGetListGender, useUpdateUserInfo, useUserGetInfoById } from '@/view/user/hooks/useUserGetInfo';
// import toast from 'react-hot-toast';

// interface ModalProps {
//     show: boolean;
//     onClose: () => void;
// }

// const UserUpdateModal: React.FC<ModalProps> = ({ show, onClose }) => {
//     const userId = tokenDecode();
//     const { data: listGender, isSuccess: listGenderSuccess } = useGetListGender();
//     const { data: getUserInfo, isSuccess, refetch: refetchUserInfo } = useUserGetInfoById(Number(userId));
//     const { mutate: updateUser } = useUpdateUserInfo();

//     const [dataUpdateUser, setDataUpdateUser] = useState<IUpdateUserRequest>({
//         bio: '',
//         username: '',
//         name: '',
//         id: Number(userId),
//         birthday: '',
//         gender: '0'
//     });

//     useEffect(() => {
//         if (getUserInfo) {
//             setDataUpdateUser({
//                 bio: getUserInfo.bio,
//                 username: getUserInfo.username,
//                 name: getUserInfo.name,
//                 id: getUserInfo.id,
//                 birthday: getUserInfo.birthday,
//                 gender: getUserInfo.gender.id
//             });
//         }
//     }, [getUserInfo]);

//     const handleChange = (event: SelectChangeEvent) => {
//         setDataUpdateUser(prev => ({
//             ...prev,
//             gender: event.target.value
//         }));
//     };

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setDataUpdateUser(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         updateUser(dataUpdateUser);
//         updateUser(dataUpdateUser, {
//             onSuccess: () => {
//                 toast.success('Update success!')
//             },
//         });
//         console.log(dataUpdateUser);
//         onClose();
//     };

//     return (
//         <section className="flex flex-col min-w-[400px] min-h-[500px] max-h-[500px] p-5">
//             <div className="flex justify-between">
//                 <div className="text-lg font-medium">Chỉnh sửa thông tin</div>
//                 <button onClick={onClose} className="flex material-symbols-outlined" style={{ fontSize: 26 }}>
//                     close
//                 </button>
//             </div>
//             <Divider className="w-full pt-3" />

//             <Box component="form" className='flex flex-col' noValidate onSubmit={handleSubmit}>
//                 <InputLabel htmlFor="bio" className='my-2'>Tiểu sử</InputLabel>
//                 <TextField
//                     id="bio"
//                     name='bio'
//                     type='text'
//                     placeholder="Tiểu sử"
//                     multiline
//                     rows={4}
//                     value={dataUpdateUser.bio}
//                     onChange={handleInputChange}
//                 />
//                 <InputLabel htmlFor="name" className='my-2'>Tên</InputLabel>
//                 <TextField
//                     id="name"
//                     name='name'
//                     type='text'
//                     placeholder="Tên"
//                     value={dataUpdateUser.name}
//                     onChange={handleInputChange}
//                 />
//                 <InputLabel htmlFor="birthday" className='my-2'>Ngày sinh</InputLabel>
//                 <TextField
//                     id="birthday"
//                     name="birthday"
//                     type="date"
//                     value={dataUpdateUser.birthday}
//                     onChange={handleInputChange}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                 />
//                 <InputLabel id="gender-select-label" className='my-2'>Giới tính</InputLabel>
//                 <Select
//                     labelId="gender-select-label"
//                     id="gender-select"
//                     value={dataUpdateUser.gender}
//                     onChange={handleChange}
//                 >
//                     {listGender?.data?.map((gender: any) => (
//                         <MenuItem key={gender?.id} value={gender?.id}>{gender?.gender}</MenuItem>
//                     ))}
//                 </Select>
//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                 >
//                     Update
//                 </Button>
//             </Box>

//         </section>
//     );
// };

// export default UserUpdateModal;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { tokenDecode } from "@/common/token-decode/token-decode";
import { IUpdateUserRequest } from "@/view/user/types/user.type";
import { useGetListGender, useUpdateUserInfo, useUserGetInfoById } from '@/view/user/hooks/useUserGetInfo';
import toast from 'react-hot-toast';

interface ModalProps {
    show: boolean;
    onClose: () => void;
}

const UserUpdateModal: React.FC<ModalProps> = ({ show, onClose }) => {
    const userId = tokenDecode();
    const { data: listGender, isSuccess: listGenderSuccess } = useGetListGender();
    const { data: getUserInfo, isSuccess, refetch: refetchUserInfo } = useUserGetInfoById(Number(userId));
    const { mutate: updateUser } = useUpdateUserInfo();

    const [dataUpdateUser, setDataUpdateUser] = useState<IUpdateUserRequest>({
        bio: '',
        username: '',
        name: '',
        id: Number(userId),
        birthday: '',
        gender: '0'
    });

    useEffect(() => {
        if (getUserInfo) {
            setDataUpdateUser({
                bio: getUserInfo.bio,
                username: getUserInfo.username,
                name: getUserInfo.name,
                id: getUserInfo.id,
                birthday: getUserInfo.birthday,
                gender: getUserInfo.gender.id
            });
        }
    }, [getUserInfo]);

    const handleChange = (event: SelectChangeEvent) => {
        setDataUpdateUser(prev => ({
            ...prev,
            gender: event.target.value
        }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataUpdateUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        updateUser(dataUpdateUser, {
            onSuccess: () => {
                toast.success('Update success!');
                refetchUserInfo();
            },
        });
        onClose();
    };

    return (
        <section className="flex flex-col min-w-[400px] min-h-[500px] max-h-[500px] p-5">
            <div className="flex justify-between">
                <div className="text-lg font-medium">Chỉnh sửa thông tin</div>
                <button onClick={onClose} className="flex material-symbols-outlined" style={{ fontSize: 26 }}>
                    close
                </button>
            </div>
            <Divider className="w-full pt-3" />

            <Box component="form" className='flex flex-col' noValidate onSubmit={handleSubmit}>
                <InputLabel htmlFor="bio" className='my-2'>Tiểu sử</InputLabel>
                <TextField
                    id="bio"
                    name='bio'
                    type='text'
                    placeholder="Tiểu sử"
                    multiline
                    rows={4}
                    value={dataUpdateUser.bio}
                    onChange={handleInputChange}
                />
                <InputLabel htmlFor="name" className='my-2'>Tên</InputLabel>
                <TextField
                    id="name"
                    name='name'
                    type='text'
                    placeholder="Tên"
                    value={dataUpdateUser.name}
                    onChange={handleInputChange}
                />
                <InputLabel htmlFor="birthday" className='my-2'>Ngày sinh</InputLabel>
                <TextField
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={dataUpdateUser.birthday}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <InputLabel id="gender-select-label" className='my-2'>Giới tính</InputLabel>
                <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={dataUpdateUser.gender}
                    onChange={handleChange}
                >
                    {listGender?.data?.map((gender: any) => (
                        <MenuItem key={gender?.id} value={gender?.id}>{gender?.gender}</MenuItem>
                    ))}
                </Select>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Update
                </Button>
            </Box>
        </section>
    );
};

export default UserUpdateModal;

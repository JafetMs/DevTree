import { useForm } from "react-hook-form"
import { ErrorMessage } from "../components/ErrorMessage"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeApi";
import { toast } from "sonner";

export default function ProfileView() {

    const queryClient = useQueryClient();
    const data: User= queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState:{ errors}} = useForm<ProfileForm>({ defaultValues: {
        handle: data.handle,
        description: data.description,

    }});

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            toast.success(JSON.stringify(data));
            queryClient.invalidateQueries({queryKey:['user']});
        }

    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
           queryClient.setQueryData(['user'], (prevData : User) =>{
                return {
                    ...prevData,
                    image: data
                }
           })
            // queryClient.invalidateQueries({queryKey:['user']});

        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }


    const handleUserProfileForm = (formData: ProfileForm) => {
        // const user : User = queryClient.getQueryData(['user']);
        const user = queryClient.getQueryData<User>(['user'])!; 
        user.description = formData.description;
        user.handle = formData.handle

        updateProfileMutation.mutate(user)
    }

    return (

        <form 
            // Form BG 
            className="bg-[#18181B] p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            {/* Edit information  */}
            <legend className="text-2xl text-[#b90343] text-center  ">Editar Información</legend>
           
           {/* Handle */}
            <div className="grid grid-cols-1 gap-2 text-[#b90343] ">

                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-[#27272A] text-slate-200 borderrounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {
                        required: "El nombre de usuario es obligatorio"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>
            {/* Description */}
            <div className="grid grid-cols-1 gap-2 text-[#b90343] ">
                <label
                    htmlFor="description"
                    
                >Descripción:</label>
                <textarea
                    className="border-none bg-[#27272A] text-slate-200 border border-slate-800 rounded-lg p-2"
                    placeholder="Tu Descripción"
                     {...register('description', {
                        required: "El nombre de usuario es obligatorio"
                    })}

                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

            </div>
            {/* Chose Image */}
            <div className="grid grid-cols-1 gap-2 text-[#b90343] ">
                <label
                    htmlFor="image"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-[#27272A] text-slate-200 border border-slate-800 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className=" p-2 text-lg w-full uppercase bg-[#27272A] text-slate-200 border-none font-bold rounded-lg cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}
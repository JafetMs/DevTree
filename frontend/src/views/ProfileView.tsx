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
           console.log('data');
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }


    const handleUserProfileForm = (formData: ProfileForm) => {
        updateProfileMutation.mutate(formData)
    }

    return (
        <form 
            // className="bg-gradient-to-br from-gray-950 via-slate-950 to-cyan-950 space-y-5"
            className="bg-[#070B13] text-white p-4 to-cyan-950 space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">

                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-neutral-900 text-slate-200 border border-slate-800rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {
                        required: "El nombre de usuario es obligatorio"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="bg-[#1F222A] text-gray-200 border border-gray-700 placeholder-gray-500 rounded-lg p-3 w-full focus:border-transparent"
                    // className="border-none bg-white text-slate-200 border border-slate-800 rounded-lg p-2"
                    placeholder="Tu Descripción"
                     {...register('description', {
                        required: "El nombre de usuario es obligatorio"
                    })}

                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="image"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-neutral-900 text-slate-200 border border-slate-800 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase bg-neutral-900 text-slate-200 border border-slate-800 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}
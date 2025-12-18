import { useQueryClient } from '@tanstack/react-query'

export const AdminNavigation = () => {
    const queryClient = useQueryClient()

    const logout = () => {

        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']})
    }
    return (
        <button
            className=" bg-[#b90343] p-2 text-white uppercase font-bold text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    )
}

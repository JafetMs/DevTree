import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SocialNetwork } from "../types";

interface DevTreeLinkProps {
    link: SocialNetwork;
}

export const DevTreeLink = ({ link }: DevTreeLinkProps) => {

    const { attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: link.id

    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <li 
            ref={setNodeRef}
            style={style}
            className="bg-[#27272A] px-5 py-2 flex items-center gap-5 rounded-lg"
            {...attributes}
            {...listeners}
            >
            <div
                className="w-12 h-12 bg-cover"
                style={{
                    backgroundImage: `url('/social/icon_${link.name}.svg')`,
                }}
            > </div>

            <p className="capitalize font-semibold text-[#b90343] ">Visit my: <span className="font-black">{link.name}</span></p>
        </li>
    );
};

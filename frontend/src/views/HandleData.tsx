import { SocialNetwork, UserHandle } from "../types";

interface HandleDataProps {
  data: UserHandle;
}

export const HandleData = ({ data }: HandleDataProps) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );
  return (
    <div className="space-y-6 text-[#b90343]">
      <p className="text-5xl text-center font-black">{data.name}</p>

      {data.image && <img src={data.image} className="max-w-[250px] mx-auto" />}

      <p className="text-lg text-center font-bold">{data.description}</p>
      <div className="mt-20 flex felx-col gap-6">
          { links.length ?  
            links.map(link => (
              <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener "
                  className="bg-[#18181B] px-5 py-2 flex items-center gap-5 rounded-lg"
                  > 
                  <img src={`/social/icon_${link.name}.svg`} alt="Img Social Network" className="w-12" />
                  <p className="capitalize font-bold text-lg">Visit my: {link.name}</p>
              </a>
            ))
          : <p className="text-center">No links available</p>}
      </div>
    </div>
  );
};

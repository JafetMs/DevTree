import { CSSProperties } from "react";
import { BounceLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
}

export const Spinner = () => {
  return (
    <div className="sweet-loading">
      <BounceLoader
        color="#b90343"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    <p className="mt-10 font-bold text-2xl text-center text-[#b90343]">Loading...</p>

    </div>
  );
}
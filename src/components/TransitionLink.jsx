import { useLocation, useNavigate } from "react-router-dom";
import { animatePageOut } from "../utils/animations";
import { cn } from "../lib/utils";


const TransitionLink = ({ href, label , className , setOpen }) => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const handleClick = () => {
    if (location.pathname !== href) {
      setOpen(false)
      animatePageOut(href, navigate); 
    }
  };

  return (
    <button
      className={cn("text-sm uppercase text-[#1B2978] font-Roboto " , className) }
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TransitionLink;

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const ToggleButton = ({ onClick, showPswd }) => {
    return (
        <button type="button" className="toggle btn" onClick={onClick}>
            {showPswd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
    );
};

export default ToggleButton;

import { useParams } from "react-router-dom";

const Profile = () => {
    let { id } = useParams();
    return (
        <div>
            <h1>Profile Page</h1>
            <p>id -- {id}</p>
        </div>
    );
};

export default Profile;

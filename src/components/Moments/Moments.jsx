import Moment from "./Moment/Moment";

const Moments = ({ moments }) => {
    return (
        <section className="moments">
            {moments.map((moment) => (
                <Moment key={moment._id} moment={moment} />
            ))}
        </section>
    );
};

export default Moments;

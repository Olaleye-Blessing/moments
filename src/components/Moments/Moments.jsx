import Moment from "./Moment/Moment";

const Moments = ({ moments }) => {
    return (
        <section className="moments width">
            {moments.map((moment) => (
                <Moment key={moment._id} moment={moment} />
            ))}
        </section>
    );
};

export default Moments;

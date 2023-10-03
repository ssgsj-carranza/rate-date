import TimePassed from "../../../components/TimePassed";


function TimeTogether() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-5 p-5">
        <TimePassed startDate="2023-06-26" title='Time passed since you became my mine' />
        <TimePassed startDate="2023-07-04T22:00:00" title='Time passed since I told you "I love you"' />
      </div>
    );
}

export default TimeTogether;
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
const MeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    router.replace("/");
  };

  return (
    <>
      <Head>
        <title>Add new Meetup</title>
        <meta name="Add new" content="Add new meetup"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>;
    </>
  );
};

export default MeetupPage;
